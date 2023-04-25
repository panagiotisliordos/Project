const router = require("express").Router();
const { isLoggedIn } = require("../middleware/route-guard");
const RunRoute = require("../models/RunRoute");

router.get("/runRoute/add", (req, res, next) => {
    res.render("runRoute/add");
});

router.post("/runRoute", (req, res, next) => {
    console.log("BODY: ", req.body);
    const {
        image,
        title,
        date,
        time,
        location,
        startingPoint,
        distance,
        duration,
        pace,
        difficultyLevel,
        organizer,
    } = req.body;
    // node basic auth: req.session.user
    const userId = req.session.user._id;
    RunRoute.create({
        image,
        title,
        date,
        time,
        location,
        startingPoint,
        distance,
        duration,
        pace,
        difficultyLevel,
        organizer,
    })
        .then((createdRunRoute) => {
            res.redirect("/runRoute");
        })
        .catch((err) => {
            next(err);
        });
});

router.get("/runRoute", isLoggedIn, (req, res, next) => {
    const userId = req.session.user._id;
    const user = req.session.user;
    const query = {};
    if (req.session.user.role === "user") {
        query.owner = req.session.user._id;
    }

    RunRoute.find(query)
        //.populate("")
        .then((runRoute) => {
            console.log("runRoute: ", runRoute);
            res.render("runRoute/index", { runRoute, user: user });
        })
        .catch((err) => {
            next(err);
        });
});

router.get("/runRoute/:id/delete", (req, res, next) => {
    const runRouteId = req.params.id;
    // if you are an admin you can delete any room
    // if you are a user you can only delete rooms that you have created

    const query = { _id: runRouteId };

    if (req.session.user.role === "user") {
        query.owner = req.session.user._id;
    }
    console.log(query);
    RunRoute.findOneAndDelete(query)
        .then(() => {
            res.redirect("/runRoute");
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
