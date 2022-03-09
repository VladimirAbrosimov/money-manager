import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from 'src/app/models/note';
import { NoteCategoryService } from 'src/app/services/note-category.service';
import { NoteService } from 'src/app/services/note.service';
import { NoteCategory } from 'src/app/models/note-category';
import { SharedNotesService } from 'src/app/services/shared-notes.service';


@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  isActive: boolean = true;
  addNoteForm: FormGroup;

  private categoriesExpense: string[] = [];
  private categoriesIncome: string[] = [];
  categories: string[];

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
        this.categoriesExpense.push(noteCategory.name);
      }),
      complete: () => {
        this.categories = this.categoriesExpense;
        this.formFields.category.setValue(this.categories[0]);
      }
    });

    this.noteCategoryService.getNoteCategoriesByType('INCOME').subscribe({
      next: (noteCategories: NoteCategory[]) => noteCategories.map((noteCategory: NoteCategory) => {
        this.categoriesIncome.push(noteCategory.name);
      })
    });

    this.addNoteForm = this.formBuilder.group({
      type: [this.types[0], Validators.required],
      category: ['', Validators.required],
      amount: ['', Validators.required],
      commentary: [''],
    });

  }

  get formFields() {
    return this.addNoteForm.controls;
  }

  public toggleActive(): void {
    this.isActive = !this.isActive;
  }

  public onChangeType(): void {
    const type = this.formFields.type.value;
    if (type.value == "EXPENSE") {
      this.categories = this.categoriesExpense;
    } else if (type.value == "INCOME") {
      this.categories = this.categoriesIncome;
    }
    this.formFields.category.setValue(this.categories[0]);
  }

  public onSubmit(): void {
    const type = this.formFields.type.value.value;
    const category = this.formFields.category.value;
    const amount = this.formFields.amount.value;
    const commentary = this.formFields.commentary.value;

    const note = new Note(type, category, amount, commentary);

    this.noteService.saveNote(type, category, amount, commentary).subscribe({
      complete: () => this.sharedNotesService.changeMessage(note)
    }); // CHANGE TO NOTE
  }
}
