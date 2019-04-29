'user strict';
var User = require('../model/userModel.js');

exports.list_all_user = function(req, res){
        User.getAllUser(function(err, user){
            
            console.log('user');
            if(err) res.send(err);
            console.log('res', user);
            res.status(200).send({result:user})
        });
    };

exports.create_a_user = function(req, res){
    var new_user = new User(req.body);
    console.log(new_user);
    if(!new_user.username) {
        res.status(400).send({err:true, message: 'Please provide username'});
    }
    else if(!new_user.password) {
        res.status(400).send({err:true, message: 'Please provide password'});
    }
    else if(!new_user.role) {
        res.status(400).send({err:true, message: 'Please provide role'});
    }
    else{
        User.getUserRoleByUsername(new_user.username, function(err, user_check){
            if(user_check.length > 0){
                res.status(400).send({err:true, message: 'Already have username'});
            }
            else{
                User.createUser(new_user, function(err, user){
                    if(err) res.send(err);
                    //res.status(200).send({result:user})
                    res.status(200).send({message: 'User successfully insert'});
                });
            }
        })
    }
};

exports.get_a_user = function(req, res){
        User.getUserRoleByUsername(req.params.username, function(err, user){
            if(err) res.send(err);
            res.status(200).send({result:user})
        });
    };

exports.change_a_password = function(req, res){
    if(!req.body.password) {
        res.status(400).send({err:true, message: 'Please provide password'});
    }
    else{
        User.getUserRoleByUsername(req.params.username, function(err, user_check){
            if(user_check.length > 0){
                User.changePassword(req.params.username, req.body.password, function(err, user){
                if(err) res.send(err);
                //res.json(user);
                res.status(200).send({message: 'User successfully change password'});
        });
                }
            else{
                res.status(400).send({message: 'no User in database'});
            }
        });
    }
};
exports.delete_a_user = function(req, res){
        User.getUserRoleByUsername(req.params.username, function(err, user_check){
            if(user_check.length > 0){
                User.remove(req.params.username, function(err, user){
                    if(err) res.send(err);
                    //res.json({ message: 'User successfully deleted'});
                    res.status(200).send({message: 'User successfully deleted'});
                });
            }
            else{
                res.status(400).send({message: 'no User in database'});
            }
        });
    };

