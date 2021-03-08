const express = require("express");

//Object Destructuring and obtaining the controller functions here from bootcamps methods
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} = require("../controllers/bootcamps");

const router = express.Router();
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

//Associating controller methods with the appropriate routes
router.route("/").get(getBootcamps).post(createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
