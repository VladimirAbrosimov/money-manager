import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Note} from '../models/note';
import {NoteCategory} from '../models/note-category';
import {NoteType} from "../models/note-type";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    private http: HttpClient
  ) {
  }

  saveNote(_type: string, _category: string, _amount: number, _commentary: string, _date) {
    const body = {type: _type, amount: _amount, commentary: _commentary, date: _date};
    const params = new HttpParams()
      .set('noteCategoryName', _category);

    return this.http.post(
      environment.SERVER_URL + '/addNote',
      body,
      {
        responseType: 'text',
        params: params
      }
    );
  }

  getAllNotes(): Observable<Note[]> {
    return this.http.get(
      environment.SERVER_URL + '/getAllNotes',
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
      environment.SERVER_URL + '/getLastNote',
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
}
