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
}

exports.Connection = Connection