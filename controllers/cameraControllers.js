'user strict';
var Farm = require('../model/farmModel.js');
var Work_on = require('../model/work_onModel.js');
var User = require('../model/userModel.js');
var Camera = require('../model/cameraModel.js');

exports.list_or_create_by_camera = function(req, res){
    if(req.body.option === 'list'){
        if(!req.body.farm_id) {
            res.status(400).send({err:true, message: 'Please provide farm id'});
        }
        else{
            Camera.getCameraByFarmId(req.body.farm_id, function(err, camera){
                console.log('camera listing');
                if(err) res.send(err);
                console.log('res', camera);
                res.status(200).send({result:camera})
            });
        }
    }
    else if(req.body.option === 'create'){
        console.log("create");
        var new_camera = new Camera(req.body);
        console.log(new_camera);
        if(!new_camera.farm_id) {
            res.status(400).send({err:true, message: 'Please provide farm id'});
        }
        else if(!new_camera.shelf) {
            res.status(400).send({err:true, message: 'Please provide shelf'});
        }
        else if(!new_camera.section) {
            res.status(400).send({err:true, message: 'Please provide section'});
        }
        else if(!new_camera.floor) {
            res.status(400).send({err:true, message: 'Please provide floor'});
        }
        else{
            Farm.getFarmByFarmId(req.body.farm_id, function(err, farm){
                if(err) res.send(err);
                if(farm.length > 0){
                        Camera.createCamera(new_camera, function(err, camera){
                            if(err) res.send(err);
                            res.status(200).send({message: 'Camera successfully insert'});
                        });
                }
                else{
                    res.status(400).send({err:true, message: 'no Farm in database'});
                }
            });
        }
    }
};

exports.get_a_camera = function(req, res){
        Camera.getCameraByCameraId(req.params.camera_id, function(err, camera){
            if(err) res.send(err);

            res.status(200).send({result:camera})
        });
    };

exports.delete_a_camera = function(req, res){
    Camera.getCameraByCameraId(req.params.camera_id, function(err, camera_check){
        if(camera_check.length > 0){
            Camera.remove(req.params.camera_id, function(err, camera){
                if(err) res.send(err);
                res.status(200).send({message: 'Camera successfully delete'});
            });
        }
        else{
            res.status(400).send({message: 'no Camera in database'});
        }
    });
};
