const notesContainer = document.getElementById('app');
const addNoteBtn = document.querySelector('.add-note');

GetNotes().forEach(note => {
    const noteElement = CreateNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteBtn);
});

addNoteBtn.onclick = () => AddNote();

function GetNotes() {
    return JSON.parse(localStorage.getItem("stickynotes-note") || "[]");
}

function SaveNotes(notes) {
    localStorage.setItem("stickynotes-note", JSON.stringify(notes));
}

function CreateNoteElement(id, content) {
    const element = document.createElement('textarea');

    element.classList.add('note');
    element.value = content;
    element.placeholder = 'Empty Sticky note';

    element.onchange = () => {
        UpdateNote(id, element.value);
    }

    element.ondblclick = () => {
        const doDelete = confirm("Are you sure you want to delete this note?");
        if (doDelete) {
            DeleteNote(id, element);
        }
    }

    return element;
}

function AddNote() {
    const existingNotes = GetNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: "",
    };

    const noteElement = CreateNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteBtn);

    existingNotes.push(noteObject);
    SaveNotes(existingNotes);
}

function UpdateNote(id, newContent) {
    const notes = GetNotes();
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    SaveNotes(notes)
}

function DeleteNote(id, element) {
    const notes = GetNotes().filter(note => note.id != id);

    SaveNotes(notes);
    notesContainer.removeChild(element);
}