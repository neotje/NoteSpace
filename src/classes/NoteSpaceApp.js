const { NoteSpace } = require("./NoteSpace")
const EventEmitter = require("events")
const { v4: uuidv4 } = require("uuid")

class NoteSpaceDoesNotExist extends Error {
   constructor() {
      super("Notespace does not exist.")
   }
}

class NoteSpaceApp extends EventEmitter {
   spaces
   activeSpace

   /**
    * @param {NoteSpace[]} spaces
    * @param {?string} activeSpace active space by index
    */
   constructor(spaces, activeSpace) {
      super()

      this.spaces = spaces
      this.activeSpace = activeSpace
   }

   /**
    * @param {string} id Space id to look for.
    * @throws {NoteSpaceDoesNotExist}
    * @returns {?NoteSpace}
    */
   getSpaceById(id) {
      return this.spaces[this.getSpaceIndexById(id)]
   }

   /**
    * @param {string} id Space id to look for.
    * @throws {NoteSpaceDoesNotExist}
    * @returns {number} index of space.
    */
   getSpaceIndexById(id) {
      for (let index = 0; index < this.spaces.length; index++) {
         const element = this.spaces[index];

         if(space.id == id) return index
      }
      throw new NoteSpaceDoesNotExist()
   }

   /**
    * create a NoteSpace.
    * 
    * @fires NoteSpaceApp#spaceCreated
    * @param {string} name name for the new NoteSpace
    * @returns {NoteSpace} newly created NoteSpace
    */
   createNoteSpace(name) {
      var newSpace = new NoteSpace(uuidv4(), name, [], [])
      this.spaces.push(newSpace)

      /**
       * spaceCreated event.
       * 
       * @event NoteSpaceApp#spaceCreated
       * @type {NoteSpace}
       */
      this.emit("spaceCreated", newSpace)

      return newSpace
   }

   /**
    * open space by index
    * 
    * @fires NoteSpaceApp#spaceOpened
    * @param {string} id 
    * @returns {?NoteSpace} returns activated space.
    */
   openSpace(id) {
      var spaceToActivate = this.getSpaceById(id)
      this.activeSpace = spaceToActivate.id

      /**
       * space opened event.
       * @event NoteSpaceApp#spaceOpened
       * @type {NoteSpace}
       */
      this.emit("spaceOpened", spaceToActivate)
   }

   /**
    * remove space by index
    * 
    * @fires NoteSpaceApp#spaceRemoved
    * @param {string} id 
    * @returns {?NoteSpace} removed space.
    */
   removeSpace(id) {
      var spaceIndex = this.getSpaceIndexById(id)
      removedSpace = this.spaces.splice(spaceIndex, 1)[0]

      /**
       * space removed event.
       * 
       * @event NoteSpaceApp#spaceRemoved
       * @type {NoteSpace}
       */
      this.emit("spaceRemoved", removedSpace)

      return removedSpace
   }
}

exports.NoteSpaceApp = NoteSpaceApp