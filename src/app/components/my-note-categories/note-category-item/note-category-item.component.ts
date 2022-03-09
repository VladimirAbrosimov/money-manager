import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import { NoteCategory } from 'src/app/models/note-category';
import {NoteCategoryService} from "../../../services/note-category.service";

@Component({
  selector: 'app-note-category-item',
  templateUrl: './note-category-item.component.html',
  styleUrls: ['./note-category-item.component.scss']
})
export class NoteCategoryItemComponent implements OnInit, OnDestroy {
  category: NoteCategory;

  public isRemoved: boolean = false;

  constructor(
    private host: ElementRef<HTMLElement>,
    private noteCategoryService: NoteCategoryService
  ) { }

  ngOnInit(): void {
    this.host.nativeElement.style.setProperty('--category-color', this.category.color);
  }

  ngOnDestroy(): void {
    if(this.isRemoved === true) {
      console.log('deleting', this.category.name);
      this.noteCategoryService.deleteNoteCategory(this.category).subscribe();
    }
  }

  public removeNoteCategory(): void {
    this.isRemoved = true;
  }

  public restoreNoteCategory(): void {
    this.isRemoved = false;
  }

}
