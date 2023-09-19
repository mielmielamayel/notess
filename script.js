document.addEventListener("DOMContentLoaded", function () {
    const addNoteButton = document.getElementById("add-note");
    const saveNotesButton = document.getElementById("save-notes");
    const noteContainer = document.getElementById("note-container");
    let notesArray = []; 

    loadNotes();

    addNoteButton.addEventListener("click", createNote);
    saveNotesButton.addEventListener("click", saveNotes);

    function createNote() {
        const note = document.createElement("div");
        note.className = "note";

        const textarea = document.createElement("textarea");
        textarea.className = "note-textarea";
        textarea.placeholder = " ";

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerText = "Delete";

        deleteButton.addEventListener("click", () => {
            noteContainer.removeChild(note);
         
            removeNoteFromArray(note);
      
            removeNoteFromLocalStorage(textarea);
        });

      
        noteContainer.insertBefore(note, noteContainer.firstChild);

        note.appendChild(textarea);
        note.appendChild(deleteButton);

        notesArray.unshift({ textarea, note });
    }

    function saveNotes() {
        
        notesArray = notesArray.filter(noteData => noteContainer.contains(noteData.note));
        
        localStorage.setItem("notes", JSON.stringify(notesArray.map(noteData => noteData.textarea.value)));
    }

    function loadNotes() {
        const notesData = JSON.parse(localStorage.getItem("notes"));
        if (Array.isArray(notesData)) {
            
            noteContainer.innerHTML = "";

          
            notesData.forEach((noteText) => {
                const note = document.createElement("div");
                note.className = "note";

                const textarea = document.createElement("textarea");
                textarea.className = "note-textarea";
                textarea.value = noteText;

                const deleteButton = document.createElement("button");
                deleteButton.className = "delete-button";
                deleteButton.innerText = "Delete";

                deleteButton.addEventListener("click", () => {
                    noteContainer.removeChild(note);
                    
                    removeNoteFromArray({ textarea, note });
                    
                    removeNoteFromLocalStorage(textarea);
                });

                
                noteContainer.appendChild(note);

                note.appendChild(textarea);
                note.appendChild(deleteButton);

                
                notesArray.unshift({ textarea, note });
            });
        }
    }

    function removeNoteFromArray(noteData) {
        
        notesArray = notesArray.filter(data => data !== noteData);
    }

    function removeNoteFromLocalStorage(textarea) {
        const index = notesArray.findIndex(data => data.textarea === textarea);
        if (index !== -1) {
           
            notesArray.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(notesArray.map(noteData => noteData.textarea.value)));
        }
    }
});
