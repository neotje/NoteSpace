const { NoteSpace } = require("../../classes/NoteSpace")
const { NoteSpaceElement } = require("../NoteSpaceElement")

class SideBar extends NoteSpaceElement {
   /** @type {HTMLElement} */
   noteSpaceCreateButton
   /** @type {HTMLDivElement} */
   noteSpaceList
   /** @type {HTMLInputElement} */
   noteSpaceCreateInput

   /** @type {AbortController} */
   abortController

   /**
    * @param {HTMLElement} sideBarElement 
    */
   constructor(sideBarElement) {
      super(sideBarElement)

      this.noteSpaceCreateButton = this.rootElement.querySelector(".header .material-icons")
      this.noteSpaceCreateButton.addEventListener("click", () => {
         this.onNoteSpaceCreate()
      }, { once: true })

      this.noteSpaceList = this.rootElement.querySelector(".items")
   }

   /**
    * @returns {HTMLInputElement}
    */
   getCreateInput() {
      var input = document.createElement("input")
      input.classList.add("create")
      input.setAttribute("type", "text")

      return input
   }

   /**
    * @param {NoteSpace} noteSpace 
    * @returns {HTMLElement}
    */
   getNoteSpaceItem(noteSpace) {
      var item = document.createElement("div")
      item.classList.add("item")
      item.addEventListener("click", (mouseEvent) => this.onNoteSpaceOpen(mouseEvent.target))

      item.id = noteSpace.id
      item.innerHTML = noteSpace.name

      return item
   }

   /**
    * @param {NoteSpace[]} noteSpaces 
    * @param {?string} openSpace
    */
   renderNoteSpaceList(noteSpaces, openSpace) {
      this.noteSpaceList.innerHTML = ""

      for (const noteSpace of noteSpaces) {
         var item = this.getNoteSpaceItem(noteSpace)

         if(noteSpace.id == openSpace) {
            item.classList.add("active")
         }

         this.noteSpaceList.appendChild(item)
      }
   }

   /**
    * Create AbortController
    * Get new text input
    * add events
    * add input to tree
    * focus input
    * 
    * Escape || click outside input: onNoteSpaceCreateAbort()
    * Enter: onNoteSpaceCreateConfirm()
    */
   onNoteSpaceCreate() {
      this.abortController = new AbortController()

      this.noteSpaceCreateInput = this.getCreateInput()

      this.noteSpaceCreateInput.addEventListener("keyup", (keyboardEvent) => {
         if (keyboardEvent.key == "Escape") this.onNoteSpaceCreateAbort()
         else if (keyboardEvent.key == "Enter") this.onNoteSpaceCreateConfirm()
      }, { signal: this.abortController.signal })

      document.addEventListener("click", (mouseEvent) => {
         if (mouseEvent.target != this.noteSpaceCreateInput && mouseEvent.target != this.noteSpaceCreateButton) {
            this.onNoteSpaceCreateAbort()
         }
      }, { signal: this.abortController.signal })

      this.rootElement.appendChild(this.noteSpaceCreateInput)
      this.noteSpaceCreateInput.focus()
   }

   onNoteSpaceCreateConfirm() {
      var newNoteSpaceName = this.noteSpaceCreateInput.value.trim()

      if (newNoteSpaceName.length > 1) {
         window.noteSpaceApp.createNoteSpace(newNoteSpaceName)
         this.afterNoteSpaceCreate()
      }
   }

   onNoteSpaceCreateAbort() {
      this.afterNoteSpaceCreate()
   }

   afterNoteSpaceCreate() {
      this.abortController.abort()

      this.noteSpaceCreateButton.addEventListener("click", () => {
         this.onNoteSpaceCreate()
      }, { once: true })

      this.noteSpaceCreateInput.remove()
   }

   /**
    * @param {HTMLDivElement} item 
    */
   onNoteSpaceOpen(item) {
      console.log(item.id)
      window.noteSpaceApp.openSpace(item.id)
   }
}

exports.SideBar = SideBar