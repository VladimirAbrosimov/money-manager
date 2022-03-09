import { Component, ElementRef, OnInit } from '@angular/core';
import { NoteCategory } from 'src/app/models/note-category';
import { NoteType } from 'src/app/models/note-type';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss']
})
export class NoteItemComponent implements OnInit {
  amount: number = 0;
  type: NoteType;
  category: NoteCategory;
  commentary?: string;
  date: Date = new Date("1970-01-01");


  constructor(
    private host: ElementRef<HTMLElement>
  ) { }

  ngOnInit(): void {
    this.host.nativeElement.style.setProperty('--category-color', this.category.color);
  }

}
