import Note from "../models/Note.js";

export async function getAllNotes (req, res) {
    try {
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in fetching notes: ", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export async  function createNotes (req, res) {
    try {
       
        const {title, body}= req.body;
        if(!title || !body) return res.status(400).json({message: "Title and Body are required!"});
        const newNote = new Note({title, content: body});
        await newNote.save();
        res.status(201).json(newNote);
       
    } catch (error) {
        console.error("Error in creating notes:", error);
        res.status(500).json({message: "Internal server error"});
    }
};
export async function updateNotes(req, res) {
    try {
        const {title, body}= req.body;
        if(!title && !body) return res.status(400).json({message: "Title and Body are required!"});
        const updateNote =await Note.findByIdAndUpdate(req.params.id, {title, content: body}, {new: true});
        //if(!updateNote) return res.status(404).json({message: "Note not found!"});
        console.log("Note updated successfully!");
        res.status(201).json({message: "Note updated successfully!" + req.params.id});
    } catch (error) {
        console.error("Error in updating note: ", error);
        res.status(50).json({message: "Internal server errror"});

    }
};
export async function deleteNotes(req, res){
    try{
        const deletNote= await Note.findByIdAndDelete(req.params.id);
        //if(!deletNote) return res.status(404).json({message: "Note not found!"});
        res.status(200).json({message: "Note deleted successfully!" + req.params.id});
        console.log("Note deleted successully!");
    }catch (error) {
        console.error("Error in deleting note: ", error);
        res.status(500).json({message: "Internal server error"});
    }
};
export async function getById(req, res){
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({message: "Note not found!"});
         //if(!note) return res.status(404).json({message: "Note not found!"});
        console.log("Note fetched successfully!");
        res.json(note);
    } catch (error) {
        console.error("Error in fetching note by ID: ", error);
        res.status(500).json({message: "Internal server error"});
    }
};