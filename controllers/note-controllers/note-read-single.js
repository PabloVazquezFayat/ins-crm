const Note = require('../../models/Note');

module.exports = async (req, res, next)=> {
    try{

        const note = await Note.findOne({_id: req.params.id})

        if(note){
            res.status(200).json(note);
        }else{
            res.status(404).json({message: `Note not found`});
        }

    }catch(error){
        next(error);
    }
 }