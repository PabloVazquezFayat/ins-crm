const Note = require('../../models/Note');

module.exports = async (req, res, next)=> {
    try{

        const deletedNote = await Note.findOneAndDelete({_id: req.body.data.id});

        if(deletedNote){
            res.status(200).json({message: `Note deleted`});
        }else{
            res.status(404).json({message: `Note not found`})
        }

    }catch(error){
        next(error);
    }
 }