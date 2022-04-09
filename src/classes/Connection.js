/**
 * @typedef {Object} ConnectionObject
 * @property {NoteId} from
 * @property {NoteId} to
 */

class Connection {
   from
   to

   /**
    * 
    * @param {NoteId} from 
    * @param {NoteId} to 
    */
   constructor(from, to) {
      this.from = from
      this.to = to
   }

   /**
    * @returns {ConnectionObject}
    */
   toObject() {
      return {
         from: this.from,
         to: this.to
      }
   }
}

exports.Connection = Connection