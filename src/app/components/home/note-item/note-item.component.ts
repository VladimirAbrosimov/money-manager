import { Component, ElementRef, OnInit } from '@angular/core';
import { NoteCategory } from 'src/app/models/note-category';
import { NoteType } from 'src/app/models/note-type';
import {ConfigurationService} from "../../../services/configuration.service";

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

  currency: string;


  constructor(
    private host: ElementRef<HTMLElement>,
    private configurationService: ConfigurationService
  ) { }

  ngOnInit(): void {
    this.currency = this.configurationService.getValue('currency', 'RUB');
    this.host.nativeElement.style.setProperty('--category-color', this.category.color);
  }

}
