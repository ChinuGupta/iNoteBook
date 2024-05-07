const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//ROUTE1:get all notes using :Get "api/notes/fetchallnotes".Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

//ROUTE2:add all notes using :post "api/notes/addallnotes".Login required
router.post(
  "/addallnotes",
  fetchuser,
  [
    body("title", "Enter a vlaid title").isLength({ min: 3 }),
    body("description", "Enter a description of character 9").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there are errors return bad request,return bad request
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      //  await Notes.create({
      //     title: req.body.title,
      //     description: req.body.description,
      //     tag: req.body.tag,
      //   });

      const savenote = await note.save();
      res.json(savenote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE3:update an existing note using :put "api/notes/updatenotes".Login required
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //create newnote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find the note to updated and update  it
    let note = await Note.findById(req.params.id); //here we found notes id not user id
    if (!note) {
      res.status(404).send("Not found");
    }

    //note.user.toString() is give users id
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }

    //if user id found the we update the notes
    note = await Note.findByIdAndUpdate(
     req.params.id, 
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error",error);
  }
});

//ROUTE4:delete an existing note using :delete "api/notes/deletenotes".Login required
router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  //id id notes id here
  try {

    //find the note to delete and delete  it
    let note = await Note.findById(req.params.id); //here we found notes id not user id

    if (!note) {
      return res.status(404).send("Not found");
    }

    //Allow deletion only if the user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }

    await Note.findByIdAndDelete(req.params.id);
    res.json({ SUCCESS: "HAS BEEN DELETED" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
