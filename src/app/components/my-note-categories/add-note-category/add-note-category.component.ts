import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteCategory } from 'src/app/models/note-category';
import { NoteCategoryService } from 'src/app/services/note-category.service';
import {SharedNoteCategoriesService} from "../../../services/shared-note-categories.service";

@Component({
  selector: 'app-add-note-category',
  templateUrl: './add-note-category.component.html',
  styleUrls: ['./add-note-category.component.scss']
})
export class AddNoteCategoryComponent implements OnInit {
  isActive: boolean;
  addNoteCategoryForm: FormGroup;

  types = [
    {value: "EXPENSE", name: "расходы"},
    {value: "INCOME", name: "доходы"}
  ];

  constructor(
    private formBuilder: FormBuilder,
    private noteCategoryService: NoteCategoryService,
    private sharedNoteCategoriesService: SharedNoteCategoriesService,
  ) { }

  ngOnInit(): void {
    this.isActive = true;
    this.addNoteCategoryForm = this.formBuilder.group({
      type: [this.types[0], Validators.required],
      name: ['', Validators.required],
      color: ['#a1a1a1', Validators.required],
    });
  }

  get formFields() {
    return this.addNoteCategoryForm.controls;
  }

  public onSubmit(): void {
    const type = this.formFields.type.value.value;
    const name = this.formFields.name.value;
    const color = this.formFields.color.value;

    const noteCategory = new NoteCategory(type, name, color);

    this.noteCategoryService.saveNoteCategory(noteCategory).subscribe({
      complete: () => this.sharedNoteCategoriesService.changeMessage(noteCategory)
    });
  }

}
