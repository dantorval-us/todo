import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, DocumentData, DocumentReference, Firestore, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable, of, tap } from 'rxjs';
import { Tarea } from '../interfaces/tarea';
import { getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private readonly  auth = getAuth().currentUser?.uid;
  private readonly _tareasCollection = collection(this._firestore, 'tareas');
  private _tareasCache: Tarea[] | null = null;

  constructor(private _firestore: Firestore) { }

  addTarea(tarea: Partial<Tarea>): Promise<DocumentReference<DocumentData, DocumentData>> {
    this._tareasCache = null;

    return addDoc(this._tareasCollection, {
      fechaCreacion: Date.now(),
      completada: false,
      usuario: this.auth,
      ...tarea
    });
  }

  getTareas(): Observable<Tarea[]> {
    if (this._tareasCache) {
      return of(this._tareasCache);
    }

    const q = query(this._tareasCollection, where('usuario', '==', this.auth), orderBy('fechaCreacion', 'asc'));
    return collectionData(q, {idField: 'id'}).pipe(
      tap((tareas: Tarea[]) => {
        this._tareasCache = tareas;
      })
    ) as Observable<Tarea[]>;
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
