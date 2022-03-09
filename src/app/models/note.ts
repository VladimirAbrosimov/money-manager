import { NoteCategory } from "./note-category";
import { NoteType } from "./note-type";

export class Note {
    constructor(
        public type: NoteType,
        public category: NoteCategory,
        public amount: number,
        public commentary?: string,
        public date?: Date
    ) { }

    // get type() {
    //     return this._type.toLowerCase();
    // }

    // get category() {
    //     return this._category.toLowerCase();
    // }
}