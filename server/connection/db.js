const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb+srv://gargnitika1998:nitika2810@cluster0.agem9xq.mongodb.net/?retryWrites=true&w=majority")

module.exports = connection