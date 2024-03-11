const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.log('MongoDB URI is not set');
    process.exit(1);
}

const connectDB = async () => {
  try {
      const conn = await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
      const error = err;
      console.log(`Error: ${error.message}`);
      process.exit(1);
  }
};

connectDB();

/**
 * Create a person schema called personSchema with the following shape:
 * 
 * A required name field of type String
 * An age field of type Number
 * A favoriteFoods field of type [String]
 * 
 * Use the Mongoose basic schema types. If you want you can also add more fields, 
 * use simple validators like required or unique, and set default values.
 */

// Create a person schema
const Schema = mongoose.Schema;

// Create a person schema
const personSchema = new Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
});

// Create a model from the person schema
let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
    done(null /*, data*/);
};

const createManyPeople = (arrayOfPeople, done) => {
    done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
    done(null /*, data*/);
};

const findOneByFood = (food, done) => {
    done(null /*, data*/);
};

const findPersonById = (personId, done) => {
    done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
    const foodToAdd = 'hamburger';

    done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
    const ageToSet = 20;

    done(null /*, data*/);
};

const removeById = (personId, done) => {
    done(null /*, data*/);
};

const removeManyPeople = (done) => {
    const nameToRemove = 'Mary';

    done(null /*, data*/);
};

const queryChain = (done) => {
    const foodToSearch = 'burrito';

    done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
