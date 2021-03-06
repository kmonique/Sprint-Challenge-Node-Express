//requires
const express = require("express");
const server = express();
const projectRouter = require("./Routers/project_router.js");
const actionRouter = require("./Routers/action_router.js");

server.use(
   express.json(),
)

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

const PORT = process.env.PORT || 5050;

server.listen(PORT, err => {
   console.log(`server up and running on port ${PORT}`)
});