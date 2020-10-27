const Client = require('../../models/Client');

module.exports = async (req, res, next)=> {
    try{

        const client = await Client.findOne({_id: req.params.id});

        if(client){
            res.status(200).json(client);
        }else{
            res.status(404).json({message: `Client not found`});
        }

    }catch(error){
        next(error);
    }
 }