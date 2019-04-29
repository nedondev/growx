'user strict';
var Work_on = require('../model/work_onModel.js');

exports.list_all_Work_on = function(req, res){
        Work_on.getAllWork_on(function(err, work_on){
            
            console.log('work_on');
            if(err) res.send(err);
            console.log('res', work_on);
            res.status(200).send({result: work_on});
        });
    };

exports.create_a_work_on = function(req, res){
    var new_work_on = new Work_on(req.body);
    console.log(new_work_on);
    if(!new_work_on.usr_id) {
        res.status(400).send({err:true, message: 'Please provide username'});
    }
    else if(!new_work_on.farm_id) {
        res.status(400).send({err:true, message: 'Please provide farm_id'});
    }
    else if(!new_work_on.permission) {
        res.status(400).send({err:true, message: 'Please provide permission'});
    }
    else{
        Work_on.getWork_onByUsernameAndFarm_id(new_work_on.usr_id, new_work_on.farm_id, function(err, work_on_check){
            if(work_on_check.length > 0){
                Work_on.changePermission(new_work_on.usr_id, new_work_on.farm_id, new_work_on.permission, function(err, work_on){
                if(err) res.send(err);
                res.status(200).send({message: 'Permission successfully update'});
        });
            }
            else{
                console.log(new_work_on)
                Work_on.createWork_on(new_work_on, function(err, work_on){
                    if(err) res.send(err);
                    res.status(200).send({message: 'Permission successfully create'});
                });
            }
        })
    }
};

exports.get_a_work_on = function(req, res){
    Work_on.getWork_onByUsername(req.params.username, function(err, work_on){
        if(err) res.send(err);
        res.json(work_on);
    });
};

exports.change_a_permission = function(req, res){
    if(!req.body.farm_id) {
        res.status(400).send({err:true, message: 'Please provide farm_id'});
    }
    else if(!req.body.permission) {
        res.status(400).send({err:true, message: 'Please provide permission'});
    }
    else{
        Work_on.getWork_onByUsernameAndFarm_id(req.params.username, req.body.farm_id,function(err, work_on_check){
            if(work_on_check.length > 0){
                Work_on.changePermission(req.params.username, req.body.farm_id, req.body.permission, function(err, work_on){
                    if(err) res.send(err);
                    res.status(200).send({message: 'Permission successfully update'});
                });
            }
            else{
                res.status(400).send({message: 'No user with farm on databae'});
            }
        })
    }
};
