import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from 'src/app/models/note';
import { NoteCategoryService } from 'src/app/services/note-category.service';
import { NoteService } from 'src/app/services/note.service';
import { NoteCategory } from 'src/app/models/note-category';
import { SharedNotesService } from 'src/app/services/shared-notes.service';
import {NoteType} from "../../../models/note-type";

type categoryField = {
  value: string,
  id: number
}

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit, OnDestroy {
  isFormExpanded: boolean = true;
  addNoteForm: FormGroup;
  submitted = false;

  private categoriesExpense: categoryField[] = [];
  private categoriesIncome: categoryField[] = [];
  categories: categoryField[];

  types = [
    {value: "EXPENSE", name: "расходы"},
    {value: "INCOME", name: "доходы"}
  ];


  constructor(
    private formBuilder: FormBuilder,
    private noteService: NoteService,
    private noteCategoryService: NoteCategoryService,
    private sharedNotesService: SharedNotesService
  ) { }

  ngOnInit(): void {
    this.noteCategoryService.getNoteCategoriesByType('EXPENSE').subscribe({
      next: (noteCategories: NoteCategory[]) => noteCategories.map((noteCategory: NoteCategory) => {
        if (noteCategory.name == 'неизвестная категория') return;
        this.categoriesExpense.push({
          value: noteCategory.name,
          id: noteCategory.id
        });
      }),
      complete: () => {
        this.categories = this.categoriesExpense;
        this.formFields.category.setValue(this.categories[0]);
      }
    });

    this.noteCategoryService.getNoteCategoriesByType('INCOME').subscribe({
      next: (noteCategories: NoteCategory[]) => noteCategories.map((noteCategory: NoteCategory) => {
        if (noteCategory.name == 'неизвестная категория') return;
        this.categoriesIncome.push({
          value: noteCategory.name,
          id: noteCategory.id
        });
      })
    });

    this.addNoteForm = this.formBuilder.group({
      type: [this.types[0], Validators.required],
      category: ['', Validators.required],
      amount: ['', Validators.required],
      commentary: [''],
    });

  }

  ngOnDestroy(): void {
    this.sharedNotesService.changeMessage(null);
  }

  get formFields() {
    return this.addNoteForm.controls;
  }

  public collapseExpandForm(): void {
    this.isFormExpanded = !this.isFormExpanded;
  }

  public onChangeNoteType(): void {
    const type = this.formFields.type.value;
    if (type.value == "EXPENSE") {
      this.categories = this.categoriesExpense;
    } else if (type.value == "INCOME") {
      this.categories = this.categoriesIncome;
    }
    this.formFields.category.setValue(this.categories[0]);
  }

  public onSubmit(): void {
    this.submitted = true;

    if(this.addNoteForm.invalid) {
      return;
    }

    const type: NoteType = this.formFields.type.value.value;
    const categoryId: number = this.formFields.category.value.id;
    const amount: number = this.formFields.amount.value;
    const commentary: string = this.formFields.commentary.value;
    const date: Date = new Date();

    const note: Note = {
      type,
      category: null,
      amount,
      commentary,
      date
    };

    this.noteService.saveNote(type, categoryId, amount, commentary, date).subscribe({
      complete: () => this.sharedNotesService.changeMessage(note)
    });
  }
}
