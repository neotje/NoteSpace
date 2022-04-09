const { SideBar } = require("./elements/sidebar/Sidebar")

const sideBar = new SideBar(document.querySelector(".notespace .sidebar"))

let renderSideBar = () => sideBar.renderNoteSpaceList(window.noteSpaceApp.spaces, window.noteSpaceApp.activeSpace)

renderSideBar()
window.noteSpaceApp.on("spaceCreated", renderSideBar)
window.noteSpaceApp.on("spaceRemoved", renderSideBar)
window.noteSpaceApp.on("spaceOpened", renderSideBar)