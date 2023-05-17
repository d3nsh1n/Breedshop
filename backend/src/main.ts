import chalk from "chalk";
import dayjs from "dayjs";
import express from "express";

console.log(chalk.magenta(`===== ${dayjs().format("HH:mm:ss")} =====`));

const app = express();
const port = 3000;

// Serve static assets
app.use(express.static("front_dist"));

// Define your routes and server logic

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
