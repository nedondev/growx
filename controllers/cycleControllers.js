'user strict';
var Farm = require('../model/farmModel.js');
var Work_on = require('../model/work_onModel.js');
var User = require('../model/userModel.js');
var Cycle = require('../model/cycleModel.js')

exports.list_or_create_by_cycle = function(req, res){
    if(req.body.option === 'list'){
        if(!req.body.farm_id) {
            res.status(400).send({err:true, message: 'Please provide farm id'});
        }
        else{
            var cycle ={
                type : req.body.type,
                farm_id : req.body.farm_id 
            }
            Cycle.getCycleByFarmId(cycle, function(err, cycle){
                console.log('cycle listing');
                if(err) res.send(err);
                console.log('res', cycle);
                res.status(200).send({result:cycle})
            });
        }
    }
    else if(req.body.option === 'create'){
        console.log("create");
        var new_cycle = new Cycle(req.body);
        console.log(new_cycle);
        if(!new_cycle.farm_id) {
            res.status(400).send({err:true, message: 'Please provide farm id'});
        }
        else if(!new_cycle.type) {
            res.status(400).send({err:true, message: 'Please provide type'});
        }
        else if(!new_cycle.value) {
            res.status(400).send({err:true, message: 'Please provide value'});
        }
        else if(!new_cycle.from_time) {
            res.status(400).send({err:true, message: 'Please provide from_time'});
        }
        else if(!new_cycle.to_time) {
            res.status(400).send({err:true, message: 'Please provide to_time'});
        }
        else{
            Farm.getFarmByFarmId(req.body.farm_id, function(err, farm){
                if(err) res.send(err);
                if(farm.length > 0){
                    Cycle.preCreateCycle(new_cycle, function(err, temp_cycle){
                        if(err) res.send(err);
                        console.log(temp_cycle[0][0]);
                        var i;
                        for(i=0; i<temp_cycle[0].length; i++){
                            var time = {
                                to_time : new_cycle.to_time
                            }
                            Cycle.update(time, temp_cycle[0][i], function(err, updated_cycle){
                                if(err) res.send(err);
                                console.log(`cycle Updated : ${i}`);
                            });
                        }
                        for(i=0; i<temp_cycle[1].length; i++){
                            //delete
                            Cycle.remove(temp_cycle[1][i], function(err, cycle){
                                if(err) res.send(err);
                                console.log(`cycle Deleted : ${i}`);
                            });
                        }
                        for(i=0; i<temp_cycle[2].length; i++){
                            var time = {
                                from_time : new_cycle.from_time
                            }
                            Cycle.update(time, temp_cycle[2][i], function(err, updated_cycle){
                                if(err) res.send(err);
                                console.log(`cycle Updated : ${i}`);
                            });
                        }
                        Cycle.createCycle(new_cycle, function(err, cycle){
                            if(err) res.send(err);
                            res.status(200).send({message: 'Cycle successfully insert'});
                        });
                    });
                }
                else{
                    res.status(400).send({err:true, message: 'no Farm in database'});
                }
            });
        }
    }
    else if(req.body.option === 'getone'){
        if(!req.body.from_time) {
            res.status(400).send({err:true, message: 'Please provide from_time'});
        }
        else if(!req.body.type) {
            res.status(400).send({err:true, message: 'Please provide type'});
        }
        else if(!req.body.farm_id) {
            res.status(400).send({err:true, message: 'Please provide farm_id'});
        }
        else {
            var cycle ={
                from_time : req.body.from_time,
                type : req.body.type,
                farm_id : req.body.farm_id 
            }
            Cycle.getCycleByCycleId(cycle, function(err, cycle){
                if(err) res.send(err);
                res.status(200).send({result:cycle})
            });
        }
    }
};

exports.get_a_cycle = function(req, res){
    if(!req.body.from_time) {
        res.status(400).send({err:true, message: 'Please provide from_time'});
    }
    else if(!req.body.type) {
        res.status(400).send({err:true, message: 'Please provide type'});
    }
    else if(!req.body.farm_id) {
        res.status(400).send({err:true, message: 'Please provide farm_id'});
    }
    else {
        var cycle ={
           from_time : req.body.from_time,
           type : req.body.type,
           farm_id : req.body.farm_id 
            }
        Cycle.getCycleByCycleId(cycle, function(err, cycle){
            if(err) res.send(err);

            res.status(200).send({result:cycle})
        });
    }
};

exports.updateValue = function(req, res){
    var new_cycle = new Cycle(req.body);
    if(!new_cycle.farm_id) {
        res.status(400).send({err:true, message: 'Please provide farm id'});
    }
    else if(!new_cycle.type) {
        res.status(400).send({err:true, message: 'Please provide type'});
    }
    else if(!new_cycle.value) {
        res.status(400).send({err:true, message: 'Please provide value'});
    }
    else if(!new_cycle.from_time) {
        res.status(400).send({err:true, message: 'Please provide from_time'});
    }
    else{
        Cycle.getCycleByCycleId(new_cycle, function(err, cycle_check){
            if(cycle_check.length > 0){
                Cycle.changeValue(new_cycle, function(err, cycle){
                    if(err) res.send(err);
                    res.status(200).send({message: 'Cycle successfully change value'});
                });
            }
            else{
                res.status(400).send({message: 'no Cycle in database'});
            }
        });
    }
};

exports.delete_a_cycle = function(req, res){
    if(!req.body.from_time) {
        res.status(400).send({err:true, message: 'Please provide from_time'});
    }
    else if(!req.body.type) {
        res.status(400).send({err:true, message: 'Please provide type'});
    }
    else if(!req.body.farm_id) {
        res.status(400).send({err:true, message: 'Please provide farm_id'});
    }
    else{
        var cycle ={
           from_time : req.body.from_time,
           type : req.body.type,
           farm_id : req.body.farm_id 
        }
        Cycle.getCycleByCycleId(cycle, function(err, cycle_check){
            if(err) res.send(err);
            if(cycle_check.length > 0){
                Cycle.remove(cycle, function(err, cycle){
                    if(err) res.send(err);
                    res.status(200).send({message: 'Cycle successfully delete'});
                });
            }
            else{
                res.status(400).send({message: 'no Cycle in database'});
            }
        });
    }
};
