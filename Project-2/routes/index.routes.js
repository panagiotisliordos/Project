const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/route-guard");
const RunRoute = require("../models/RunRoute");

const data=[{
    image: 'https://content.r9cdn.net/rimg/dimg/94/77/3c308be3-lm-1035-172eedc4c70.jpg?width=1366&height=768&xhint=2600&yhint=3239&crop=true',
    title: 'Historical Berlin Run',
    date: new Date(2023, 05, 19),
    time: "08:00",
    location: 'Mitte',
    startingPoint: 'Alexanderplatz',
    distance: "8 km",
    duration: "1 hour",
    pace: "6:30",
    difficultyLevel: "beginner",
    organizer: "Sam"
},
{
    image: 'https://www.tip-berlin.de/wp-content/uploads/2021/02/imago0101528850h-1-scaled.jpg',
    title: 'Run in the Park',
    date: new Date(2023, 05, 20),
    time: "10:00",
    location: 'Prenzlauer Berg',
    startingPoint: 'Volkspark Friedrichshain',
    distance: "5 km",
    duration: "45 minutes",
    pace: "6:00",
    difficultyLevel: "beginner",
    organizer: "Julia"
},
{
    image: 'https://ychef.files.bbci.co.uk/976x549/p0dbb76p.jpg',
    title: 'Tempelhofer Feld Run',
    date: new Date(2023, 05, 22),
    time: "07:00",
    location: 'Neukölln',
    startingPoint: 'Tempelhofer Feld',
    distance: "7 km",
    duration: "1 hour",
    pace: "6:30",
    difficultyLevel: "beginner",
    organizer: "Tom"
},
{
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Berlin-_Bundestag_by_the_Spree_-_3570.jpg',
    title: 'Tiergarten and Spree River Run',
    date: new Date(2023, 05, 24),
    time: "06:30",
    location: 'Mitte',
    startingPoint: 'Bellevue Palace',
    distance: "12 km",
    duration: "1.5 hours",
    pace: "7:00",
    difficultyLevel: "intermediate",
    organizer: "Maria"
},
{
    image: 'https://lichotaphoto.files.wordpress.com/2016/08/berlin-kreuzberg-viktoriapark-2.jpg?w=768',
    title: 'Kreuzberg and Tempelhof Run',
    date: new Date(2023, 05, 26),
    time: "08:00",
    location: 'Kreuzberg',
    startingPoint: 'Viktoriapark',
    distance: "10 km",
    duration: "1.5 hours",
    pace: "7:30",
    difficultyLevel: "intermediate",
    organizer: "Mark"
}, 
{
    image: 'https://www.visitberlin.de/system/files/styles/visitberlin_content_image_medium_visitberlin_mobile_1x/private/image/Schloss_Charlottenburg_02_c_Scholvien_DL_PPT_1.jpg?itok=f9GCKdZ_',
    title: 'Charlottenburg Castle and Park Run',
    date: new Date(2023, 05, 28),
    time: "10:00",
    location: 'Charlottenburg',
    startingPoint: 'Charlottenburg Palace',
    distance: "6 km",
    duration: "45 minutes",
    pace: "6:00",
    difficultyLevel: "beginner",
    organizer: "Nina"
},
{
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/10/57/af/09/tiergarten-1.jpg',
    title: 'Zoo and Tiergarten Run',
    date: new Date(2023, 05, 30),
    time: "07:00",
    location: 'Tiergarten',
    startingPoint: 'Zoologischer Garten',
    distance: "8 km",
    duration: "1 hour",
    pace: "6:30",
    difficultyLevel: "beginner",
    organizer: "Peter"
},
{
    "image": 'https://www.berlin.de/binaries/asset/image_assets/3877031/source/1677838307/624x468/',
    "title": 'Tiergarten Tour',
    "date": new Date(2023, 05, 15),
    "time": "07:00",
    "location": 'Mitte',
    "startingPoint": 'Brandenburger Tor',
    "distance": "10 km",
    "duration": "1.5 hours",
    "pace": "7:30",
    "difficultyLevel": "beginner-intermediate",
    "organizer": "Ben"
}, {
    "image": 'https://media.timeout.com/images/101285069/750/422/image.jpg',
    "title": 'Run through the Forest',
    "date": new Date(2023, 05, 17),
    "time": "06:30",
    "location": 'Grunewald',
    "startingPoint": 'Teufelsberg',
    "distance": "15 km",
    "duration": "2 hours",
    "pace": "7:45",
    "difficultyLevel": "intermediate-advanced",
    "organizer": "Lisa"
}]



RunRoute.insertMany(data)
 	.then(data => {
 		console.log(`Success: Added ${data.length} routes to the db`)
 	})
 	.catch(err => console.log(err))

/* GET home page */
router.get("/", (req, res, next) => {
    res.render("index");
});

router.get("/profile", isLoggedIn, (req, res, next) => {
    // When you want to use the user info in a view
    // Access logged in user
    const user = req.session.user;
    res.render("profile", { user: user });
});

module.exports = router;
