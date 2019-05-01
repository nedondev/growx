'user strict';
var User = require('../model/userModel.js');

exports.login = function(req, res){
    var user = new User(req.body);
    console.log(user);
    if(!user.username) {
        res.status(400).send({err:true, message: 'Please provide username'});
    }
    else if(!user.password) {
        res.status(400).send({err:true, message: 'Please provide password'});
    }
    else{
        User.getUserByAuth(user, function(err, user){
            if(err) res.send(err);
            res.status(200).send({result:user})
        });
    }
};

