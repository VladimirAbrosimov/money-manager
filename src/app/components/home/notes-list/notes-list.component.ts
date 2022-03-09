import { Component, ComponentFactoryResolver, ComponentRef, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { Note } from '../../../models/note';
import { NoteService } from '../../../services/note.service';
import { Subscription } from 'rxjs';
import { DateGroupComponent } from '../date-group/date-group.component';
import { SharedNotesService } from 'src/app/services/shared-notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit, OnDestroy {
  @ViewChild('dateGroups')
  private dateGroups: ElementRef;

  private noteCreatedSubscription: Subscription;

  private dateGroupComponents: Map<string, ComponentRef<DateGroupComponent>> = new Map();
  private topDateGroupComponent: ComponentRef<DateGroupComponent>;
  private lastNote: Note;

  constructor(
    private noteService: NoteService,
    private sharedNotesService: SharedNotesService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.loadNotes();
    this.noteCreatedSubscription = this.sharedNotesService.currentMessage.subscribe({
      next: (note: Note) => {
        if (this.lastNote != note) {
          this.loadLastNote();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.noteCreatedSubscription.unsubscribe();
    this.dateGroupComponents.forEach((dateGroupComponent: ComponentRef<DateGroupComponent>) => {
      dateGroupComponent.destroy();
    });
  }


  private loadNotes(): void {
    this.noteService.getAllNotes().subscribe({
      next: (notes: Note[]) => {
        notes.map((note: Note) => this.appendNoteItemElementAtTheEnd(note));
      }
    });
  }

  private loadLastNote(): void {
    this.noteService.getLastNote().subscribe({
      next: (note: Note) => {
        this.appendNoteItemElementToTheTop(note);
      }
    });
  }

  private appendNoteItemElementAtTheEnd(note: Note): void {
    if (note.date) {
      if (this.dateGroupComponents.get(note.date.toString()) === undefined) {
        this.appendDateGroupAtTheEnd(note.date);
      }
      const dateGroupComponent = this.dateGroupComponents.get(note.date.toString());

      dateGroupComponent.instance.appendNoteItemElementAtTheEnd(note);
    }
  }

  private appendNoteItemElementToTheTop(note: Note): void {
    if (note.date) {
      if (this.dateGroupComponents.get(note.date.toString()) === undefined) {
        this.appendDateGroupToTheTop(note.date);
      }
      const dateGroupComponent = this.dateGroupComponents.get(note.date.toString());

      dateGroupComponent.instance.appendNoteItemElementToTheTop(note);
    }
  }

  private appendDateGroupAtTheEnd(date: Date): void {
    const dateGroupComponent = this.createDateGroup(date);
    this.renderer.appendChild(
      this.dateGroups.nativeElement,
      dateGroupComponent.location.nativeElement
    );

    if(this.topDateGroupComponent === undefined) {
      this.topDateGroupComponent = dateGroupComponent;
    }
  }

  private appendDateGroupToTheTop(date: Date): void {
    if (this.topDateGroupComponent === undefined) {
      this.appendDateGroupAtTheEnd(date);
    } else {
      const dateGroupComponent = this.createDateGroup(date);
      this.renderer.insertBefore(
        this.dateGroups.nativeElement,
        dateGroupComponent.location.nativeElement,
        this.topDateGroupComponent.location.nativeElement
      );
      this.topDateGroupComponent = dateGroupComponent;
    }
  }

  private createDateGroup(date: Date): ComponentRef<DateGroupComponent> {
    const dateGroupComponentFactory = this.componentFactoryResolver.resolveComponentFactory(DateGroupComponent);
    const dateGroupComponent = this.viewContainerRef.createComponent<DateGroupComponent>(dateGroupComponentFactory);
    dateGroupComponent.changeDetectorRef.detectChanges();

    if (dateGroupComponent) {
      dateGroupComponent.instance.date = date;

      this.dateGroupComponents.set(date.toString(), dateGroupComponent);
    }

    return dateGroupComponent;
  }
}
