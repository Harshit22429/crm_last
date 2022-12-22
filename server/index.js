const express = require("express");
const app = express();
const { connectDB } = require("./config/dbConn");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "./config.env" });
const Port = process.env.PORT;
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");

connectDB();
mongoose.set("strictQuery", false);
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home First page");
});
app.use("/user", require("./routes/userRoute"));
app.use("/user", require("./routes/confidential/loginRoute"));
app.use("/customer", require("./routes/customerRoute"));
app.use("/desposition", require("./routes/despositionRoute"));
app.use("/report", require("./routes/reportRouter"));
app.use(errorHandler);

app.listen(Port, () => {
  console.log(`server is running on ${Port}`);
});
