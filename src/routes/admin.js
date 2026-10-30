const { Router } = require("express");
const authenticateToken = require("../middlewares/auth");
const { addSchedule, listBookings } = require("../controllers/adminController");

const router = Router();

router.post("/schedules", authenticateToken, addSchedule);
router.get("/bookings", authenticateToken, listBookings);

module.exports = router;