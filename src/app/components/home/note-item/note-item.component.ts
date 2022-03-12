import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ConfigurationService} from "../../../services/configuration.service";
import {NoteService} from "../../../services/note.service";
import {Note} from "../../../models/note";

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss']
})
export class NoteItemComponent implements OnInit, OnDestroy {
  note: Note;
  currency: string;

  isRemoved: boolean = false;

  constructor(
    private host: ElementRef<HTMLElement>,
    private configurationService: ConfigurationService,
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
    this.currency = this.configurationService.getValue('currency', 'RUB');
    this.host.nativeElement.style.setProperty('--category-color', this.note.category.color);
  }

  ngOnDestroy(): void {
    if(this.isRemoved === true) {
      this.noteService.deleteNote(this.note.id).subscribe();
    }
  }

  public removeNote(): void {
    this.isRemoved = true;
  }

  public restoreNote(): void {
    this.isRemoved = false;
  }

}
