'user strict';
var sql = require('../db.js');

var Camera_log = function(camera_log){
    this.data = camera_log.data;
    if(camera_log.time)this.time = camera_log.time;
    this.cam_id = camera_log.cam_id;
};

Camera_log.createCamera_log = function(newCamera_log, result){
    sql.query("INSERT INTO camera_log set ?", newCamera_log, function(err, res){
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

Camera_log.getCamera_logByCamId = function(cam_id, result){
    sql.query("SELECT * FROM camera_log WHERE cam_id = ?", cam_id, function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    
    });
};
Camera_log.getCamera_logByCamera_logId = function(camera_log_id, result){
    sql.query("SELECT * FROM camera_log WHERE log_id = ?", camera_log_id, function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    
    });
};

Camera_log.getAllCamera_log = function(result){
    sql.query("SELECT * FROM camera_log", function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            console.log('Camera_log: ',res);
            result(null, res);
        }
    });
};

Camera_log.remove = function(camera_log_id, result){
    sql.query("DELETE FROM camera_log WHERE log_id = ? ", camera_log_id, function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

module.exports = Camera_log;
