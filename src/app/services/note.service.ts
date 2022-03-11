import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Note} from '../models/note';
import {NoteCategory} from '../models/note-category';
import {NoteType} from "../models/note-type";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private readonly SERVER_URL: string = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) {
  }

  getAllNotes(): Observable<Note[]> {
    return this.http.get(
      this.SERVER_URL + '/getAllNotes',
      {
        responseType: 'json'
      }
    ).pipe(map((notes: any) => {
      return notes.map((note: any) => {
        const type: NoteType = note.type;
        const category: NoteCategory = {
          type: note.category.type,
          name: note.category.name,
          color: note.category.color
        }
        const amount: number = note.amount;
        const date: Date = note.date;
        const commentary: string = note.commentary;

        return {
          type,
          category,
          amount,
          commentary,
          date
        }
      });
    }));
  }

  getLastNote(): Observable<Note> {
    return this.http.get(
      this.SERVER_URL + '/getLastNote',
      {
        responseType: 'json'
      }
    ).pipe(map((note: any) => {
      const type: NoteType = note.type;
      const category: NoteCategory = {
        type: note.category.type,
        name: note.category.name,
        color: note.category.color
      }
      const amount: number = note.amount;
      const date: Date = note.date;
      const commentary: string = note.commentary;

      return {
        type,
        category,
        amount,
        commentary,
        date
      }
    }));
  }

  saveNote(_type: string, _category: string, _amount: number, _commentary: string) {
    const body = {type: _type, amount: _amount, commentary: _commentary};
    const params = new HttpParams()
      .set('noteCategoryName', _category);

    return this.http.post(
      this.SERVER_URL + '/addNote',
      body,
      {
        responseType: 'text',
        params: params
      }
    );
  }
}
