require("dotenv").config();
require("./db");
const express = require("express");

const app = express();

// Importe e use o middleware de configuração
require("./config")(app);

// Rotas
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

const messagesRoutes = require("./routes/messages.routes");
app.use("/", messagesRoutes);

const announcementsRoutes = require("./routes/announcements.routes");
app.use("/announcements", announcementsRoutes);

const profileRoutes = require("./routes/profile.routes");
app.use("/profile", profileRoutes);

require("./error-handling")(app);

module.exports = app;
