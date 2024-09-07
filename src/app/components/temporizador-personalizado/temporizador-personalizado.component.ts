import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const MATERIAL_MODULE = [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule];

@Component({
  selector: 'app-temporizador-personalizado',
  standalone: true,
  imports: [MATERIAL_MODULE, ReactiveFormsModule],
  templateUrl: './temporizador-personalizado.component.html',
  styleUrl: './temporizador-personalizado.component.css'
})
export class TemporizadorPersonalizadoComponent implements OnInit {

  temporizadorForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this._buildForm();
  }

  private _buildForm() {
    this.temporizadorForm = this._formBuilder.nonNullable.group({
      horas: ['', [Validators.required, Validators.min(0), Validators.max(99)]],
      minutos: ['', [Validators.required, Validators.min(0), Validators.max(59)]],
      segundos: ['', [Validators.required, Validators.min(0), Validators.max(59)]]
    });
  }

}
