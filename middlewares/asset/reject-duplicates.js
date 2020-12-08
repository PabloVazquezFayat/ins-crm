const Asset = require('../../models/Asset');

module.exports = async (req, res, next)=> {

    try{

        const assetDuplicate = await Asset.findOne({name: req.file.originalname});

        if(assetDuplicate){
            return res.status(403).json({error: 'Asset name already exists, please use a unique name.'});
        }else{
            next();
        }

    }catch(error){
        next(error);
    }

}