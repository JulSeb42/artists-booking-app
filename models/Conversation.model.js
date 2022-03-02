const { Schema, model } = require("mongoose")

const conversationSchema = new Schema(
    {
        artist: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        messages: [
            {
                sender: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },

                message: {
                    type: String,
                    required: true,
                },

                createdDay: String,
                createdTime: String,
            },
        ],

        createdDay: String,
        
        createdTime: String,
        
        read: Boolean,
    },
    {
        timestamps: true,
    }
)

const Conversation = model("Conversation", conversationSchema)

module.exports = Conversation
