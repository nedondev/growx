'user strict';
var sql = require('../db.js');

var Work_on = function(work_on){
    this.usr_id= work_on.usr_id;
    this.farm_id= work_on.farm_id;
    this.permission= work_on.permission;
};
Work_on.createWork_on = function(newWork_on, result){
    sql.query("INSERT INTO work_on set ?", newWork_on, function(err, res){
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
//for check creation
Work_on.getWork_onByUsernameAndFarm_id= function(usr_id, farm_id, result){
    sql.query("SELECT permission FROM work_on WHERE usr_id = ? and farm_id = ?", [usr_id, farm_id], function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    
    });
};
//for listing
Work_on.getWork_onByUsername= function(username, result){
    sql.query("SELECT * FROM work_on WHERE usr_id = ?", username, function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    
    });
};
Work_on.getAllWork_on = function(result){
    sql.query("SELECT * FROM work_on", function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            console.log('Work_on: ',res);
            result(null, res);
        }
    });
};
Work_on.changePermission= function(username, farm_id, permission, result){
    sql.query("UPDATE work_on SET permission = ? WHERE usr_id = ? and farm_id = ?",[permission,username,farm_id], function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

module.exports = Work_on;
