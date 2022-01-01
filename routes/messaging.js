const router = require("express").Router()
const User = require("../models/User.model")
// const Message = require("../models/Message.model")
const Conversation = require("../models/Conversation.model")

// Start conversation
router.put("/new-conversation", (req, res, next) => {
    const { artist, user, message, createdDay, createdTime, read } = req.body

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

router.put("/new-message", (req, res, next) => {
    const { id, sender, message, createdDay, createdTime, read } = req.body

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

router.put("/read", (req, res, next) => {
    const { id, read } = req.body

    Conversation.findOneAndUpdate({ _id: id }, { read: true })
        .then(updatedConversation => {
            res.status(200).json({ conversation: updatedConversation })
        })
        .catch(err => next(err))
})

// router.get("/conversation/:id", (req, res, next) => {
//     Conversation.findById(req.params.id)
//         .then(conversationFromDb => {
//             res.status(200).json(conversationFromDb)
//         })
//         .catch(err => next(err))
// })

module.exports = router
