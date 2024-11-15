import app from "./app";

// Set the environment variable PORT to 3000 if it is not already set.
const port = process.env.PORT;

// Start the application.
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
