import app from "./app";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Database running");
    const PORT = process.env.PORT;

    app.listen(PORT, () => {
      console.log(`App is running!`);
    });
  })
  .catch((err) => console.error(err));
