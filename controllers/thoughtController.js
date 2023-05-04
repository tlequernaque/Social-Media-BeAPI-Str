const { Thought } = require('../models')

module.exports = {
    getAllThoughts(req, res){
        Thought.find()
            .then((thoughts) =>res.json(thoughts))
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            }); 
    },

    getSingleThought(req, res){
        Thought.findOne({ _id: req.params.thoughtId })
            .select("-__v")
            .populate("reaction")
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                return res.status(404).json({ message: "No thought with this id!" });
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.status(500).json(err));
    },

    createThought(req,res){
        Thought.create(
            {_id: params.ThoughtId},
            { $push: {thoughts: _id} },
            { new: true },
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
            return res.status(404).json({ message: "No thought with this id!" });
            }
            res.json(dbThoughtData);
        })
            .catch((err) => res.status(500).json(err));
    },

    updateThought(){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },//maybe?
            { runValidators: true, new: true }
            )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                return res.status(404).json({ message: "No thought with this id!" });
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.status(500).json(err));
    },

    deleteThought(req,res){
        Thought.findOneAndDelete({_id: req.params.thoughtId})
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                return res.status(404).json({ message: "No thought with this id!" });
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.status(500).json(err));
    },

    createReaction(req,res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $push: {reactions: req.body} }, //maybe?
            { runValidators: true, new: true },
            )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                return res.status(404).json({ message: "No thought with this id!" });
                }
                res.json(dbThoughtData);
            })
        .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req,res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $pull: {reactions: {reactionId: req.params.reactionId}} },
            { runValidators: true, new: true },
            
            )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                return res.status(404).json({ message: "No thought with this id!" });
                }
                res.json(dbThoughtData);
            })
        .catch((err) => res.status(500).json(err));
    }


};