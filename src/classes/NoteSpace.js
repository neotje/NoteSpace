const { Connection } = require("./Connection")
const { Note } = require("./Note")
const { v4: uuidv4 } = require("uuid")

/**
 * Id for NoteSpace
 * @typedef {string} NoteSpaceId
 */

class NoteDoesNotExist extends Error {
   constructor() {
      super("Note does not exist in this NoteSpace.")
   }
}

class NoteSpace {
   id
   name
   notes
   connections

   /**
    * @param {NoteSpaceId} id Note space id
    * @param {string} name space name
    * @param {Note[]} notes notes in this space
    * @param {Connection[]} connections connection in this space
    */
   constructor(id, name, notes, connections) {
      this.id = id
      this.name = name
      this.notes = notes
      this.connections = connections
   }

   /**
    * Search for Note by id in this NoteSpace
    * @param {NoteId} id note id
    * @throws {NoteDoesNotExist} 
    * @returns {Note}
    */
   getNoteById(id) {
      return this.notes[this.getNoteIndexById(id)]
   }

   getNoteIndexById(id) {
      for (let index = 0; index < this.notes.length; index++) {
         const note = this.notes[index];

         if (note.id == id) return index
      }
      throw new NoteDoesNotExist()
   }

   /**
    * Check if this NoteSpace has a Note
    * @param {NoteId} id note id 
    * @returns {Boolean}
    */
   hasNoteById(id) {
      try {
         this.getNoteById(id)
         return true
      } catch (error) {
         return false
      }
   }

   /**
    * 
    * @param {string} name Name for the new note
    * @param {number[]} position Note position
    * @returns {Note} newly created note
    */
   createNote(name, position = []) {
      var newNote = new Note(uuidv4(), name, "", position)
      this.notes.push(newNote)

      return newNote
   }

   /**
    * Remove note by id.
    * @param {NoteId} id 
    * @returns {Note} removed note.
    */
   removeNote(id) {
      var noteIndex = this.getNoteIndexById(id)
      var removedNote = this.notes.splice(noteIndex, 1)

      return removedNote
   }

   /**
    * @param {string} from note id
    * @param {string} to note id
    * @returns {?Connection} newly created connection. null if one or both note id's don´t exist.
    */
   createConnection(from, to) {
      if(this.hasNoteById(from) && this.hasNoteById(to)) {
         var newConnection = new Connection(from, to)
         this.connections.push(newConnection)
         return newConnection
      }
   }
}

exports.NoteSpace = NoteSpace