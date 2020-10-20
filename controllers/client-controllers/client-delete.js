const Client = require('../../models/Client');

module.exports = async (req, res, next)=> {
    try{

        const deletedClient = await Client.findOneAndDelete({_id: req.body.id});

        if(deletedClient){
            res.status(200).json({message: `Client deleted`});
        }else{
            res.status(404).json({message: `Client not found`})
        }

    }catch(error){
        next(error);
    }
 }