const { NoteSpaceElement } = require("../NoteSpaceElement");

class SpaceRenderer extends NoteSpaceElement {
   context 

   /**
    * 
    * @param {HTMLCanvasElement} canvasElement 
    */
   constructor(canvasElement) {
      super(canvasElement)

      this.context = canvasElement.getContext("")
   }


   /**
    * 
    * @param {HTMLElement} contentElement 
    * @returns {SpaceRenderer}
    */
   static factory(contentElement) {
      const spaceRenderer = new SpaceRenderer(contentElement.querySelector(".space-canvas"))

      window.addEventListener("resize", () => {
         spaceRenderer.resize(contentElement.clientWidth, contentElement.clientHeight)
      })
      spaceRenderer.resize(contentElement.clientWidth, contentElement.clientHeight)

      return spaceRenderer
   }

   resize(width, height) {
      this.rootElement.width = width
      this.rootElement.height = height
   }
}

exports.SpaceRenderer = SpaceRenderer