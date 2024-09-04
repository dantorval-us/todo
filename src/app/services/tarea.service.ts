import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, DocumentData, DocumentReference, Firestore, orderBy, query, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Tarea } from '../interfaces/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private readonly _tareasCollection = collection(this._firestore, 'tareas');

  constructor(private _firestore: Firestore) { }

  addTarea(tarea: Partial<Tarea>): Promise<DocumentReference<DocumentData, DocumentData>> {
    return addDoc(this._tareasCollection, {
      fechaCreacion: Date.now(),
      completada: false,
      ...tarea
    });
  }

  getTareas(): Observable<Tarea[]> {
    const q = query(this._tareasCollection, orderBy('fechaCreacion', 'asc'));
    return collectionData(q, {idField: 'id'}) as Observable<Tarea[]>;
  }

  updateTarea(tareaId: string, tarea: Tarea): void {
    const tareaRef = this._getDocRef(tareaId);
    updateDoc(tareaRef, { ...tarea });
  }

  checkTarea(tareaId: string, nuevoEstado: boolean): void {
    const tareaRef = this._getDocRef(tareaId);
    updateDoc(tareaRef, { completada: nuevoEstado }); 
  }

  deleteTarea(tareaId: string): void {
    const tareaRef = this._getDocRef(tareaId);
    deleteDoc(tareaRef);
  }

  private _getDocRef(tareaId: string) {
    return doc(this._firestore, 'tareas', tareaId);
  }
}
