const Policy = require('../../models/Policy');

module.exports = async (req, res, next)=>{

    try{

        const newPolicy = {
            account: req.body.account_id,
            lineOfBusiness: req.body.data.lineOfBusiness,
            policyNumber: req.body.data.policyNumber,
            carrier: req.body.data.carrier,
            expirationDate: req.body.data.expirationDate,
            financeCompany: req.body.data.financeCompany,
            policyPremium: req.body.data.policyPremium,
            descriptionOfOperations: req.body.data.descriptionOfOperations,
            accords: req.body.data.accords,
            assets: req.body.data.assets,
        }

        const policy = await Policy.create(newPolicy);

        if(policy){
            res.status(200).json({message: `Policy ${policy.policyNumber} created`});
        }

    }catch(error){
        next(error);
    }

}