var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const http = require("http");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const socketio = require("socket.io");

var authRouter = require("./routes/authRoute");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", authRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const server = http.createServer(app);
server.listen(5000, () => console.log("Server running on port 5000"));

mongoose.connect(process.env.MONGO_URI, {
}).then(() => { console.log("connected to DB!"); })
  .catch((err) => {
    console.log("error", err.message)
  });

const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"], // Add the methods your client uses
    credentials: true, // If you're using cookies or authentication
  },
});

const connectedUsers = new Map(); // Map to store connected users
io.on("connection", (socket) => {
  console.log("User connected");


  socket.on("join", ({ username }) => {
    connectedUsers.set(socket.id, username);
    socket.emit("message", { user: "admin", text: `${username}, welcome to the chat` });
    socket.broadcast.emit("message", { user: "admin", text: `${username} has joined the chat` });

    io.emit("onlineUsers", [...connectedUsers.values()]);
  });

  socket.on("sendMessage", (message) => {
    const user = connectedUsers.get(socket.id);
    io.emit("message", { user, text: message });
  });

    

  socket.on("disconnect", () => {
    const disconnectedUser = connectedUsers.get(socket.id);
    connectedUsers.delete(socket.id);
    io.emit("userDisconnected", { userId: socket.id, username: disconnectedUser });
    console.log("User disconnected");
    io.emit("onlineUsers", [...connectedUsers.values()]);
  });
});


