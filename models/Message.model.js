const { Schema, model } = require("mongoose")

const messageSchema = new Schema(
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
    {
        timestamps: true,
    }
)

const Message = model("Message", messageSchema)

module.exports = Message
