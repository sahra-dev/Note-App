export default class NotesView {
  constructor(root, handlers) {
    this.root = root
    const { onNoteAdd, onNoteEdit, onNoteSelect, onNoteDelete , onNoteDeleteAll } = handlers

    this.onNoteAdd = onNoteAdd
    this.onNoteEdit = onNoteEdit
    this.onNoteSelect = onNoteSelect
    this.onNoteDelete = onNoteDelete
    this.onNoteDeleteAll = onNoteDeleteAll

    this.root.innerHTML = `
        <div class="sidebar">
            <div class="sidebar_title">
                note app
            </div>
            <ul class="notes"></ul>
            <div class="sidebar_btns">
            <button class="add-note btn"> add note </button>
                <button class="delete-all-notes btn">
                    delete all 
                        <img src="./assets/icons/icons-trash.png" class="icon-img" />
                    </button>
            </div>
        </div>
        <div id="app">
            <input type="text"  class="app_title" placeholder="new note ..."/>
            <textarea class="app_body" placeholder="Take Some Notes"></textarea>
        </div>`

    const addNoteBtn = this.root.querySelector('.add-note')
    const deleteAllNotes = this.root.querySelector('.delete-all-notes')
    const inputTitle = this.root.querySelector('.app_title')
    const inputBody = this.root.querySelector('.app_body')


    addNoteBtn.addEventListener('click', () => {
      this.onNoteAdd()
    });
    deleteAllNotes.addEventListener('click', ()=>{
      this.onNoteDeleteAll()
    });
    [inputTitle, inputBody].forEach((inputField) => {
      inputField.addEventListener('blur', () => {
        const newBody = inputBody.value.trim()
        const newTitle = inputTitle.value.trim()
        this.onNoteEdit(newTitle, newBody)
      })
    })
  }

  //class private
  _createListItemHTML(id, title, body, updated) {
    const persianDate = new Date(updated).toLocaleDateString(
      'fa-IR-u-nu-latn',
      { year: 'numeric', month: 'long', day: 'numeric' },
    )
    const persianTime = new Date(updated).toLocaleTimeString(
      'fa-IR-u-nu-latn',
      { hour: 'numeric', minute: 'numeric' },
    )
    // body length
    const MAX_BODY_LENGTH = 50
    
    return `
        <li class="note" data-note-id='${id}'>
                    <div class="note_title">
                        <span>${title}</span>
                        <span class="icon" data-note-id='${id}'>
                            <img src="./assets/icons/icons-trash.png" class="icon-img" />
                        </span>
                    </div>
                    <div class="note_body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? '...' : ''}
                    </div>
                    <div class="note_date">${persianDate} , ${persianTime}  </div>
                </li>`
  }

  updateNoteList(notes) {
    const notesContainer = this.root.querySelector('.notes')
    notesContainer.innerHTML = ''
    let noteList = ''
    for (const note of notes) {
      const { id, title, body, updated } = note
      const html = this._createListItemHTML(id, title, body, updated)
      noteList += html
    }
    notesContainer.innerHTML = noteList
    notesContainer.querySelectorAll('.note').forEach((note) => {
      note.addEventListener('click', () => {
        this.onNoteSelect(note.dataset.noteId)
      })
    })
    notesContainer.querySelectorAll('.icon').forEach((trash) => {
      trash.addEventListener('click', (e) => {
        e.stopPropagation()
        this.onNoteDelete(trash.dataset.noteId)
      })
    })
  }

  updateActiveNote(note) {
    this.root.querySelector('.app_title').value = note.title
    this.root.querySelector('.app_body').value = note.body
    this.root.querySelectorAll('.note').forEach( note =>{
      note.classList.remove('selected')
    })
    this.root
      .querySelector(`.note[data-note-id="${note.id}"]`)
      .classList.add('selected');
  }
  updateNotePreviewVisibility(visible){
    this.root.querySelector('#app').style.visibility = visible ? 'visible' : 'hidden'
  }
}
