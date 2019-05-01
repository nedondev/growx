'user strict';
var sql = require('../db.js');

var User = function(user){
    this.username = user.username;
    this.password = user.password;
    this.role = user.role;
    this.created_at = new Date();
};
User.createUser = function(newUser, result){
    sql.query("INSERT INTO user set ?", newUser, function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            console.log(res);
            result(null, res);
        }
    });
};
User.getUserRoleByUsername = function(username, result){
    sql.query("SELECT username,role FROM user WHERE username = ?", username, function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    
    });
};
User.getUserByAuth = function(user, result){
    sql.query("SELECT username, role FROM user WHERE username = ? and password = ?", [user.username, user.password], function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    
    });
};
User.getUserByUsername = function(username, result){
    sql.query("SELECT * FROM user WHERE username = ?", username, function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    
    });
};
User.getAllUser = function(result){
    sql.query("SELECT username, role FROM user WHERE role = 'user'", function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            console.log('Users: ',res);
            result(null, res);
        }
    });
};
User.changePassword = function(username, password, result){
    sql.query("UPDATE user SET password = ? WHERE username = ? ",[password,username], function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
User.remove = function(username, result){
    sql.query("DELETE FROM user WHERE username = ? ", username, function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

module.exports = User;
