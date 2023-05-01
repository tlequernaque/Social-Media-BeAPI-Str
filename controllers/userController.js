const { User } = require('../models');

module.exports = {
    getUsers(req, res){
        User.find()
            .then((users) =>res.json(users))
            .catch((err) => res.status(500).json(err)); 
    },

    getSingleUser(req, res){
        User.findOne({ _id: req.params.userId})
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json({
                        //need work, not finished
                        user,
                        thought  
                    })
            )
            .catch((err) => res.status(500).json(err));
    },

    createUser(req,res){
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    deleteUser(req,res){
        User.findOneAndRemove({_id: req.params.userId})
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user withthat ID'})
                    //need work, not right
                    : res.json({message: 'User successfully deleted'})
            )
            .then(() => res.json({ message: 'User successfully deleted' }))
            .catch((err) => res.status(500).json(err));
    }
};