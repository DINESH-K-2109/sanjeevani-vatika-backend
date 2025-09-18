
const { searchResults } = require("../../Controllers/searchResultsControllers/searchResultsControllers");



// ab ek express ka router banawo bhai


const router = require("express").Router();

// api for getting all the likes count of the page;

router.post("/searchresults", searchResults);

module.exports = router;








