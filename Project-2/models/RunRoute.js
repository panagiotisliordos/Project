const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RunRouteSchema = new Schema({

    image: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true
    },
    
    date: {
        type: Date,
        required: true
      },

    time: {
        type: String,
        required: true
      },

    location: {
        type: String,
        enum: ['Charlottenburg-Wilmersdorf', 'Friedrichshain-Kreuzberg', 'Lichtenberg', 'Marzahn-Hellersdorf', 'Mitte', 'Neukölln', 'Pankow', 'Reinickendorf', 'Spandau', 'Steglitz-Zehlendorf', 'Tempelhof-Schöneberg', 'Treptow-Köpenick'],
        required: true
      },

    startingPoint: {
        type: String,
        required: true
    },

    distance: {
        value: {
          type: Number,
          required: true
        },
        unit: {
          type: String,
          enum: ['km'],
          default: 'km'
        }
      },

    duration: {
        type: Number,
        required: true
    },

    fitnessLevel: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
      },

    pace: {
        type: Number,
        required: true
      },

    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }],

    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },

    
});

const RunRoute = mongoose.model("RunRoute", RunRouteSchema);
module.exports = RunRoute;
