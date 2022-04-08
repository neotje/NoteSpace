const { NoteSpace } = require("./NoteSpace")
const EventEmitter = require("events")

class NoteSpaceApp extends EventEmitter {
   spaces
   activeSpace

   /**
    * @param {NoteSpace[]} spaces
    * @param {number} activeSpace active space by index. -1 is none
    */
   constructor(spaces, activeSpace) {
      super()

      this.spaces = spaces
      this.activeSpace = activeSpace
   }

   /**
    * create a NoteSpace.
    * 
    * @fires NoteSpaceApp#spaceCreated
    * @param {string} name name for the new NoteSpace
    * @returns {NoteSpace} newly created NoteSpace
    */
   createNoteSpace(name) {
      var newSpace = new NoteSpace(name, [], [])
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
    * @param {number} spaceNum 
    * @returns {?NoteSpace} returns activated space.
    */
   openSpace(spaceNum) {
      var activatedSpace

      if (spaceNum > -1 && spaceNum < this.spaces.length) {
         this.activeSpace = spaceNum
         activatedSpace = this.spaces[spaceNum]
      } else {
         this.activeSpace = -1
      }

      /**
       * space opened event.
       * @event NoteSpaceApp#spaceOpened
       * @type {object}
       * @property {number} activeSpace space index
       * @property {?NoteSpace} activatedSpace space object
       */
      this.emit("spaceOpened", {
         activeSpace: this.activeSpace, 
         activatedSpace: activatedSpace
      })
   }

   /**
    * remove space by index
    * 
    * @fires NoteSpaceApp#spaceRemoved
    * @param {number} spaceNum 
    * @returns {?NoteSpace} removed space.
    */
   removeSpace(spaceNum) {
      var removedSpace

      if (spaceNum > -1 && spaceNum < this.spaces.length) {
         removedSpace = this.spaces.splice(spaceNum, 1)[0]
      }

      /**
       * space removed event.
       * 
       * @event NoteSpaceApp#spaceRemoved
       * @type {object}
       * @property {number} spaceNum index of removed space.
       * @property {?NoteSpace} removedSpace object of removed space.
       */
      this.emit("spaceRemoved", {spaceNum, removedSpace})

      return removedSpace
   }
}

exports.NoteSpaceApp = NoteSpaceApp