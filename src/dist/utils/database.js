"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoconnect = void 0;
const mongoose = require("mongoose");
const config = require("../config");
const admin_model_1 = require("../models/admin.model");
class mongoconnect {
    connectToDb() {
        try {
            mongoose.set("debug", true);
            mongoose.set('strictQuery', true);
            mongoose.connect(config.SERVER.MONGODB_URL);
            console.info("Connect to Database");
            var db = mongoose.connection;
            db.on("error", console.error.bind(console, "connection error:"));
            db.once("open", function () {
                var fs = require("fs"), obj;
                fs.readFile("./src/upload/user.json", handleFileUser);
                async function handleFileUser(err, data) {
                    if (err)
                        throw err;
                    obj = JSON.parse(data);
                    const count = await admin_model_1.Admin.find().countDocuments();
                    if (count === 0) {
                        admin_model_1.Admin.collection.insertMany(obj)
                            .then(function () {
                            console.log("Multiple documents inserted to Collection");
                        }).catch(function (err) {
                            console.log(err);
                        });
                    }
                }
            });
        }
        catch (err) {
            console.error("Connection error" + err);
        }
    }
}
exports.mongoconnect = mongoconnect;
//# sourceMappingURL=database.js.map