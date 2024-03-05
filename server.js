const mongoose = require("mongoose");

const app = require("./app");

mongoose
  .connect(process.env.MONGO_DB, { dbName: "secret-proj" })
  .then(() => {
    app.listen(3000);
    console.log("Database succefuly connected");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
