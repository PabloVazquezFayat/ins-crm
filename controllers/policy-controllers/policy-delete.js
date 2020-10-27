const Policy = require('../../models/Policy');

module.exports = async (req, res, next)=> {
    try{

        const deletedPolicy = await Policy.findOneAndDelete({_id: req.body.data.id});

        if(deletedPolicy){
            res.status(200).json({message: `Policy deleted`});
        }else{
            res.status(404).json({message: `Policy not found`})
        }

    }catch(error){
        next(error);
    }
 }