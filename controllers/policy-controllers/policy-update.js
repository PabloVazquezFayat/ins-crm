const Policy = require('../../models/Policy');

module.exports = async (req, res, next)=> {
    try{

        const newPolicyData = {};

        for (const key in req.body.data) {
            if(key !== "client_id"){
                newPolicyData[key] = req.body.data[key];
            }
        }

        const updatedPolicy = await Policy.findByIdAndUpdate({_id: req.body.data.policy_id}, newPolicyData, {new: true});

        if(updatedPolicy){
            res.status(200).json(updatedPolicy);
        }

    }catch(error){
        next(error);
    }
 }