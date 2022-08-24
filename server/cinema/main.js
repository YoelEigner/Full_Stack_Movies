const express = require("express");
const userRouter = require("./routes/router");
const authRouter = require("./routes/authRoute");
const cors = require('cors')
let app = express();

app.use(express.json());
app.use(cors())

require("./configs/config");

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.listen(8001);
