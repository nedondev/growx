'user strict';
module.exports = function(app){
    var user = require('../controllers/userControllers');

    app.route('/users')
        .get(user.list_all_user)
        .post(user.create_a_user);
    app.route('/users/:username')
        .get(user.get_a_user)
        .put(user.change_a_password)
        .delete(user.delete_a_user);
};
