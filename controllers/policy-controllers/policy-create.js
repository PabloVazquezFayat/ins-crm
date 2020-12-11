const Policy = require('../../models/Policy');
const Client = require('../../models/Client');

module.exports = async (req, res, next)=>{

    try{

        const newPolicy = {
            account: req.body.account_id,
            client: req.body.data.client_id,
            lineOfBusiness: req.body.data.lineOfBusiness,
            policyNumber: req.body.data.policyNumber,
            carrier: req.body.data.carrier,
            expirationDate: req.body.data.expirationDate,
            financeCompany: req.body.data.financeCompany,
            policyPremium: req.body.data.policyPremium,
            descriptionOfOperations: req.body.data.descriptionOfOperations,
        }

        const policy = await Policy.create(newPolicy);
        const client = await Client.findByIdAndUpdate(req.body.data.client_id, {$push: {policies: policy._id}});

        if(policy && client){
            res.status(200).json({message: `Policy ${policy.policyNumber} created`, data: policy});
        }

    }catch(error){
        next(error);
    }

}