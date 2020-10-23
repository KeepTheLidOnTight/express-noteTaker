// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const { json } = require("express");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;
const dbPath = path.join(__dirname, "db/db.json");
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// These are the API routes
app.get("/api/notes", function(req, res) {
    fs.readFile(dbPath, "utf-8", function(err, data){
        data = JSON.parse(data);
        console.log(data);
        return res.json(data);
    });
    
});

app.post("/api/notes", function(req, res) {
    console.log(req.body);
    fs.readFile(dbPath, "utf-8", function(err, data){
        data = JSON.parse(data);
        data.push(req.body);
        console.log(data);
        fs.writeFile(dbPath, JSON.stringify(data), "utf-8", function(err){
            return res.json(data);
    });
       
    });
    
});
// This is the API route to delete the notes that have been saved
app.delete("/api/notes/:id", function (req, res) {
    fs.readFile(dbPath, "utf-8",);
    let noteID = req.params.id;
    let newID = 0;
    console.log(`Deleting note with ID ${noteID}`);
    notesSaved = notesSaved.filter(currNote => {
        return currNote.id != noteID;
    })
    //loop over saved notes

    for (currNote of savedNotes) {
        currNote.id = newID.toString();
        newID++;
    }
    fs.writeFileSync("/db/db.json", JSON.stringify(notesSaved));
    res.json(notesSaved);

})


// These are the HTML routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });


app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

  // Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });