const Client = require('../../models/Client');

module.exports = async (req, res, next)=> {
    try{

        const clients = await Client.find();

        if(clients){
            res.status(200).json(clients);
        }else{
            res.status(404).json({message: `No Clients found`});
        }

    }catch(error){
        next(error);
    }
 }