'user strict';
var sql = require('../db.js');

var Sensor_log = function(sensor_log){
    this.value = sensor_log.value;
    if(sensor_log.time)this.time = sensor_log.time;
    this.sen_id = sensor_log.sen_id;
};

Sensor_log.createSensor_log = function(newSensor_log, result){
    sql.query("INSERT INTO sensor_log set ?", newSensor_log, function(err, res){
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

Sensor_log.getSensor_logBySenId = function(sen_id, result){
    sql.query("SELECT * FROM sensor_log WHERE sen_id = ?", sen_id, function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    
    });
};
Sensor_log.getSensor_logBySensor_logId = function(sensor_log_id, result){
    sql.query("SELECT * FROM sensor_log WHERE log_id = ?", sensor_log_id, function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    
    });
};

Sensor_log.getAllSensor_log = function(result){
    sql.query("SELECT * FROM sensor_log", function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            console.log('Sensor_log: ',res);
            result(null, res);
        }
    });
};

Sensor_log.remove = function(sensor_log_id, result){
    sql.query("DELETE FROM sensor_log WHERE log_id = ? ", sensor_log_id, function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

module.exports = Sensor_log;
