import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { Subject } from "rxjs";

@Injectable()
export class customMatPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  // Ej: firstPageLabel = $localize`First page`;
  itemsPerPageLabel = `Tareas por página:`;
  firstPageLabel = `Primera página`;
  lastPageLabel = `Última página`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Página siguiente';
  previousPageLabel = 'Página anterior';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Página 1 de 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Página ${page + 1} de ${amountPages}`;
  }
}
