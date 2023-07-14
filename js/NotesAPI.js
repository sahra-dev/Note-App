const notes = [
  {
    id: 1,
    title: 'first note',
    body: ' about first note title we can say ...',
    updated: '2023-07-09T14:32:48.435Z',
  },
  {
    id: 2,
    title: 'second note',
    body: ' about second note title we can say ...',
    updated: '2000-07-09T14:32:48.435Z',
  },
  {
    id: 3,
    title: 'third note',
    body: ' about third note title we can say ...',
    updated: '2019-07-09T14:32:48.435Z',
  },
]

export default class NotesAPI {
  static getAllNotes() {
    const savedNotes = JSON.parse(localStorage.getItem('notes-app')) || []
    // const savedNotes = notes || [] ;
    return savedNotes.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1
    })
  }
  static saveNotes(noteToSave) {
    const notes = NotesAPI.getAllNotes()
    const existedNote = notes.find(
      (item) => parseInt(item.id) === parseInt(noteToSave.id),
    )
    if (existedNote) {
      ;(existedNote.title = noteToSave.title),
        (existedNote.body = noteToSave.body),
        (existedNote.updated = new Date().toISOString())
    } else {
      noteToSave.id = new Date().getTime()
      noteToSave.updated = new Date().toISOString()
      notes.push(noteToSave)
    }
    localStorage.setItem('notes-app', JSON.stringify(notes))
  }
  static deleteNotes(id) {
    const notes = NotesAPI.getAllNotes()
    const filteredNote = notes.filter((n) => parseInt(n.id) !== parseInt(id))
    localStorage.setItem('notes-app', JSON.stringify(filteredNote))
  }
}
