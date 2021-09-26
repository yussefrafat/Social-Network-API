const router = require('express').Router();

// Set requirements (from users-controller)
const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
} = require('../../controllers/users-controller');

router.route('/').get(getAllUsers).post(createUsers);

module.exports = router;