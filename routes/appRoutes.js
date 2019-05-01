'user strict';
module.exports = function(app){
    var user = require('../controllers/userControllers');
    var work_on = require('../controllers/work_onControllers');
    var farm = require('../controllers/farmControllers');
    var sensor = require('../controllers/sensorControllers');
    var sensor_log = require('../controllers/sensor_logControllers');
    var camera = require('../controllers/cameraControllers');
    var camera_log = require('../controllers/camera_logControllers');
    var cycle = require('../controllers/cycleControllers');

    var login = require('../controllers/loginControllers');
    
    app.get('/', (req,res) => res.status(200).send({mesage:'GrowX API'}));
    app.route('/users')
        .get(user.list_all_user)
        .post(user.create_a_user);
    app.route('/users/:username')
        .get(user.get_a_user)
        .put(user.change_a_password)
        .delete(user.delete_a_user);
    app.route('/farms')
        .post(farm.list_or_create_by_usr)
    app.route('/farms/:farm_id')
        .get(farm.get_a_farm)
        .put(farm.change_a_name)
        .delete(farm.delete_a_farm);
    app.route('/work_on')
        .get(work_on.list_all_Work_on)
        .post(work_on.create_a_work_on)
    app.route('/work_on/:username')
        .get(work_on.get_a_work_on)
        .put(work_on.change_a_permission)
    app.route("/sensors")
        .post(sensor.list_or_create_by_sensor)
    app.route("/sensors/:sensor_id")
        .get(sensor.get_a_sensor)
        .delete(sensor.delete_a_sensor)
    app.route("/sensor_logs")
        .post(sensor_log.list_or_create_by_sensor_log)
    app.route("/sensor_logs/:sensor_log_id")
        .get(sensor_log.get_a_sensor_log)
        .delete(sensor_log.delete_a_sensor_log)
    app.route("/cameras")
        .post(camera.list_or_create_by_camera)
    app.route("/cameras/:camera_id")
        .get(camera.get_a_camera)
        .delete(camera.delete_a_camera)
    app.route("/camera_logs")
        .post(camera_log.list_or_create_by_camera_log)
    app.route("/camera_logs/:camera_log_id")
        .get(camera_log.get_a_camera_log)
        .delete(camera_log.delete_a_camera_log)
    app.route("/cycle_configs")
        .post(cycle.list_or_create_by_cycle)
        .put(cycle.updateValue)
        .delete(cycle.delete_a_cycle)
    app.route("/login")
        .post(login.login)
};
