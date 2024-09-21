import { Timestamp } from "@angular/fire/firestore";

export interface Tarea {
  id: string;
  nombre: string;
  completada: boolean;
  fechaCreacion: number;
  usuario: string;
}