//Express
const express = require("express");
const app = express();
const PORT = 3000;

//cors
const cors = require("cors");
app.use(cors());

//Import our database and model
const { sequelize } = require("./db");
const { Dog } = require("./models/dog");

const seed = require("./seed");

//serve static assets from public folder
app.use(express.static("public")); //

//allow express to read json request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//seed our database
seed();

//*************** ROUTES ******************//

//get all dogs
app.get("/dogs", async (req, res) => {
  const dogs = await Dog.findAll();
  res.json(dogs);
});

//get all dogs in a zip code
app.get("/zipCode/:zipCode", async (req, res) => {
  const dogs = await Dog.findAll({
    where: { zipCode: req.params.zipCode},
  });
  res.json(dogs);
});

//get dog by id
app.get("/dogs/:id", async (req, res) => {
  const dog = await Dog.findByPk(req.params.id);
  res.json({ dog }); //dog json
});

//update dog by id
app.put("/dogs/:id", async (req, res) => {
  let updatedDog = await Dog.update(req.body, {
    where: { id: req.params.id },
  });
  res.send(updatedDog ? "Updated" : "Update Failed");
});

//render new-dog form
app.get("/new-dog", async (req, res) => {
  res.render("newDogForm");
});

//render edit-dog form
app.get("/edit-dog/:id", async (req, res) => {
  const dog = await Dog.findByPk(req.params.id);
  res.render("editDogForm", { dog });
});

//Post Route triggered by form submit action
app.post("/new-dog", async (req, res) => {
  //Add dog to db based on html form data
  const newDog = await Dog.create(req.body);
  //Find newDog in db by id
  const foundDog = await Dog.findByPk(newDog.id);
  if (foundDog) {
    res.send("succeess");
  } else {
    res.send("failed");
  }
});

//DELETE method, dogs/:id path => Deletes a dog from db.sqlite
app.delete("/dogs/:id", async (req, res) => {
  const deletedDog = await Dog.destroy({
    where: { id: req.params.id },
  });
  res.send(deletedDog ? "Deleted" : "Deletion Failed");
});

//serving is now listening to PORT
app.listen(PORT, () => {
  console.log(`Your server is now listening to port ${PORT}`);
});
