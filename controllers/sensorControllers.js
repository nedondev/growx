'user strict';
var Sensor = require('../model/sensorModel.js');
var Farm = require('../model/farmModel.js');
var Work_on = require('../model/work_onModel.js');
var User = require('../model/userModel.js');

exports.list_or_create_by_sensor = function(req, res){
    if(req.body.option === 'list'){
        if(!req.body.farm_id) {
            res.status(400).send({err:true, message: 'Please provide farm id'});
        }
        else{
            Sensor.getSensorByFarmId(req.body.farm_id, function(err, sensor){
                console.log('sensor listing');
                if(err) res.send(err);
                console.log('res', sensor);
                res.status(200).send({result:sensor})
            });
        }
    }
    else if(req.body.option === 'create'){
        console.log("create");
        var new_sensor = new Sensor(req.body);
        console.log(new_sensor);
        if(!new_sensor.farm_id) {
            res.status(400).send({err:true, message: 'Please provide farm id'});
        }
        else if(!new_sensor.type) {
            res.status(400).send({err:true, message: 'Please provide type'});
        }
        else if(!new_sensor.shelf) {
            res.status(400).send({err:true, message: 'Please provide shelf'});
        }
        else if(!new_sensor.section) {
            res.status(400).send({err:true, message: 'Please provide section'});
        }
        else if(!new_sensor.floor) {
            res.status(400).send({err:true, message: 'Please provide floor'});
        }
        else{
            Farm.getFarmByFarmId(req.body.farm_id, function(err, farm){
                if(err) res.send(err);
                if(farm.length > 0){
                        Sensor.createSensor(new_sensor, function(err, sensor){
                            if(err) res.send(err);
                            res.status(200).send({message: 'Sensor successfully insert'});
                        });
                }
                else{
                    res.status(400).send({err:true, message: 'no Farm in database'});
                }
            });
        }
    }
};

exports.get_a_sensor = function(req, res){
        Sensor.getSensorBySensorId(req.params.sensor_id, function(err, sensor){
            if(err) res.send(err);

            res.status(200).send({result:sensor})
        });
    };
/*
exports.update = function(req, res){
    if(!req.body.type) {
        res.status(400).send({err:true, message: 'Please provide type'});
    }
    else{
        Sensor.getSensorBySensorId(req.params.sensor_id, function(err, sensor_check){
            if(sensor_check.length > 0){
                Sensor.changeName(req.params.sensor_id, req.body.name, function(err, sensor){
                    if(err) res.send(err);
                    res.status(200).send({message: 'Sensor successfully change type'});
                });
            }
            else{
                res.status(400).send({message: 'no Sensor in database'});
            }
        });
    }
};*/

exports.delete_a_sensor = function(req, res){
    Sensor.getSensorBySensorId(req.params.sensor_id, function(err, sensor_check){
        if(sensor_check.length > 0){
            Sensor.remove(req.params.sensor_id, function(err, sensor){
                if(err) res.send(err);
                res.status(200).send({message: 'Sensor successfully delete'});
            });
        }
        else{
            res.status(400).send({message: 'no Sensor in database'});
        }
    });
};
