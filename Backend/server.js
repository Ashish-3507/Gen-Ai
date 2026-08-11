import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
import connection from "./src/config/connection.js";

const PORT = process.env.PORT || 3000;

connection()
    .then(() => {
        const server = app.listen(PORT, () => {
            console.log(
                `Server is connected to the database and running on port ${PORT}`
            );
        });

        server.on("error", (error) => {
            console.error("Server error:", error);
        });
    })
    .catch((error) => {
        console.error(
            "Something went wrong while connecting to MongoDB:",
            error
        );
    });

export default app;