import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import { NoteCategory } from 'src/app/models/note-category';
import { NoteType } from 'src/app/models/note-type';
import {ConfigurationService} from "../../../services/configuration.service";
import {NoteCategoryService} from "../../../services/note-category.service";
import {NoteService} from "../../../services/note.service";
import {Note} from "../../../models/note";

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss']
})
export class NoteItemComponent implements OnInit {
  note: Note;
  currency: string;

  constructor(
    private host: ElementRef<HTMLElement>,
    private configurationService: ConfigurationService,
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
    this.currency = this.configurationService.getValue('currency', 'RUB');
    this.host.nativeElement.style.setProperty('--category-color', this.note.category.color);
  }

}
