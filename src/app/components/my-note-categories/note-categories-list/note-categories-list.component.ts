import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef, OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Subscription} from 'rxjs';
import {NoteCategory} from 'src/app/models/note-category';
import {NoteCategoryService} from 'src/app/services/note-category.service';
import {SharedNoteCategoriesService} from 'src/app/services/shared-note-categories.service';
import {NoteCategoryItemComponent} from '../note-category-item/note-category-item.component';
import {NoteType} from "../../../models/note-type";

@Component({
  selector: 'app-note-categories-list',
  templateUrl: './note-categories-list.component.html',
  styleUrls: ['./note-categories-list.component.scss']
})
export class NoteCategoriesListComponent implements OnInit, OnDestroy {
  @ViewChild('noteCategoriesIncome')
  noteCategoriesIncome: ElementRef;
  @ViewChild('noteCategoriesExpense')
  noteCategoriesExpense: ElementRef;

  private noteCategoryCreatedSubscription: Subscription;

  private noteCategoryItemComponents: ComponentRef<NoteCategoryItemComponent>[] = [];
  private topNoteCategoryItemComponents: Map<NoteType, ComponentRef<NoteCategoryItemComponent>> = new Map([
    ['INCOME', undefined],
    ['EXPENSE', undefined]
  ]);
  private lastNoteCategory: NoteCategory;

  constructor(
    private noteCategoryService: NoteCategoryService,
    private sharedNoteCategoriesService: SharedNoteCategoriesService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.loadNoteCategories();
    this.noteCategoryCreatedSubscription = this.sharedNoteCategoriesService.currentMessage.subscribe({
      next: (noteCategory: NoteCategory) => {
        if (this.lastNoteCategory != noteCategory) {
          this.appendNoteCategoryItemElementToTheTop(noteCategory);
        }
      }
    });
  }

  ngOnDestroy():void {
    this.noteCategoryCreatedSubscription.unsubscribe();
    this.noteCategoryItemComponents.forEach((noteCategoryItemComponent: ComponentRef<NoteCategoryItemComponent>) => {
      noteCategoryItemComponent.destroy();
    });
  }

  private loadNoteCategories(): void {
    this.noteCategoryService.getAllNoteCategories().subscribe({
      next: (noteCategories: NoteCategory[]) => {
        noteCategories.map((noteCategory: NoteCategory) => this.appendNoteCategoryItemElementAtTheEnd(noteCategory));
      }
    });
  }

  private appendNoteCategoryItemElementAtTheEnd(noteCategory: NoteCategory): void {
    const noteCategoryItem = this.createNoteCategoryItem(noteCategory);
    this.renderer.appendChild(
      noteCategory.type == 'INCOME' ? this.noteCategoriesIncome.nativeElement : this.noteCategoriesExpense.nativeElement,
      noteCategoryItem.location.nativeElement
    );

    if (this.topNoteCategoryItemComponents.get(noteCategory.type) === undefined) {
      this.topNoteCategoryItemComponents.set(noteCategory.type, noteCategoryItem);
    }
  }

  private appendNoteCategoryItemElementToTheTop(noteCategory: NoteCategory): void {
    if (this.topNoteCategoryItemComponents.get(noteCategory.type) === undefined) {
      this.appendNoteCategoryItemElementAtTheEnd(noteCategory);
    } else {
      const noteCategoryItem = this.createNoteCategoryItem(noteCategory);

      this.renderer.insertBefore(
        noteCategory.type == 'INCOME' ? this.noteCategoriesIncome.nativeElement : this.noteCategoriesExpense.nativeElement,
        noteCategoryItem.location.nativeElement,
        this.topNoteCategoryItemComponents.get(noteCategory.type).location.nativeElement
      );
      this.topNoteCategoryItemComponents.set(noteCategory.type, noteCategoryItem);
    }
  }

  private createNoteCategoryItem(noteCategory: NoteCategory): ComponentRef<NoteCategoryItemComponent> {
    const noteCategoryItemComponentFactory = this.componentFactoryResolver.resolveComponentFactory(NoteCategoryItemComponent);
    const noteCategoryItemComponent = this.viewContainerRef.createComponent<NoteCategoryItemComponent>(noteCategoryItemComponentFactory);

    if (noteCategoryItemComponent) {
      noteCategoryItemComponent.instance.category = noteCategory;

      this.noteCategoryItemComponents.push(noteCategoryItemComponent);
    }

    return noteCategoryItemComponent;
  }

}
