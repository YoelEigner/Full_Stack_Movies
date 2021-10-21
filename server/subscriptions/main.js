const express = require("express");
const movieRouter = require("./routers/router");
const subsRouter = require("./routers/subsRouter");
const membersRouter = require("./routers/membersRouter");
const cors = require('cors')

let app = express();
app.use(cors())

require('./configs/configDB')

app.use(express.json());
app.use("/api/movies", movieRouter);
app.use("/api/subs", subsRouter);
app.use("/api/members", membersRouter);


app.listen(8000);


