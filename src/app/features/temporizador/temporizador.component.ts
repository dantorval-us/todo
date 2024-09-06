import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeatureContainerComponent } from "@components/feature-container/feature-container.component";
import { TemporizadorPersonalizadoComponent } from '@components/temporizador-personalizado/temporizador-personalizado.component';
import { RouterOutletDataService } from '@services/router-outlet-data.service';
import { TimeFormatPipe } from '@shared/time-format.pipe';
import { interval, Subscription, takeWhile } from 'rxjs';

@Component({
  selector: 'app-temporizador',
  standalone: true,
  imports: [FeatureContainerComponent, TimeFormatPipe],
  templateUrl: './temporizador.component.html',
  styleUrl: './temporizador.component.css'
})
export class TemporizadorComponent implements OnInit{
  
  titulo: string = "Temporizador";
  mensajeCabecera: string = '-';
  private _valorInicial: number = 0;
  tiempoRestante: number = this._valorInicial;
  private _audio = new Audio('assets/audio/alarm-bell.mp3');
  playDeshabilitado: boolean = false;
  suscripcionTemporizador: Subscription | null = null;
  private suscripcionTitulo: Subscription | null = null;
  
  private readonly _routerOutletData = inject(RouterOutletDataService);
  private readonly _destroyRef = inject(DestroyRef);
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  private _titleService = inject(Title);
  private _timeFormatPipe = inject(TimeFormatPipe);

  constructor() {
    this._audio.loop = true;
  }
  
  ngOnInit(): void {
    this.emitirTitulo();
  }

  emitirTitulo(): void {
    this._routerOutletData.changeData(this.titulo);
  }

  setValorInicial(tiempo: number): void {
    this.detenerTemporizador();
    this._valorInicial = tiempo;
    this.tiempoRestante = tiempo;
    this.setTitleNavegador();
  }

  iniciarTemporizador(): void {
    if (!this.suscripcionTemporizador && this.tiempoRestante) {
      const contador = interval(1000);
      this.suscripcionTemporizador = contador
        .pipe(
          takeWhile(() => this.tiempoRestante > 0),
          takeUntilDestroyed(this._destroyRef)
        )
        .subscribe(() => {
          this.tiempoRestante--;
          this.setTitleNavegador();
          if (this.tiempoRestante === 0) {
            this.hadleFinTemporizador();
          }
        });
    }
  }

  detenerTemporizador(): void {
    if (this.suscripcionTemporizador) {
      this.suscripcionTemporizador.unsubscribe();
      this.suscripcionTemporizador = null;
    }
  }

  private _stopAlternanciaTitulo(): void {
    if (this.suscripcionTitulo) {
      this.suscripcionTitulo.unsubscribe();
      this.suscripcionTitulo = null;
    }
  }

  reiniciarTemporizador(): void {
    if (this._valorInicial) {
      this.tiempoRestante = this._valorInicial;
      this.setTitleNavegador();
    }
  }

  hadleFinTemporizador(): void {
    this.suscripcionTemporizador = null;

    this.openSnackBarFinTemporizador('Temporizador finalizado', 'Aceptar')

    this._finTemporizadorTituloNavegador();

    this._audio.play();
    this.playDeshabilitado = true;
  }

  openSnackBarFinTemporizador(mensaje: string, accion: string) {
    let snackBarRef = this._snackBar.open(mensaje, accion, {
      verticalPosition: 'top'
    });
    
    snackBarRef.onAction().subscribe(() => {
      this._stopAlarma();
      this._stopAlternanciaTitulo();
      this._titleService.setTitle('Todo | Temporizador');
      this.playDeshabilitado = false;
    });
  }

  private _finTemporizadorTituloNavegador(): void {
    let alternadorTitulo = true;
    this.suscripcionTitulo = interval(1000).pipe(
      takeUntilDestroyed(this._destroyRef)
    ).subscribe(() => {
      if (alternadorTitulo) {
        this._titleService.setTitle('Todo | Temporizador finalizado');
      } else {
        this._titleService.setTitle('Todo | 00:00:00');
      }
      alternadorTitulo = !alternadorTitulo; 
    });
  }

  private _stopAlarma(): void {
    this._audio.pause();
    this._audio.currentTime = 0;
  }

  tiempoFormateado(): string {
    return this._timeFormatPipe.transform(this.tiempoRestante);
  }

  setTitleNavegador(): void {
    this._titleService.setTitle(`Todo | ${this.tiempoFormateado()}`);
  }

  setMensajeCabecera(mensaje: string): void {
    this.mensajeCabecera = mensaje;
  }

  openDialogTemporizadorPersonalizado(): void {
    const dialogRef = this.dialog.open(TemporizadorPersonalizadoComponent)

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.setValorInicial(
          this.tiempoFormateadoASegundos(res.horas, res.minutos, res.segundos)
        );
        this.setMensajeCabecera('Personalizado');
      }
    });
  }

  tiempoFormateadoASegundos(horas: number, minutos: number, segundos: number): number {
    const tiempoSegundos = horas*3600 + minutos*60 + segundos;
    return tiempoSegundos;
  }

}
