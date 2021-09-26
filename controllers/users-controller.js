const { Users } = require('../models');
const { db } = require('../models/Users');

const usersController = {
    // Create a new user 
    crateUsers({body}, res) {
        Users.create(body)
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => res.status(400).json(err))
    },
    
    // Get ALL USERS
    getAllUsers(req, res) {
        Users.find({})
        // populate users thoughts
        .populate({path: 'thoughts', select: '-__v'})
        // populate user friends
        .populate({path: 'friend', select: '-__v'})
        .select('-__v')
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Get single user by ID
    getUsersById({params}, res) {
        Users.findOne({_id: params.id })
        .populate({path: 'thoughts', select: '-__v'})
        .select('-__v')
        // return if no user is found
        .then(dbUsersData =>{
            if(!dbUsersData) {
                res.status(404),json({message: 'No User with this ID'});
                return;
            }
            res.json(dbUsersData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    // Update User by ID 
    updateUsers({params, body}, res) {
        Users.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: " No User with this ID"});
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.json(err))
    },

    deleteUsers({params}, res) {
        Users.findOneAndDelete({id: params_id})
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'No User with this ID'});
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.status(400).json(err));
    },
}

module.exports = usersController;