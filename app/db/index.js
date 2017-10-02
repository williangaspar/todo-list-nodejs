const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = require("./db")(mongoose);
const Tarefa = require("./models/tarefa");

db.connect();

module.exports = { db, Tarefa };