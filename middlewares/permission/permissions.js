const User = require('../../models/User');
const Account = require('../../models/Account');

const adminPermission = async(req, res, next)=> {

    console.log(req.body);

    const user = await User.findOne({_id: req.body.user_id});

    if(user && user.permissions.admin === true && user.account.toString() === req.body.account_id.toString()){
        next();
    }else{
        res.status(403).json({message: 'This action is not allowed.'});
    }

}

const createPermission = async(req, res, next)=> {

    const user = await User.findOne({_id: req.body.user_id});

    if(user && user.permissions.create === true){
        next();
    }else{  
        res.status(403).json({message: 'You are not allowed to perform this action, please check with your admin.'});
    }

}

const readPermission = async(req, res, next)=> {

    const user = await User.findOne({_id: req.body.user_id});
    const account = await Account.findOne({_id: req.body.account_id});

    if(user && user.permissions.read === true && user.account.toString() === account._id.toString()){
        next();
    }else{  
        res.status(403).json({message: 'You are not allowed to perform this action, please check with your admin.'});
    }

}

const updatePermission = async(req, res, next)=> {

    const user = await User.findOne({_id: req.body.user_id});
    const account = await Account.findOne({_id: req.body.account_id});

    if(user && user.permissions.update === true && user.account.toString() === account._id.toString()){
        next();
    }else{  
        res.status(403).json({message: 'You are not allowed to perform this action, please check with your admin.'});
    }

}

const deletePermission = async(req, res, next)=> {

    const user = await User.findOne({_id: req.body.user_id});
    const account = await Account.findOne({_id: req.body.account_id});

    if(user && user.permissions.delete === true && user.account.toString() === account._id.toString()){
        next();
    }else{  
        res.status(403).json({message: 'You are not allowed to perform this action, please check with your admin.'});
    }

}

module.exports = {
    adminPermission:  adminPermission,
    createPermission: createPermission,
    readPermission:   readPermission, 
    updatePermission: updatePermission, 
    deletePermission: deletePermission
}