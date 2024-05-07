import React, { useState, useContext, useEffect, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNotes from "./AddNotes";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
  const context = useContext(noteContext);
  const { notes, getNote, editNote } = context;
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNote();
    } 
    else {
      navigate("/login");
    }

    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote.id,
      user:currentNote.user_id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  // const handleClick = (e) => {
  //   editNote(note.id, note.etitle, note.edescription, note.etag);
  //   refClose.current.click();
  //   props.showAlert("Updated Successfully", "success");
  // };
  const handleClick = async (e) => {
    try {
      await editNote(note.id, note.etitle, note.edescription, note.etag);
      refClose.current.click();
      props.showAlert("Updated Successfully", "success");
    } catch (error) {
      console.error("Error updating note:", error);
      // Handle the error gracefully, e.g., show an error message to the user.
      props.showAlert("Failed to update note", "error");
    }
  };
  
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); // to preserve the existing properties of the note object and updates the property corresponding to the input field that changed.
  };

  return (
    <>
      <AddNotes showAlert={props.showAlert} />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        ref={ref}
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              {" "}
              <form action="" className="container my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={note.etitle}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                  <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edesc"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=" row text-center my-3">
        {/* <h1>Your notes</h1>
        <h4 className="container">
          {notes.length === 0 && "No Notes To Display"}
        </h4>
        {notes.map((note) => {
          return (
            <Noteitem
              key={note._id}
              updateNote={updateNote}
              note={note}
              showAlert={props.showAlert}
            />
          );
        })} */}
<h1>Your notes</h1>
{Array.isArray(notes) && notes.length > 0 ? (
  notes.map((note) => (
    <Noteitem
      key={note._id}
      updateNote={updateNote}
      note={note}
      showAlert={props.showAlert}
    />
  ))
) : (
  <h4 className="container">No Notes To Display</h4>
)}
      </div>
      
    </>
  );
}
