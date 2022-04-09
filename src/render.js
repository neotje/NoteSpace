const { SideBar } = require("./elements/sidebar/Sidebar")
const { SpaceRenderer } = require("./elements/spaceRenderer/SpaceRenderer")

const sideBar = SideBar.factory(document.querySelector(".notespace .sidebar"))
const spaceRenderer = SpaceRenderer.factory(document.querySelector(".notespace .content"))
