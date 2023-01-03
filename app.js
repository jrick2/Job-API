const express = require("express");
const app = express();
require("dotenv").config();

// connectDB
const connectDB = require("./db/connect");

// Router
const authRouter = require("./routers/auth");
const jobRouter = require("./routers/job");

// Error handler
const authenticateUser = require("./middleware/unauthenticated");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// Middlewares
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`Server is lisining on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
