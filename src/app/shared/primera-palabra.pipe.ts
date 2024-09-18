import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'primeraPalabra',
  standalone: true
})
export class PrimeraPalabraPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (!value) return '';
    return value.split(' ')[0];
  }

}
