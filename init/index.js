if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

const MONGO_URL = process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log("connected to db");
    }).catch(err => {
        console.log(err);
    });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: '6adb33443580fd2e276ddcd8',
        geometry: {type: "Point", coordinates: [77.2090, 28.6139]}
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();