import { Component, ComponentFactoryResolver, ComponentRef, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { Note } from 'src/app/models/note';
import { NoteItemComponent } from '../note-item/note-item.component';

@Component({
  selector: 'app-date-group',
  templateUrl: './date-group.component.html',
  styleUrls: ['./date-group.component.scss']
})
export class DateGroupComponent implements OnInit, OnDestroy {
  date: Date;
  id: string;

  @ViewChild('notes')
  private notes: ElementRef;

  private noteItemComponents: ComponentRef<NoteItemComponent>[] = [];
  private topNoteItemComponent: ComponentRef<NoteItemComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.noteItemComponents.forEach((noteItemComponent: ComponentRef<NoteItemComponent>) => {
      noteItemComponent.destroy();
    });
  }

  public appendNoteItemElementAtTheEnd(note: Note): void {
    const noteItemComponent = this.createNoteItemComponent(note);
    this.renderer.appendChild(
      this.notes.nativeElement,
      noteItemComponent.location.nativeElement
    );

    if(this.topNoteItemComponent === undefined) {
      this.topNoteItemComponent = noteItemComponent;
    }
  }

  public appendNoteItemElementToTheTop(note: Note): void {
    if(this.topNoteItemComponent === undefined) {
      this.appendNoteItemElementAtTheEnd(note);
    } else {
      const noteItemComponent = this.createNoteItemComponent(note);
      this.renderer.insertBefore(
        this.notes.nativeElement,
        noteItemComponent.location.nativeElement,
        this.topNoteItemComponent.location.nativeElement
      );
      this.topNoteItemComponent = noteItemComponent;
    }
  }

  private createNoteItemComponent(note: Note): ComponentRef<NoteItemComponent>  {
    const noteItemComponentFactory = this.componentFactoryResolver.resolveComponentFactory(NoteItemComponent);
    const noteItemComponent = this.viewContainerRef.createComponent<NoteItemComponent>(noteItemComponentFactory);

    if (noteItemComponent) {
      noteItemComponent.instance.type = note.type;
      noteItemComponent.instance.category = note.category;
      noteItemComponent.instance.amount = note.amount;
      noteItemComponent.instance.commentary = note.commentary;

      this.noteItemComponents.push(noteItemComponent);
    }

    return noteItemComponent;
  }

}
