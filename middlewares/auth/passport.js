const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');

const fields = {
    usernameField: 'email',
    passwordField: 'password'
}

const callback = async (email, password, cb)=> {
      
    const user = await User.findOne({email, password});

    if(user){
        return user;
    }else{
        return cb();
    }

}

const strategy = new LocalStrategy(fields, (email, password, cb)=> {        
    //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT        
    return UserModel.findOne({email, password})
       .then(user => {
           if (!user) {
               return cb(null, false, {message: 'Incorrect email or password.'});
           }               return cb(null, user, {message: 'Logged In Successfully'});
      })
      .catch(err => cb(err));
}
))

passport.use(strategy);