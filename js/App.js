import NotesAPI from './NotesAPI.js'
import NotesView from './NotesView.js'
export default class App {
  constructor(root) {
    this.notes = []
    this.activeNote = null
    this.view = new NotesView(root, this._handlers())
    this._refreshNotes()
  }
  _refreshNotes() {
    const notes = NotesAPI.getAllNotes()
    this._setNotes(notes)
    if (notes.length > 0) {
      this._setActiveNote(notes[0])
    }
  }
  _setNotes(notes) {
    this.notes = notes
    this.view.updateNoteList(notes)
    this.view.updateNotePreviewVisibility(notes.length > 0)
  }
  _setActiveNote(note) {
    this.activeNote = note
    this.view.updateActiveNote(note)
  }

  _handlers() {
    return {
      onNoteAdd: () => {
        const newNote = {
          title: '',
          body: '',
        }
        NotesAPI.saveNotes(newNote)
        this._refreshNotes()
      },
      onNoteEdit: (newTitle, newBody) => {
        NotesAPI.saveNotes({
          id: this.activeNote.id,
          title: newTitle,
          body: newBody,
        })
        this._refreshNotes()
      },
      onNoteSelect: (id) => {
        const selectedNotes = this.notes.find(
          (note) => parseInt(note.id) === parseInt(id),
        )
        this._setActiveNote(selectedNotes)
      },
      onNoteDelete: (id) => {
        NotesAPI.deleteNotes(id)
        this._refreshNotes()
      },
      onNoteDeleteAll: () => {
        this.notes.forEach((note) => {
          NotesAPI.deleteNotes(note.id)
        })
        this._refreshNotes()
      },
    }
  }
}
