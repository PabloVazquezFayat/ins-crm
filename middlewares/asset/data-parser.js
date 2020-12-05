module.exports = (req, res, next)=>{

    const { body } = req.body;

    if(!body){
        return res.status(500).json({error: 'Malformed request body'});
    }else{
        req.body = JSON.parse(body);
        return next();
    }

}