const Note = require('../../models/Note');

module.exports = async (req, res, next)=> {
    try{

        const newNoteData = {
            account: req.body.account_id,
            subject: req.body.data.subject,
            note: req.body.data.note,
            author: req.body.user_id
        }  

        const newNote = await Note.create(newNoteData);

        if(newNote){
            res.status(200).json({message: `Note created`, data: newNote});
        }

    }catch(error){
        next(error);
    }
 }