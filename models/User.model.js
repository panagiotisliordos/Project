const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        fitnessLevel: {
            type: String,
            //enum: ["Beginner", "Intermediate", "Advanced"],
            required: true,
        },

        age: {
            type: String,
            // enum: ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
            required: true,
        },

        sex: {
            type: String,
            enum: ["Female", "Male", "Other"],
        },

        attendingEvent: [{
            type: Schema.Types.ObjectId,
            ref: "RunRoute"
        }]
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

const User = model("User", userSchema);

module.exports = User;
