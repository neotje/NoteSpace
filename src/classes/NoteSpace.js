const { Connection } = require("./Connection")
const { Note } = require("./Note")

class NoteSpace {
   id
   name
   notes
   connections

   /**
    * @param {string} id Note space id
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

   createNote(name) {
      var newNote = new Note(/*name*/)
      this.notes.push(newNote)
   }
}

exports.NoteSpace = NoteSpace