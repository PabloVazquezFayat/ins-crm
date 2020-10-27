const Note = require('../../models/Note');

module.exports = async (req, res, next)=> {
    try{

        const newNoteData = {};

        for (const key in req.body.data) {
            newNoteData[key] = req.body.data[key];
        }

        const updatedNote = await Note.findByIdAndUpdate({_id: req.body.data.id}, newNoteData, {new: true});

        if(updatedNote){
            res.status(200).json(updatedNote);
        }

    }catch(error){
        next(error);
    }
 }