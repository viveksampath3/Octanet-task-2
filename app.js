
// packages u just installed
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["Eat", "Code", "Sleep"];
var workItems = [];

// the below line should be written down below the above else ull get a msg the app was used b4 its declare
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

// get route to acces home route
app.get("/", function (req, res) {
    // v send data to browser as a response using send function sends only one piece of data

    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }; 

    var day = today.toLocaleDateString("en-US", options);

    res.render("list", { listTitle: day, newListItems: items });

    // if u don pass all the vars that are rendering vals to browser at a time related to the home route "/",
    // then the app crashes saying that the newListItem or whatever is not defined
    // again if u do so the app would still crash cuz of the undefined item item
    // this is due to scope of the var so v declare it globally and push it in the post function
});

app.post("/", function (req, res) {

    var item = req.body.newItem;    //the body here is avaliable to use only when we use bodyparser as in line 11

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);   // item gets pushed to the items array
        res.redirect("/");
    }

});

app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
});

// finally listen on port 3000
app.listen(3000, function () {
    console.log("Server started on port 3000");;
});

