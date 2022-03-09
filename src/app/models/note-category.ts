import { NoteType } from "./note-type";

export class NoteCategory {
    constructor(
        public type: NoteType,
        public name: string,
        public color: string
    ) { }
}