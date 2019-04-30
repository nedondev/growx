'user strict';
var Farm = require('../model/farmModel.js');
var Work_on = require('../model/work_onModel.js');
var User = require('../model/userModel.js');
var Camera = require('../model/cameraModel.js');
var Camera_log = require('../model/camera_logModel.js');

exports.list_or_create_by_camera_log = function(req, res){
    if(req.body.option === 'list'){
        if(!req.body.cam_id) {
            res.status(400).send({err:true, message: 'Please provide cam id'});
        }
        else{
            Camera_log.getCamera_logByCamId(req.body.cam_id, function(err, camera_log){
                console.log('camera_log listing');
                if(err) res.send(err);
                console.log('res', camera_log);
                res.status(200).send({result:camera_log})
            });
        }
    }
    else if(req.body.option === 'create'){
        console.log("create");
        var new_camera_log = new Camera_log(req.body);
        console.log(new_camera_log);
        if(!new_camera_log.cam_id) {
            res.status(400).send({err:true, message: 'Please provide cam id'});
        }
        else if(!new_camera_log.data) {
            res.status(400).send({err:true, message: 'Please provide data'});
        }
        else{
            Camera.getCameraByCameraId(req.body.cam_id, function(err, camera){
                if(err) res.send(err);
                if(camera.length > 0){
                        Camera_log.createCamera_log(new_camera_log, function(err, camera_log){
                            if(err) res.send(err);
                            res.status(200).send({message: 'Camera_log successfully insert'});
                        });
                }
                else{
                    res.status(400).send({err:true, message: 'no Camera in database'});
                }
            });
        }
    }
};

exports.get_a_camera_log = function(req, res){
        Camera_log.getCamera_logByCamera_logId(req.params.camera_log_id, function(err, camera_log){
            if(err) res.send(err);

            res.status(200).send({result:camera_log})
        });
    };

exports.delete_a_camera_log = function(req, res){
    Camera_log.getCamera_logByCamera_logId(req.params.camera_log_id, function(err, camera_log_check){
        if(camera_log_check.length > 0){
            Camera_log.remove(req.params.camera_log_id, function(err, camera_log){
                if(err) res.send(err);
                res.status(200).send({message: 'Camera_log successfully delete'});
            });
        }
        else{
            res.status(400).send({message: 'no Camera_log in database'});
        }
    });
};
