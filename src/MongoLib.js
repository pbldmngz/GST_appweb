
const { MongoClient } = require("mongodb");

// const USER = "gst-app";
// const PASSWORD = "twwlLQqN2R9arQZA";
const DB_NAME = "gst-web-app";
// const uri = "mongodb+srv://gst-app:twwlLQqN2R9arQZA@gst-app.abjqw.mongodb.net/gst-web-app?retryWrites=true&w=majority";

const MONGO_URI = "mongodb+srv://gst-app:twwlLQqN2R9arQZA@gst-app.abjqw.mongodb.net/gst-web-app?retryWrites=true&w=majority"; // prettier-ignore

class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
        this.dbName = DB_NAME;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.client.connect(error => {
                if (error) {
                    reject(error);
                }

                console.log("Connected succesfully to mongo");
                resolve(this.client.db(this.dbName));
            });
        });
    }

    getAll(collection, query) {
        return this.connect().then(db => {
            return db
                .collection(collection)
                .find(query)
                .toArray();
        });
    }

    getTest() {
        return this.connect().then(db => {
            return db
                .collection("areas")
                .find({})
                .toArray();
        });
    }

    test() {
        console.log("insode MongoLib")
        return "al menos esto sirve";
    }
}

module.exports = MongoLib;