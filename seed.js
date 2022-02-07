const path = require("path");
const fs = require("fs").promises;

const { sequelize } = require("./db");
const { Dog } = require("./models/dog");

const seed = async () => {
  await sequelize.sync({ force: true }); // clear out database + tables

  const seedPath = path.join(__dirname, "dogs.json"); //get the path to sauce.json file
  const buffer = await fs.readFile(seedPath); //buffer b/c fs doesn't know what data it's reading
  const { data } = JSON.parse(String(buffer)); // First we convert the data from buffer into a string, then we parse the JSON so it converts from string -> object

  const dogPromises = data.map((dog) => Dog.create(dog)); //creates sauce and puts it into our Sauce table
  await Promise.all(dogPromises); // The Promise.all() method takes an iterable of promises as an input, and returns a single Promise that resolves to an array of the results of the input promises.
  console.log("db populated!");
};

module.exports = seed;
