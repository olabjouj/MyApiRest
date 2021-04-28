var express = require('express');
var usersController = require('./routes/usersCtroller');



// Router 

exports.router= ( ()=>{
    var apiRouter = express.Router();

    //Users routes
    apiRouter.route('/users/register').post(usersController.register)
    apiRouter.route('/users/:userId').put(usersController.updateUserProfile)
    apiRouter.route('/users/:userId').delete(usersController.deleteUserProfile)
    apiRouter.route('/users/:userId').get(usersController.showUser)
    apiRouter.route('/users').get(usersController.showAllUsers)



return apiRouter;
})();