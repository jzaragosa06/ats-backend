const express = require("express")
require("dotenv").config()
const router = express.Router();

const addApplicantController = require("../../controllers/applicant/addApplicantController")

// applicants/add/
router.post("/", addApplicantController.addApplicant);

// applicants/add/upload
router.post("/upload", addApplicantController.uploadApplicants);

module.exports = router;