/**
 * A id for a Note
 * @typedef {string} NoteId
 */

/**
 * @typedef {Object} NoteObject
 * @property {NoteId} id
 * @property {string} name
 * @property {string} content
 * @property {number[]} position
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

   /**
    * @returns {NoteObject}
    */
   toObject() {
      return {
         id: this.id,
         name: this.name,
         content: this.content,
         position: this.position
      }
   }
}

exports.Note = Note