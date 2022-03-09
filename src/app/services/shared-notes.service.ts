import {Injectable} from '@angular/core';
import {Note} from '../models/note';
import {AbstractSharedDataService} from './abstract-shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class SharedNotesService extends AbstractSharedDataService<Note> {

  constructor() {
    super();
  }
}
