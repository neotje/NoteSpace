/**
 * A id for a Note
 * @typedef {string} NoteId
 */

class Note {
   id
   name
   content
   position

   /**
    * @param {NoteId} id note id
    * @param {string} name title of the note
    * @param {string} content note content
    * @param {number[]} position position inside the NoteSpace
    */
   constructor(id, name, content, position) {
      this.id = id
      this.name = name
      this.content = content
      this.position = position
   }
}

exports.Note = Note