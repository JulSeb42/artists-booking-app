// Packages
const router = require("express").Router()

// Models
const User = require("../models/User.model")
const Conversation = require("../models/Conversation.model")

// Get all conversations
router.get("/conversations", (req, res, next) => {
    Conversation.find()
        .populate("artist")
        .populate("user")
        .populate({
            path: "messages",
            populate: {
                path: "sender",
                model: "User",
            },
        })
        .then(conversationFromDb => {
            res.status(200).json(conversationFromDb)
        })
        .catch(err => next(err))
})

// Get conversation
router.get("/conversation/:id", (req, res, next) => {
    Conversation.findById(req.params.id)
        .populate("artist")
        .populate("user")
        .populate({
            path: "messages",
            populate: {
                path: "sender",
                model: "User",
            },
        })
        .then(conversationFromDb => {
            res.status(200).json(conversationFromDb)
        })
        .catch(err => next(err))
})

// Start conversation
router.post("/new-conversation", (req, res, next) => {
    const { artist, user, message, createdDay, createdTime } = req.body

    if (!message) {
        return res
            .status(400)
            .json({ message: "Your message can not be empty." })
    }

    Conversation.create({
        artist,
        user,
        messages: { sender: user, message, createdDay, createdTime },
        createdDay,
        createdTime,
        read: false,
    })
        .then(createdConversation => {
            User.findOneAndUpdate(
                { _id: user },
                {
                    $push: {
                        conversations: createdConversation,
                        contacted: artist,
                    },
                }
            ).then(updatedUser => {
                User.findOneAndUpdate(
                    { _id: artist },
                    { $push: { conversations: createdConversation } }
                ).then(() => {
                    res.status(200).json({ user: updatedUser })
                })
            })
        })
        .catch(err => next(err))
})

// Send a message
router.put("/new-message", (req, res, next) => {
    const { id, sender, message, createdDay, createdTime } = req.body

    Conversation.findOneAndUpdate(
        { _id: id },
        {
            $push: {
                messages: {
                    sender,
                    message,
                    createdDay,
                    createdTime,
                },
            },
            read: false,
        }
    )
        .then(updatedConversation => {
            res.status(200).json({ conversation: updatedConversation })
        })
        .catch(err => next(err))
})

// Read conversation
router.put("/read/:id", (req, res, next) => {
    Conversation.findByIdAndUpdate(req.params.id, { read: true }, { new: true })
        .then(updatedConversation => {
            res.status(200).json({ conversation: updatedConversation })
        })
        .catch(err => next(err))
})

module.exports = router
