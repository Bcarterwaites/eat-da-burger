var express = require("express");

var router = express.Router();

var food = require("../models/burger");


router.get("/", function(req, res) {
    food.all(function(data) {
        var hbsObject = {
            foods: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject)
    });
});

router.post("/api/burgers", function(req, res) {
    food.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function() {
        res.redirect("/")
    });

});

router.put("/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    food.updateOne({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
    
});

router.delete("/:id", function(req, res) {
    var condition = "id = " + req.params.id;

 food.delete(condition, function(result) {
     if (result.affectedRows == 0) {
         return res.status(404).end();

     } else {
         res.status(200).end();
     }
     });
 });

    module.exports = router;



