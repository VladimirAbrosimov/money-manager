import { NoteType } from "./note-type";

export interface NoteCategory {
  type: NoteType,
  name: string,
  color: string
}
