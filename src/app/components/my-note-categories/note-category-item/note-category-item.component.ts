import {Component, ElementRef, OnInit} from '@angular/core';
import { NoteCategory } from 'src/app/models/note-category';

@Component({
  selector: 'app-note-category-item',
  templateUrl: './note-category-item.component.html',
  styleUrls: ['./note-category-item.component.scss']
})
export class NoteCategoryItemComponent implements OnInit {
  category: NoteCategory;

  isRemoved: boolean = false;

  constructor(
    private host: ElementRef<HTMLElement>
  ) { }

  ngOnInit(): void {
    this.host.nativeElement.style.setProperty('--category-color', this.category.color);
  }

  public removeNoteCategory(): void {
    this.isRemoved = true;
  }

  public restoreNoteCategory(): void {
    this.isRemoved = false;
  }

}
