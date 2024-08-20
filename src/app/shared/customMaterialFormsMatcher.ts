import { FormControl } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

/*
  Solucion de https://github.com/angular/components/issues/4190#issuecomment-1067757630
  para el bug de mostrar mensaje de error (mat-error) automaticamente tras resetear el fomulario.
  No es la solucion optima, pero hasta el momento es la que mejor funciona.
*/

export class CustomMaterialFormsMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
      return !!(control && control.invalid && (control.dirty || control.touched));
  }
}