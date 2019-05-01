'user strict';
var sql = require('../db.js');

var Camera = function(camera){
    this.shelf = camera.shelf;
    this.section = camera.section;
    this.floor = camera.floor;
    this.farm_id = camera.farm_id;
    this.setup_date = new Date();
};

Camera.createCamera = function(newCamera, result){
    sql.query("INSERT INTO camera set ?", newCamera, function(err, res){
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

Camera.getCameraByFarmId = function(farm_id, result){
    sql.query("SELECT * FROM camera WHERE farm_id = ?", farm_id, function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    
    });
};
Camera.getCameraByCameraId = function(camera_id, result){
    sql.query("SELECT * FROM camera WHERE cam_id = ?", camera_id, function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    
    });
};
Camera.getAllCamera = function(result){
    sql.query("SELECT * FROM camera", function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            console.log('Camera: ',res);
            result(null, res);
        }
    });
};
Camera.changePlace = function(camera_id, place, result){
    sql.query("UPDATE camera SET floor = ?, section = ?, shelf = ? WHERE cam_id = ? ",[place.floor, place.section, place.shelf, camera_id], function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
Camera.remove = function(camera_id, result){
    sql.query("DELETE FROM camera WHERE cam_id = ? ", camera_id, function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

module.exports = Camera;
