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
    favoriteFoods: [String],
});

// Create a model from the person schema
let Person = mongoose.model('Person', personSchema);

/**
 * Within the createAndSavePerson function, create a document instance using the Person model constructor you built before.
 * Pass to the constructor an object having the fields name, age, and favoriteFoods.
 * Their types must conform to the ones in the personSchema.
 * Then, call the method document.save() on the returned document instance.
 * Pass to it a callback using the Node convention.
 * This is a common pattern; all the following CRUD methods take a callback function like this as the last argument.
 */

const createAndSavePerson = (done) => {
    const person = new Person({ name: 'John', age: 25, favoriteFoods: ['Pizza', 'Pasta'] });
    person.save((err, data) => {
        if (err) return console.error(err);
        done(null, data);
    });
};

/**
 * Modify the createManyPeople function to create many people using Model.create() with the argument arrayOfPeople.
 * Note: You can reuse the model you instantiated in the previous exercise.
 */

const arrayOfPeople = [
    { name: 'Frankie', age: 74, favoriteFoods: ['Del Taco'] },
    { name: 'Sol', age: 76, favoriteFoods: ['roast chicken'] },
    { name: 'Robert', age: 78, favoriteFoods: ['wine'] },
];

const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, people) => {
        if (err) return console.error(err);
        done(null, people);
    });
};

/**
 * Modify the findPeopleByName function to find all the people having a given name, using Model.find() -> [Person]
 * Use the function argument personName as the search key.
 */

const findPeopleByName = (personName, done) => {
    Person.find({ name: personName }, (err, people) => {
        if (err) return console.error(err);
        done(null, people);
    });
};

/**
 * Modify the findOneByFood function to find just one person which has a certain food in the
 * person's favorites, using Model.findOne() -> Person. Use the function argument food as search key.
 */

const findOneByFood = (food, done) => {
    Person.findOne({ favoriteFoods: food }, (err, person) => {
        if (err) return console.error(err);
        done(null, person);
    });
};

/**
 * Modify the findPersonById to find the only person having a given _id, using Model.findById() -> Person. Use the function argument personId as the search key.
 */

const findPersonById = (personId, done) => {
    Person.findById(personId, (err, person) => {
        if (err) return console.error(err);
        done(null, person);
    });
};

/**
 * Modify the findEditThenSave function to find a person by _id (use any of the above methods) with the parameter personId as search key.
 * Add "hamburger" to the list of the person's favoriteFoods (you can use Array.push()).
 * Then - inside the find callback - save() the updated Person.
 *
 * Note: This may be tricky, if in your Schema, you declared favoriteFoods as an Array, without specifying the type (i.e. [String]).
 * In that case, favoriteFoods defaults to Mixed type, and you have to manually mark it as edited using document.markModified('edited-field').
 */

const findEditThenSave = (personId, done) => {
    const foodToAdd = 'hamburger';

    Person.findById(personId, (err, person) => {
        if (err) return console.error(err);
        person.favoriteFoods.push(foodToAdd);
        person.save((err, updatedPerson) => {
            if (err) return console.error(err);
            done(null, updatedPerson);
        });
    });
};

/**
 * Modify the findAndUpdate function to find a person by Name and set the person's age to 20.
 * Use the function parameter personName as the search key.
 *
 * Note: You should return the updated document.
 * To do that, you need to pass the options document { new: true } as the 3rd argument to findOneAndUpdate().
 * By default, these methods return the unmodified object.
 */

const findAndUpdate = (personName, done) => {
    const ageToSet = 20;

    Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, updatedPerson) => {
        if (err) return console.error(err);
        done(null, updatedPerson);
    });
};

/**
 * Modify the removeById function to delete one person by the person's _id.
 * You should use one of the methods findByIdAndRemove() or findOneAndRemove().
 */

const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, (err, removedPerson) => {
        if (err) return console.error(err);
        done(null, removedPerson);
    });
};

/**
 * Modify the removeManyPeople function to delete all the people whose name is within the variable nameToRemove, using Model.remove().
 * Pass it to a query document with the name field set, and a callback.
 *
 * Note: The Model.remove() doesn’t return the deleted document, but a JSON object containing the outcome of the operation, and the number of items affected.
 * Don’t forget to pass it to the done() callback, since we use it in tests.
 */

const removeManyPeople = (done) => {
    const nameToRemove = 'Mary';

    Person.remove({ name: nameToRemove }, (err, response) => {
        if (err) return console.error(err);
        done(null, response);
    });
};

/**
 * Modify the queryChain function to find people who like the food specified by the variable named foodToSearch.
 * Sort them by name, limit the results to two documents, and hide their age.
 * Chain .find(), .sort(), .limit(), .select(), and then .exec(). Pass the done(err, data) callback to exec().
 */

const queryChain = (done) => {
    const foodToSearch = 'burrito';

    Person.find({ favoriteFoods: foodToSearch })
        .sort({ name: 1 })
        .limit(2)
        .select('-age')
        .exec((err, data) => {
            if (err) return console.error(err);
            done(null, data);
        });
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
