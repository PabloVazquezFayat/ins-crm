const Client = require('../../models/Client');

module.exports = async (req, res, next)=> {
    try{

        const newClientData = {
            account: req.body.account_id,
            name: req.body.data.name,
            businessName: req.body.data.businessName,
            email: req.body.data.email,
            phone: req.body.data.phone,
            address: req.body.data.address,
            city: req.body.data.city,
            state: req.body.data.state,
            zipCode: req.body.data.zipCode
        }  

        const newClient = await Client.create(newClientData);

        if(newClient){
            res.status(200).json({message: `Client created`, data: newClient});
        }

    }catch(error){
        next(error);
    }
 }