const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { globalErrorHandler } = require("./controllers/error.controller");

// const authRoutes = require("./routes/auth");
// const qrRoutes = require("./routes/qr");
// const analyticsRoutes = require("./routes/analytics");

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// app.use("/api/auth", authRoutes);
// app.use("/api/qr", qrRoutes);
// app.use("/api/analytics", analyticsRoutes);

app.use("/{*splat}", (req, res, next) => {
  next(new AppError("This route is not defined", 404));
});

app.use(globalErrorHandler);

module.exports = app;
