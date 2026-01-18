//vamos a crear el servidor con express

//en esta seccion importamos
import express from "express"
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express"
import userRoutes from "./routes/user.route.js"
import postRoutes from "./routes/post.route.js"
import commentRoutes from "./routes/comment.route.js"
import NotificationRoutes from "./models/notification.model.js";
//este import es para solucionar un problema de dns en windows
import dns from "node:dns/promises";
import { arcjetMiddleware } from "./middleware/arcjet.middleware.js";
//creamos la funcion express
const app = express();
app.use(cors())
app.use(express.json())

app.use(clerkMiddleware());
app.use(arcjetMiddleware);

//conexion a la base de datos
//solucionar problema de dns en windows
dns.setServers(["1.1.1.1"]);

app.get("/", (req, res) => res.send("Hello from server"))

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", NotificationRoutes);

//error handler
app.use((err, req, res) => {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal server error" });
})
app.listen(ENV.PORT, () => console.log("Server running on port:", ENV.PORT))

const startServer = async () => {
    try {
        await connectDB();
        app.listen(ENV.PORT, () => console.log("Server running on port:", ENV.PORT));
    }

    catch (error) {
        console.error("Failed to start server", error.message);
        process.exit(1);


    }
    startServer();



}



