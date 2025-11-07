/* ******************************************
* This server.js file is the primary file of the
* application. It is used to control the project.
*******************************************/

/* ***********************
* Require Statements
*************************/
const connectDB = require("./config/db"); // Import the database connection function
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv"); 
const app = express();
const staticRoutes = require("./routes/static"); // Ensure this path is correct

/* ***********************
* View Engine and Templates
*************************/
dotenv.config(); // Load environment variables from .env file

connectDB(); // Connect to the database
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout"); // Specify layout file

/* ***********************
* Middleware
*************************/
// Serve static files if needed (e.g., CSS, JS)
app.use(express.static("public")); // Adjust the path to your static files

/* ***********************
* Routes
*************************/
app.use(staticRoutes); // Use static routes from the imported file

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

/* ***********************
* Error Handling Middleware
*************************/
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

/* ***********************
* Local Server Information
* Values from .env (environment) file
*************************/
const port = process.env.PORT || 3000; // Default to 3000 if not set
const host = process.env.HOST || "localhost"; // Default to localhost if not set

/* ***********************
* Log statement to confirm server operation
*************************/
app.listen(port, () => {
    console.log(`App listening on http://${host}:${port}`);
});