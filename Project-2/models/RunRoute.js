const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RunRouteSchema = new Schema({
    name: String,
    place: String,
    time: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

const RunRoute = mongoose.model("RunRoute", RunRouteSchema);
module.exports = RunRoute;
