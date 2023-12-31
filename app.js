require("dotenv").config();
require("express-async-errors");

// security
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const { rateLimit } = require("express-rate-limit");

// swagger
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDoc = YAML.load("./swagger.yaml");

const express = require("express");
const app = express();

// connectDB
const connectDB = require("./db/connect");
const authenticationUser = require("./middleware/authentication");

// router
const AuthRouter = require("./routes/auth");
const JobRouter = require("./routes/jobs");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use("/api/v1/auth/", AuthRouter);
app.use("/api/v1/jobs/", authenticationUser, JobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
