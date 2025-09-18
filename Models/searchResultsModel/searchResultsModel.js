const mongoose = require("mongoose");

const searchResults = new mongoose.Schema({



    title: {
        type: String,
    },

});

const Search = mongoose.model("Search", searchResults);
module.exports = Search;