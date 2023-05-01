const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController')

router.route('/').get(getThoughts).post(createThought)
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought)



module.exports = router;