'user strict';
var Farm = require('../model/farmModel.js');
var Work_on = require('../model/work_onModel.js');
var User = require('../model/userModel.js');

exports.list_or_create_by_usr = function(req, res){
    /*if(!req.body.option){
        Farm.getAllFarm(function(err, farm){
            console.log('farm');
            if(err) res.send(err);
            console.log('res', farm);
            res.status(200).send({result:farm})
        });
    }*/
    if(req.body.option === 'list'){
        Farm.getFarmByUsrId(req.body.username, function(err, farm){
            console.log('farm listing');
            if(err) res.send(err);
            console.log('res', farm);
            res.status(200).send({result:farm})
        });
    }
    else if(req.body.option === 'create'){
        console.log("create");
        var new_farm = new Farm(req.body);
        console.log(new_farm);
        if(!new_farm.usr_id) {
            res.status(400).send({err:true, message: 'Please provide username'});
        }
        else if(!new_farm.name) {
            res.status(400).send({err:true, message: 'Please provide name'});
        }
        else{
            User.getUserRoleByUsername(req.body.username, function(err, user){
                if(err) res.send(err);
                if(user.length > 0){
                   if(user[0].role === 'user'){
                        Farm.createFarm(new_farm, function(err, farm){
                            if(err) res.send(err);
                            var new_work_on = new Work_on({
                                usr_id : req.body.username,
                                farm_id : farm.insertId,
                                permission : 'owner'
                            });
                            Work_on.createWork_on(new_work_on, function(err, work_on){
                                if(err) res.send(err);
                                res.status(200).send({message: 'Farm successfully insert'});
                            });
                        });
                   }
                   else{
                    res.status(400).send({err:true, message: 'you User can\'t create farm'});
                   }
                }
                else{
                    res.status(400).send({err:true, message: 'no User in database'});
                }
            });
        }
    }
};

//exports.create_a_farm = function(req, res{};
exports.get_a_farm = function(req, res){
        Farm.getFarmByFarmId(req.params.farm_id, function(err, farm){
            if(err) res.send(err);

            res.status(200).send({result:farm})
        });
    };

exports.change_a_name = function(req, res){
    if(!req.body.name) {
        res.status(400).send({err:true, message: 'Please provide name'});
    }
    else{
        Farm.getFarmByFarmId(req.params.farm_id, function(err, farm_check){
            if(farm_check.length > 0){
                Farm.changeName(req.params.farm_id, req.body.name, function(err, farm){
                    if(err) res.send(err);
                    res.status(200).send({message: 'Farm successfully change name'});
                });
            }
            else{
                res.status(400).send({message: 'no Farm in database'});
            }
        });
    }
};
exports.delete_a_farm = function(req, res){
    Farm.getFarmByFarmId(req.params.farm_id, function(err, farm_check){
        if(farm_check.length > 0){
            Farm.remove(req.params.farm_id, function(err, farm){
                if(err) res.send(err);
                res.status(200).send({message: 'Farm successfully delete'});
            });
        }
        else{
            res.status(400).send({message: 'no Farm in database'});
        }
    });
};
