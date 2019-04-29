'user stricta';
var sql = require('../db.js');

var Farm = function(farm){
    this.name = farm.name;
    this.usr_id = farm.username;
    this.created_at= new Date();
};

Farm.createFarm = function(newFarm, result){
    //sql.query("INSERT INTO farm (name, usr_id, created_at ) values ?", 
    //        [newFarm.name, newFarm.usr_id, newFarma.created_at], function(err, res){
    sql.query("INSERT INTO farm set ?", newFarm, function(err, res){
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

Farm.getFarmByUsrId = function(usr_id, result){
    sql.query("SELECT * FROM farm WHERE usr_id = ?", usr_id, function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    
    });
};
Farm.getFarmByFarmId = function(farm_id, result){
    sql.query("SELECT * FROM farm WHERE farm_id = ?", farm_id, function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    
    });
};
Farm.getAllFarm = function(result){
    sql.query("SELECT * FROM farm", function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            console.log('Farm: ',res);
            result(null, res);
        }
    });
};
Farm.changeName = function(farm_id, name, result){
    sql.query("UPDATE farm SET name = ? WHERE farm_id = ? ",[name,farm_id], function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
Farm.remove = function(farm_id, result){
    sql.query("DELETE FROM farm WHERE farm_id = ? ", farm_id, function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

module.exports = Farm;
