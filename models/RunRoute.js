const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RunRouteSchema = new Schema({

    image: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        required: true,
    },

    time: {
        type: String,
        required: true,
    },

    location: {
        type: String,
        //enum: ['Charlottenburg-Wilmersdorf', 'Friedrichshain-Kreuzberg', 'Lichtenberg', 'Marzahn-Hellersdorf', 'Mitte', 'Neukölln', 'Pankow', 'Reinickendorf', 'Spandau', 'Steglitz-Zehlendorf', 'Tempelhof-Schöneberg', 'Treptow-Köpenick'],
        required: true,
    },

    startingPoint: {
        type: String,
        required: true,
    },

    distance: {
        type: String,
        required: true,
        // value: {
        //   type: Number,
        //   required: true
        // },
        // unit: {
        //   type: String,
        //   enum: ['km'],
        //   default: 'km'
        // }
    },

    duration: {
        type: String,
        required: true,
    },

    // fitnessLevel: {
    //     type: String,
    //     enum: ['Beginner', 'Intermediate', 'Advanced'],
    //     required: true
    //   },

    pace: {
        type: String,
        required: true,
    },

    difficultyLevel: {
        type: String,
        required: true,
    },

    // participants: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    //   }],
    organizer: {
        type: String,
        ref: "User",
    },
    attendees: {
        type: Number,
        default: 10,
    }
});

const RunRoute = mongoose.model("RunRoute", RunRouteSchema);
module.exports = RunRoute;
