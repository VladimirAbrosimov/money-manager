import {Injectable} from '@angular/core';
import {AbstractSharedDataService} from "./abstract-shared-data.service";
import {NoteCategory} from "../models/note-category";

@Injectable({
  providedIn: 'root'
})
export class SharedNoteCategoriesService extends AbstractSharedDataService<NoteCategory> {

  constructor() {
    super();
  }
}
