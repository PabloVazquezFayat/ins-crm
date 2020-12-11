const Policy = require('../../models/Policy');
const Client = require('../../models/Client');

module.exports = async (req, res, next)=> {
    try{

        const deletedPolicy = await Policy.findOneAndDelete({_id: req.body.data.policy_id});
        const updatedClient = await Client.findOneAndUpdate(req.body.data.client_id, {$pull: {policies: req.body.data.policy_id}});

        if(deletedPolicy && updatedClient){
            res.status(200).json({message: `Policy deleted`});
        }else{
            res.status(404).json({message: `Policy not found`});
        }

    }catch(error){
        next(error);
    }
 }