var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var models = require('../models');



//Routes
module.exports = {
    register: (req, res) => {
        var lastName = req.body.lastName;
        var firstName = req.body.firstName;
        var email = req.body.email;
        var password = req.body.password;
        var role = req.body.role;
        if (lastName == null || firstName == null || email == null || password == null || role == null || (role != 'admin' && role != 'normal')) {
            return res.status(400).json({ 'message': 'An error occurred' })
        }
        // TODO verifiy 
        models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        }).then(function (userFound) {
                if (!userFound) {
                    bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                        var newUser = models.User.create({
                            lastName: lastName,
                            email: email,
                            firstName: firstName,
                            password: bcryptedPassword,
                            role: role
                        }).then(function (newUser) {
                                return res.status(201).json({
                                    'userId': newUser.id,
                                    'message': 'User successfully created'
                                })
                            }).catch(function (err) {
                                return res.status(500).json({ 'error': 'cannot add user' });
                            });
                    });
                } else {
                    return res.status(400).json({ 'error': 'User already exist' })
                }

            }).catch(function (err) {
                return res.status(500).json({ 'error': 'unable to verify user' })
            });
    },

    updateUserProfile: (req, res) => {
        // params
        var userId = req.params.userId;
        var lastName = req.body.lastName;
        var firstName = req.body.firstName;
        var role = req.body.role;
        var email = req.body.email;
        models.User.findOne({
            attributes: ['id', 'lastName', 'firstName', 'email', 'role'],
            where: { id: userId }
        }).then(function (userFound) {
            if (userFound) {
                userFound.update({
                    lastName: (lastName ? lastName : userFound.lastName),
                    firstName: (firstName ? firstName : userFound.firstName),
                    role: (role ? role : userFound.role),
                    email: (email ? email : userFound.email)
                }).then(function (resultat) {
                    console.log(resultat);
                    return res.status(200).json({ 'message': 'User successfully modified' });
                }).catch(function (err) {
                    console.error(err)
                    return res.status(500).json({ 'error': 'An error occurred' });
                });
            } else {
                return res.status(404).json({ 'error': 'user not found' });
            }

        }).catch(function (err) {
                console.error(err);
                return res.status(500).json({ 'error': 'An error occurred' });
            });
        // console.log('verifier user',req.params.userId, req.body.lastName ,req.body.firstName,req.body.role,req.body.email)

        // return res.status(200).json({'message': 'user with id '+req.params.userId})
    },
    deleteUserProfile: (req, res) => {
        var userId = req.params.userId;
        models.User.findOne({
            attributes: ['id', 'lastName', 'firstName', 'email', 'role'],
            where: { id: userId }
        }).then(function (userFound) {
            if (userFound) {
                userFound.destroy(

                ).then(function (resultat) {
                    console.log(resultat);
                    return res.status(200).json({ 'message': 'User successfully deleted' });
                }).catch(function (err) {
                    console.error(err)
                    return res.status(500).json({ 'error': 'An error occurred' });
                });
            } else {
                return res.status(404).json({ 'error': 'User  was not found' })
            }
        }).catch(function (err) {
            console.error(err);
            return res.status(500).json({ 'error': 'An error occurred' })
        })
    },
    showUser: (req, res) => {
        var userId = req.params.userId;
        models.User.findOne({
            attributes: ['id', 'lastName', 'firstName', 'email', 'role', 'password'],
            where: { id: userId }
        }).then(function (userFound) {
            if (userFound) {
                return res.status(200).json(userFound);
            } else {
                return res.status(404).json({ 'error': 'User was not found' })
            }
        }).catch(function (err) {
            console.error(err);
            return res.status(400).json({ 'error': 'An error occurred' })
        })
    },
    showAllUsers: (req, res) => {
        models.User.findAll().then(function (users) {
            console.log(users)
            if (users) {
                return res.status(200).json(users);
            } 
        }).catch(function (err) {
            console.error(err);
            return res.status(400).json({ 'error': 'An error occurred' })
        })
    }
}