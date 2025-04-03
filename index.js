const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbConnect = require("./utils/dbConnect");

const authRoute = require("./routes/auth.route");
const otpRoute = require("./routes/otp.route");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.status(200).json({
    status: "ok",
    message: "Hello from Server",
  });
});

app.use("/auth", authRoute);
app.use("/otp", otpRoute);

app.listen(PORT, () => {
  console.log(`[INFO] Server is running on port ${PORT}`);
  dbConnect();
});
