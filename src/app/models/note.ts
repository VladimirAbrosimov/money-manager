import { NoteCategory } from "./note-category";
import { NoteType } from "./note-type";

export interface Note {
  type: NoteType,
  category: NoteCategory,
  amount: number,
  commentary?: string,
  date?: Date
}

