const express = require("express");
const router = express.Router();

const {
  createJobs,
  deleteJobs,
  getJob,
  getAllJobs,
  updateJobs,
} = require("../controllers/jobs");

router.route("/").post(createJobs).get(getAllJobs);
router.route("/:id").get(getJob).delete(deleteJobs).patch(updateJobs);

module.exports = router;
