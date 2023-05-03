const { User } = require('../models');

module.exports = {
    getAllUsers(req, res){
        User.find()
            .then((users) =>res.json(users))
            .catch((err) => res.status(500).json(err)); 
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select("-__v")
            .populate("friends")
            .populate("thoughts")
            .then((dbUserData) => {
                if (!dbUserData) {
                return res.status(404).json({ message: "No user with this id!" });
                }
                res.json(dbUserData);
            })
            .catch((err) => res.status(500).json(err));
    },

    createUser(req,res){
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    updateSingleUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true },
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                return res.status(404).json({ message: "No user with this id!" });
                }
                res.json(dbUserData);
            })
            .catch((err) => res.status(500).json(err));
    },

    deleteUser(req,res){
        User.findOneAndDelete({_id: req.params.userId})
            .then((dbUserData) => {
                if (!dbUserData) {
                return res.status(404).json({ message: "No user with this id!" });
                }
                res.json(dbUserData);
            })
            .catch((err) => res.status(500).json(err));
    },

    addFriend(req,res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $push: {friends: req.params.friendId} },
            { runValidators: true, new: true },
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                return res.status(404).json({ message: "No user with this id!" });
                }
                res.json(dbUserData);
            })
            .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req,res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $pull: {friends: req.params.friendId} },
            { runValidators: true, new: true },
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                return res.status(404).json({ message: "No user with this id!" });
                }
                res.json(dbUserData);
            })
            .catch((err) => res.status(500).json(err));
    },
};