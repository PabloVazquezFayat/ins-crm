const Client = require('../../models/Client');

module.exports = async (req, res, next)=> {
    try{

        const newClientData = {};

        for (const key in req.body.data) {
            newClientData[key] = req.body.data[key];
        }

        const updatedClient = await Client.findByIdAndUpdate({_id: req.body.data.id}, newClientData, {new: true});

        if(updatedClient){
            res.status(200).json(updatedClient);
        }

    }catch(error){
        next(error)
    }
 }