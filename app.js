import express from "express";

import { getNotes, getNote, createNote, deleteNote, updateNote } from "./database.js";
//import { title } from "process";

const app = express();

app.use(express.json());

app.get("/notes", async (req, res) => {
  const notes = await getNotes();
  res.send(notes);
});

app.get("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const note = await getNote(id);
  res.send(note);
});

app.post("/notes", async (req, res) => {
  const { title, contents } = req.body;
  const note = await createNote(title, contents);
  res.status(+201).send(note);
});

app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const note = await deleteNote(id);
  res.send(note);
});

app.put("/notes/:id", async (req, res) => {
  console.log(req.params, "lllllllll");
  console.log(res);

  const id = req.params.id;
  console.log(id, "0000000");

  const title = req.body.title;
  //console.log(title, "ttttttttt");

  const contents = req.body.contents;
  //console.log(contents, "cccccccccc");

  //const { title, contents } = req.body;
  const note = await updateNote(id, title, contents);

  res.status(200).send(note);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
