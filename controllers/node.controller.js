const db = require("../models/model")
const sequelize = db.sequelize;
const jwt = require('jsonwebtoken');
const users = db.users;
const bcrypt = require('bcrypt');
const Models = require('../models/users.model');
const noteModel = require('../models/Notes.model')
const Notes = noteModel.notes
const notes = db.notes
const User = Models.user
const { validationResult } = require("express-validator");
module.exports = {
    createnote: async (req, res) => {
        try {

            const user = await users.findOne({ where: { Email: req.user.Email } });

            if (!user) {
                return res.status(404).send("User not found");
            }
            const maxNoteId = await notes.max('id', { where: { UserId: req.user.Email } });
            console.log("maxnoteid", maxNoteId)
            let note = {
                id: (maxNoteId || 0) + 1,
                title: req.body.title,
                content: req.body.content,
                createdAt: new Date(),
                lastModifiedAt: new Date(),
                UserId: req.user.Email
            };
            if (note.title && note.content) {
                const createdNote = await notes.create(note);
                res.send(createdNote);
            } else {
                res.status(400).send("You need to enter both title and content");
            }
        } catch (err) {
            console.error(err);
            res.status(500).send("Error creating note: " + err.message);
        }
    },

    getNotes: async (req, res) => {
        {
            console.log("this is user", req.user.id)
            try {
                const { page = 1, limit = 10 } = req.query;
                const offset = (page - 1) * limit;
                const fetchedNotes = await notes.findAndCountAll({
                    where: { userID: req.user.Email },
                    limit: parseInt(limit),
                    offset: offset
                });
                res.json(fetchedNotes);
            } catch (error) {
                console.error(error);
                res.status(500).send('Error fetching notes');
            }
        }

    },

    getNoteByID: async (req, res) => {
        try {
            data = await notes.findOne({ where: { id: req.params.id, userId: req.user.Email } });
            console.log("gett by id", data)
            res.send(data)

        } catch (error) {
            console.error(error);
            res.status(500).send('Unable to retrieve or note might not exist');
        }
    },

    updateNote: async (req, res) => {
        try {
            console.log("this update is called")
            const { title, content } = req.body
            await notes.update(
                { title, content, lastModifiedAt: new Date() },
                { where: { id: req.params.id, userId: req.user.Email } }
            );
            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error updating note');
        }
    },

    DeleteNote: async (req, res) => {

        try {
            data = await notes.findOne({ where: { id: req.params.id, userId: req.user.Email } });
            console.log("data", data)

            await notes.destroy({
                where: { id: req.params.id, userId: req.user.Email }
            });
            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error deleting note');
        }
    }

}
