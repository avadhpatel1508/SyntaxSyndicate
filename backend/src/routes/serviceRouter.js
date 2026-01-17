const express = require("express");
const servicerouter = express.Router();

const userMiddleware = require("../middleware/userMiddleware");
const {
  enrollService,
  getMyServices,
  deactivateService,
} = require("../controllers/serviceEnrollmentController");

// Activate a service
servicerouter.post("/enroll", userMiddleware, enrollService);

// Get active services of user
servicerouter.get("/my-services", userMiddleware, getMyServices);

// Deactivate a service
servicerouter.patch("/deactivate", userMiddleware, deactivateService);

module.exports = servicerouter;
