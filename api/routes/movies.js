const router = require('express').Router();

const Movie = require('../models/Movie');

const verify = require('../verifyToken');

// Create new movie

router.post('/', verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);

        try {
            const savedMovie = await newMovie.save();
            res.status(200).json(savedMovie);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You're not supposed to mess with this!");
    }
});

// Update movie

router.put('/:id', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, { $set: req.body, }, { new: true });

            res.status(200).json(updatedMovie)
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You're not supposed to mess with this!");
    }
});

// Delete movie

router.delete('/:id', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.id);

            res.status(200).json("Movie has been deleted...")
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You're not supposed to mess with this!");
    }
});

// Get movie
router.get('/find/:id', verify, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        res.status(200).json(movie)
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get random movie
router.get('/random', verify, async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
        if (type === "series") {
            movie = await Movie.aggregate([
                { $match: { isSeris: true } },
                { $sample: { size: 1 } }
            ]);
        } else {
            movie = await Movie.aggregate([
                { $match: { isSeris: false } },
                { $sample: { size: 1 } }
            ]);
        }
        res.status(200).json(movie)
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all  movies

router.get('/', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movies = await Movie.find()
            res.status(200).json(movies.reverse())
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You're not supposed to mess with this!");
    }
});

module.exports = router;