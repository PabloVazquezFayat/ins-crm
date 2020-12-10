module.exports = (user)=> { 

    const sanitizedUser = {};

    if(typeof user !== "object" || Object.keys(user).length === 0){
        return false;
    }

    for (const key in user) {
        if(key === "_id" || key === "account" || key === "email" || key === "permissions" || key === "name"){
            sanitizedUser[key] = user[key];
        }
    }

    return sanitizedUser;

}