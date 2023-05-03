const { Thought } = require('../models')

module.exports = {
    getAllThoughts(req, res){
        Thought.find()
            .then((thoughts) =>res.json(thoughts))
            .catch((err) => res.status(500).json(err)); 
    },

    getSingleThought(req, res){
        Thought.findOne({ _id: req.params.userId })
            .select("-__v")
            .populate("reaction")
            .then((dbUserData) => {
                if (!dbUserData) {
                return res.status(404).json({ message: "No user with this id!" });
                }
                res.json(dbUserData);
            })
            .catch((err) => res.status(500).json(err));
    },

    createThought(req,res){
        Thought.create(req.body)
        //not completed
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    updateThought(){
        Thought.findOneAndUpdate({ _id: req.params.userId })
            //not completed
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    deleteThought(req,res){
        Thought.findOneAndDelete({_id: req.params.userId})
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID'})
                    //need work, not right
                    : res.json({message: 'User successfully deleted'})
            )
            .then(() => res.json({ message: 'Thought successfully deleted' }))
            .catch((err) => res.status(500).json(err));
    },

    createReaction(req,res){
        Thought.findOneAndUpdate({_id: req.params.userId})
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID'})
                    //need work, not right
                    : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req,res){
        Thought.findOneAndUpdate({_id: req.params.userId})
        //need work, not completed
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: ''})
                    : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    }


};