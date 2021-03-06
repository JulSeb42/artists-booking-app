const { Schema, model } = require("mongoose")

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["user", "artist"],
        },

        city: String,

        imageUrl: String,

        // Artists
        genre: String,

        bio: String,

        price: Number,

        available: Array,

        youtube: Array,

        youtubeLink: String,

        facebookLink: String,

        instagramLink: String,

        visible: Boolean,

        // Verification
        verified: Boolean,

        verifyToken: String,

        resetToken: String,

        // Messages
        contacted: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        // Messaging service
        conversations: [
            {
                type: Schema.Types.ObjectId,
                ref: "Conversation",
            },
        ],
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
)

const User = model("User", userSchema)

module.exports = User
