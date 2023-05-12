const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors')


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).send({
        message: "this is my api"
    });
});

const { userRouters, authRouters } = require("./routers");
app.use("/user", userRouters);
app.use("/auth", authRouters);


app.listen(process.env.PORT, () => {
    console.log(`api is running on port: ${process.env.PORT}...`);
})