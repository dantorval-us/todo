import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true
})
@Injectable({
  providedIn: 'root'
})
export class TimeFormatPipe implements PipeTransform {

  transform(segundos: number): string {
    if (!segundos && segundos !== 0) return '';

    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const seg = segundos % 60;

    const horasStr = horas < 10 ? '0' + horas : horas.toString();
    const minutosStr = minutos < 10 ? '0' + minutos : minutos.toString();
    const segundosStr = seg < 10 ? '0' + seg : seg.toString();

    return `${horasStr}:${minutosStr}:${segundosStr}`;
  }

}
