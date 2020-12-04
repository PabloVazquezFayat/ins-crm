const Asset = require('../../models/Asset');

module.exports = async (req, res, next)=>{

    console.log(req.body);

    try{    

        // const newAsset = {
        //     account: req.body.account_id,
        //     models: req.body.data.models,
        //     association: req.body.data.association,
        //     dateCreated: req.body.data.dateCreated,
        //     dateModified: req.body.data.dateModified
        //     name: req.body.file.name
        //     url: req.body.file.,
        // }

        // const asset = await Asset.create(newAsset);

        // if(asset){
        //     res.status(200).json({message: `Asset ${asset.name} created`});
        // }

        res.status(200).json({msg: 'done'});

    }catch(error){
        next(error);
    }

}