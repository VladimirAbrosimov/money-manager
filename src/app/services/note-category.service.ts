import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {NoteCategory} from '../models/note-category';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {NoteType} from '../models/note-type';

@Injectable({
  providedIn: 'root'
})
export class NoteCategoryService {
  private readonly SERVER_URL: string = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) {
  }

  saveNoteCategory(noteCategory: NoteCategory) {
    const body = {type: noteCategory.type, name: noteCategory.name, color: noteCategory.color};

    return this.http.post(
      this.SERVER_URL + '/saveNoteCategory',
      body,
      {
        responseType: 'text'
      }
    );
  }

  deleteNoteCategory(noteCategory: NoteCategory) {
    const body = {type: noteCategory.type, name: noteCategory.name, color: noteCategory.color};
    console.log("rgreg")
    return this.http.post(
      this.SERVER_URL + '/deleteNoteCategory',
      body
    );
  }

  getAllNoteCategories(): Observable<NoteCategory[]> {
    return this.http.get(
      this.SERVER_URL + '/getAllNoteCategories',
      {
        responseType: 'json',
      }
    ).pipe(map((noteCategories: any) => {
      return noteCategories.map((noteCategory: any) => {
        const type = noteCategory['type'];
        const name = noteCategory['name'];
        const color = noteCategory['color'];

        return {
          type,
          name,
          color
        }
      });
    }));
  }

  getNoteCategoriesByType(noteType: NoteType): Observable<NoteCategory[]> {
    const params = new HttpParams()
      .set('type', noteType);


    return this.http.get(
      this.SERVER_URL + '/getNoteCategoriesByType',
      {
        responseType: 'json',
        params: params
      }
    ).pipe(map((noteCategories: any) => {
      return noteCategories.map((noteCategory: any) => {
        const type = noteCategory['type'];
        const name = noteCategory['name'];
        const color = noteCategory['color'];

        return {
          type,
          name,
          color
        }
      });
    }));
  }
}
