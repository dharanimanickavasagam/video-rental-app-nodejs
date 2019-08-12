var express = require("express");
var Joi = require("joi");

const router = express.Router();
router.use(express.json());

//mock data
const genres = [
  { id: 1, type: "comedy" },
  { id: 2, type: "horror" },
  { id: 3, type: "action" }
];

//Listing all genres - GET
router.get("", (req, res) => {
  res.send(genres);
});

//Finding a particula genre with id - GET
router.get("/:id", (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  console.log(genre);
  if (!genre) {
    return res.status(404).send(`Genre of ID ${req.params.id} not found`);
  }
  res.send(genre);
});

//Creating a new genre - POST
router.post("/", (req, res) => {
  const result = validateJoi(req.body);

  //return error if it fails the Joi ruleset
  if (result.error) {
    return res.send(result.error.name);
  }

  //else return genres
  const genre = {
    id: genres.length + 1,
    type: req.body.type
  };

  genres.push(genre);
  res.send(genres);
});

//updating a genre with id - PUT
router.put("/:id", (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));

  if (!genre) {
    return res.status(404).send(`Genre of ID ${req.params.id} not found`);
  }
  const result = validateJoi(req.body);

  //return error if it fails the Joi ruleset
  if (result.error) {
    return res.send(result.error.name);
  }

  genre.type = req.body.type;
  res.send(genres);
});

//deleting a genre with id - DELETE
router.delete("/:id", (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));

  if (!genre) {
    return res.status(404).send(`Genre of ID ${req.params.id} not found`);
  }

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genres);
});

// a utility function that runs the ruleset against req.body
const validateJoi = genre => {
  //ruleset for JOI
  const schema = {
    type: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(genre, schema);
};

module.exports = router;
