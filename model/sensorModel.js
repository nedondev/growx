'user strict';
var sql = require('../db.js');

var Sensor = function(sensor){
    this.type = sensor.type;
    this.shelf = sensor.shelf;
    this.section = sensor.section;
    this.floor = sensor.floor;
    this.farm_id = sensor.farm_id;
    this.setup_date = new Date();
};

Sensor.createSensor = function(newSensor, result){
    sql.query("INSERT INTO sensor set ?", newSensor, function(err, res){
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

Sensor.getSensorByFarmId = function(farm_id, result){
    sql.query("SELECT * FROM sensor WHERE farm_id = ?", farm_id, function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    
    });
};
Sensor.getSensorBySensorId = function(sensor_id, result){
    sql.query("SELECT * FROM sensor WHERE sen_id = ?", sensor_id, function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    
    });
};
Sensor.getAllSensor = function(result){
    sql.query("SELECT * FROM sensor", function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            console.log('Sensor: ',res);
            result(null, res);
        }
    });
};
Sensor.changePlace = function(sensor_id, place, result){
    sql.query("UPDATE sensor SET floor = ?, section = ?, shelf = ? WHERE sen_id = ? ",[place.floor, place.section, place.shelf, sensor_id], function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
Sensor.changeType = function(sensor_id, type, result){
    sql.query("UPDATE sensor SET type = ? WHERE sen_id = ? ",[type, sensor_id], function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
Sensor.remove = function(sensor_id, result){
    sql.query("DELETE FROM sensor WHERE sen_id = ? ", sensor_id, function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

module.exports = Sensor;
