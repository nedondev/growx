'user strict';
var Sensor = require('../model/sensorModel.js');
var Farm = require('../model/farmModel.js');
var Work_on = require('../model/work_onModel.js');
var User = require('../model/userModel.js');
var Sensor_log = require('../model/sensor_logModel.js');

exports.list_or_create_by_sensor_log = function(req, res){
    if(req.body.option === 'list'){
        if(!req.body.sen_id) {
            res.status(400).send({err:true, message: 'Please provide sen id'});
        }
        else{
            Sensor_log.getSensor_logBySenId(req.body.sen_id, function(err, sensor_log){
                console.log('sensor_log listing');
                if(err) res.send(err);
                console.log('res', sensor_log);
                res.status(200).send({result:sensor_log})
            });
        }
    }
    else if(req.body.option === 'create'){
        console.log("create");
        var new_sensor_log = new Sensor_log(req.body);
        console.log(new_sensor_log);
        if(!new_sensor_log.sen_id) {
            res.status(400).send({err:true, message: 'Please provide sen id'});
        }
        else if(!new_sensor_log.value) {
            res.status(400).send({err:true, message: 'Please provide value'});
        }
        else{
            Sensor.getSensorBySensorId(req.body.sen_id, function(err, sensor){
                if(err) res.send(err);
                if(sensor.length > 0){
                        Sensor_log.createSensor_log(new_sensor_log, function(err, sensor_log){
                            if(err) res.send(err);
                            res.status(200).send({message: 'Sensor_log successfully insert'});
                        });
                }
                else{
                    res.status(400).send({err:true, message: 'no Sensor in database'});
                }
            });
        }
    }
};

exports.get_a_sensor_log = function(req, res){
        Sensor_log.getSensor_logBySensor_logId(req.params.sensor_log_id, function(err, sensor_log){
            if(err) res.send(err);

            res.status(200).send({result:sensor_log})
        });
    };

exports.delete_a_sensor_log = function(req, res){
    Sensor_log.getSensor_logBySensor_logId(req.params.sensor_log_id, function(err, sensor_log_check){
        if(sensor_log_check.length > 0){
            Sensor_log.remove(req.params.sensor_log_id, function(err, sensor_log){
                if(err) res.send(err);
                res.status(200).send({message: 'Sensor_log successfully delete'});
            });
        }
        else{
            res.status(400).send({message: 'no Sensor_log in database'});
        }
    });
};
