const express = require("express");
const Game = require("../models/Game");

const router = express.Router();

// Get all games
router.get("/", async (req, res) => {
  const games = await Game.find();
  res.json(games);
});

// Get a game by ID
router.get("/:id", async (req, res) => {
  const game = await Game.findById(req.params.id);
  res.json(game);
});

// Get games by genre
router.get("/genre/:genre", async (req, res) => {
  const games = await Game.find({ genre: req.params.genre });
  res.json(games);
});

// Add a new game
router.post("/", async (req, res) => {
  const newGame = new Game(req.body);
  await newGame.save();
  res.status(201).json(newGame);
});

// Delete a game
router.delete("/:id", async (req, res) => {
  await Game.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

router.get("/search/:query", async (req, res) => {
  const searchQuery = req.params.query;

  try {
    const games = await Game.find({
      title: { $regex: searchQuery, $options: "i" }, // case-insensitive match
    });

    if (games.length === 0) {
      return res.status(404).json({ message: "No games found" });
    }

    res.status(200).json(games);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error while searching games" });
  }
});

router.get("/suggest/:query", async (req, res) => {
  const { query } = req.params;
  try {
    const regex = new RegExp(query, "i"); // case-insensitive
    const games = await Game.find({ title: { $regex: regex } }).select("title");
    const suggestions = games.map(game => game.title);
    res.json(suggestions.slice(0, 5)); // limit to top 5 suggestions
  } catch (err) {
    console.error("Suggestion Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;
