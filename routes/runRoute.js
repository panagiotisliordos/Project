const router = require("express").Router();
const { isLoggedIn } = require("../middleware/route-guard");
const RunRoute = require("../models/RunRoute");
const User = require("../models/User.model");

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
    attendees,
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
    attendees,
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
    query.organizer = req.session.user._id;
  }

  RunRoute.find(query)
    //.populate("")
    .then((runRoute) => {
      console.log("runRoute: ", runRoute[0].date.toDateString());
      var runRouteCopy = [...runRoute];
      runRouteCopy.forEach((item) => (item.date = item.date.toDateString()));
      console.log(runRouteCopy);
      res.render("runRoute/index", { runRouteCopy, user: user });
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
    query.organizer = req.session.user._id;
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

router.post("/runRoute/search", (req, res, next) => {

    const { location, date } = req.body;
    const query = { };

    if (location) {
      query.location = { $regex: new RegExp(location, "i") }; 
    }
    
    if (date) {
        query.date = { $gte: date };
      }
    console.log(query); // to see on terminal if search endpoint receives data.

    RunRoute.find(query)
      .then((runRoutes) => {
        
        console.log("runRoutes: ", runRoutes);
        runRoutes.forEach((route)=> {
            console.log('location:', route.location);
            console.log('organizer:', route.organizer);
        });
        res.render("runRoute/searchResults", { runRoutes });
      })
      .catch((err) => {
        next(err);

      });
      res.render("runRoute/searchResults", { runRoutes });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/attend/:id", (req, res, next) => {
  const id = req.params.id;
  RunRoute.findById(id)
    .then((eventFromDB) => {
      const availableAttendees = 20 - eventFromDB.attendees
      res.render("attend", { eventFromDB, availableAttendees })})
    .catch((err) => next(err));
});


router.post('/confirm-attendance', (req, res, next) => {
  const user = req.session.user._id
  const { event } = req.body
  //console.log("this is the event", event)

  RunRoute.findById(event)
    .then((foundEvent) => {
      console.log('found event', foundEvent)
      if (foundEvent.attendees < 11) {
        foundEvent.attendees += 1
        foundEvent.save()
          .then(() => {
            User.findByIdAndUpdate(user, { $push: { attendingEvent: event } })
              .then(() => {
                res.redirect('/profile')
              })
              .catch((err) => next(err))
          })
          .catch((err) => next(err))
      } else {
        res.redirect('/profile')
      }
    })
    .catch((err) => next(err))
});

router.post('/cancel-attendance', (req, res, next) => {
  const user = req.session.user._id
  const { event } = req.body

  RunRoute.findById(event)
    .then((foundEvent) => {
      foundEvent.attendees -= 1
      foundEvent.save()
        .then(() => {
          User.findByIdAndUpdate(user, { $pull: { attendingEvent: event } })
            .then(() => {
              res.redirect('/profile')
            })
            .catch((err) => next(err))
        })
        .catch((err) => next(err))
    })
    .catch((err) => next(err))
});



module.exports = router;
