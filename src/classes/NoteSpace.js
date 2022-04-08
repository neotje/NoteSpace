const { Connection } = require("./Connection")
const { Note } = require("./Note")

class NoteSpace {
   name
   notes
   connections

   /**
    * @param {string} name space name
    * @param {Note[]} notes notes in this space
    * @param {Connection[]} connections connection in this space
    */
   constructor(name, notes, connections) {
      this.name = name
      this.notes = notes
      this.connections = connections
   }
}

exports.NoteSpace = NoteSpace