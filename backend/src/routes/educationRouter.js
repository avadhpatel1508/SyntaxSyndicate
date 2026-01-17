const express = require("express"); 
const educationRouter = express.Router(); 
const auth = require("../middleware/userMiddleware"); 
const { submitEducationDetails, getEducationDetails, } = require("../controllers/educationController"); 
educationRouter.post("/", auth, submitEducationDetails); 
educationRouter.get("/", auth, getEducationDetails); 
module.exports = educationRouter;