const express = require("express");
const app = express();
const PORT = process.env.port || 3000;
const methodOverride = require("method-override");
const expressLayout = require("express-ejs-layouts");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("express-flash");
const globalRouter = require("./routes/globalRoutes");
const authRouter = require("./routes/authRoutes");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./app/models/auth/User");
const locals = require("./app/middlewares/locals");

const db = "mongodb://localhost:27017/blogApp";

//EJS
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

//middlewares
app.use(expressLayout);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

//session config
app.use(
  session({
    secret: "thisiswhaticameupwith",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: db,
      collectionName: "sessions",
      ttl: 1000 * 60 * 60 * 24,
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

//flash
app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());

//passport LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//db config
const dbSuccess = () => console.log("DB Connected successfully");
const dbError = (err) => console.log("Couldn't connect to db");

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(dbSuccess)
  .catch(dbError);

// external middleware functions
app.use(locals);

//routes
app.use(authRouter);
app.use(globalRouter);

const handleListening = () => console.log(`Server listening on Port ${PORT}`);

app.listen(PORT, handleListening);
