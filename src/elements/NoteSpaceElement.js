class NoteSpaceElement {
   rootElement

   /**
    * @param {HTMLElement} rootElement 
    */
   constructor(rootElement) {
      this.rootElement = rootElement

      console.log("Loading:", this)
   }

   static factory() {
      throw new Error("Method factory() must be implemented")
   }
}

exports.NoteSpaceElement = NoteSpaceElement