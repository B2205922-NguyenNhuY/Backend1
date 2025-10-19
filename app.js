const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");

const app = express();
const contactsRouter = require("./app/routes/contact.route");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});

app.use("/api/contacts", contactsRouter);
app.use((req, res, next) => {
  // Khi không có route nào khớp với yêu cầu
  next(new ApiError(404, "Resource not found"));
});

// Middleware xử lý lỗi tập trung
app.use((error, req, res, next) => {
  // Nếu không có statusCode, mặc định là 500 (Internal Server Error)
  res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});
module.exports = app;
