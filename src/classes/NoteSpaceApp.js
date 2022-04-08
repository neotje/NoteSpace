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
    * @param {string} name name for the new NoteSpace
    * @returns {NoteSpace} newly created NoteSpace
    */
   createNoteSpace(name) {
      var newSpace = new NoteSpace(name, [], [])
      this.spaces.push(newSpace)

      this.emit("spaceCreated", newSpace)
      
      return newSpace
   }
   
   /**
    * open space by index
    * @param {number} spaceNum 
    * @returns {?NoteSpace} returns activated space.
    */
   openSpace(spaceNum) {
      var activatedSpace

      if(spaceNum > -1 && spaceNum < this.spaces.length) {
         this.activeSpace = spaceNum
         activatedSpace = this.spaces[spaceNum]
      } else {
         this.activeSpace = -1
      }

      this.emit("spaceOpened", this.activeSpace, activatedSpace)
   }
   
   /**
    * remove space by index
    * @param {number} spaceNum 
    * @returns {?NoteSpace} removed space.
    */
   removeSpace(spaceNum) {
      var removedSpace

      if(spaceNum > -1 && spaceNum < this.spaces.length) {
         removedSpace = this.spaces.splice(spaceNum, 1)[0]
      }

      this.emit("spaceRemoved", spaceNum, removedSpace)

      return removedSpace
   }
}

exports.NoteSpaceApp = NoteSpaceApp