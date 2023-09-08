// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')
const server = express();
server.use(express.json())

server.get('/api/users', (req, res) => {
    User.find()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        res.status(500).json({
            message: `Error fetching users`,
            err: err.message,
            stack : err.stack
        })
    })
})

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        if(!user) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else {
        res.json(user)
        res.status(200) }
    }) 
    .catch(err => {
        res.status(500).json({
            message: "The user with the specified ID does not exist",
            err: err.message,
            stack : err.stack
        })
    })
})

server.post('/api/users', (req, res) => {
    const user = req.body;
    if(!user.name || !user.bio) {
        res.status(400).json({
            message: 'Please provide name and bio for the user'
        })
    } else {
    User.insert(user)
    .then(createdUser => {
        res.status(201).json(createdUser)
    })
    .catch(err => {
        res.status(500).json({
            message: "The user does not exist",
            err: err.message,
            stack : err.stack
        })
    })
}
})

server.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not found'
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of ()}
