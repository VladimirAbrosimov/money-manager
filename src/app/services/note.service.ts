import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import { Note } from '../models/note';
import { NoteCategory } from '../models/note-category';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private readonly SERVER_URL: string = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) { }

  getAllNotes(): Observable<Note[]> {
    return this.http.get(
      this.SERVER_URL + '/getAllNotes',
      {
        responseType: 'json'
      }
    ).pipe(map((notes: any) => {
      return notes.map((note: any) => {
        const type = note.type;
        const category = new NoteCategory(
          note.category.type,
          note.category.name,
          note.category.color
        );
        const amount = note.amount;
        const date = note.date;
        const commentary = note.commentary;

        return new Note(type, category, amount, commentary, date);
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
        const type = note.type;
        const category = new NoteCategory(
          note.category.type,
          note.category.name,
          note.category.color
        );
        const amount = note.amount;
        const date = note.date;
        const commentary = note.commentary;

        return new Note(type, category, amount, commentary, date);
    }));
  }

  saveNote(_type: string, _category: string, _amount: number, _commentary: string) { // CHANGE TO NOTE
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
