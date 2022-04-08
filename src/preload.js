const { NoteSpaceApp } = require('./classes/NoteSpaceApp')

const noteSpaceApp = new NoteSpaceApp([], -1)

noteSpaceApp.on("spaceCreated", console.log)

window.noteSpaceApp = noteSpaceApp