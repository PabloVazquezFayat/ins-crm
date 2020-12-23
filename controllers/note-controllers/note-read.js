const Note = require('../../models/Note');

module.exports = async (req, res, next)=> {
    try{

        const notes = await Note.find({account: req.params.account_id});

        if(notes){
            res.status(200).json(notes);
        }else{
            res.status(404).json({message: `No notes found`});
        }

    }catch(error){
        next(error);
    }
 }