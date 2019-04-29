'user strict';
module.exports = function(app){
    var user = require('../controllers/userControllers');
    var work_on = require('../controllers/work_onControllers');
    var farm = require('../controllers/farmControllers');
    
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
};
