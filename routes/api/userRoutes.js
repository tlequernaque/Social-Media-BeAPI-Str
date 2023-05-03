const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    createUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController')

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(getSingleUser).post(updateSingleUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;