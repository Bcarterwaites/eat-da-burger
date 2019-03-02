// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $("#devoured").on("click", function(event) {
      var id = $(this).data("id");
      var devouredState = $(this).data("devour");
  
      var devoured = {
        devoured: devouredState
      };
  
      // Send the PUT request.
      $.ajax("/:id" + id, {
        type: "PUT",
        data: devoured
      }).then(
        function() {
          console.log("changed devoured", devouredState);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $("#post-new-burger").on("click", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newBurger = {
        burger_name: $("#ca").val().trim(),
        devoured: 0
      };
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("Created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".delete-burger").on("click", function(event) {
      var id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax("/api/burgers/" + id, {
        type: "DELETE"
      }).then(
        function() {
          console.log("Deleted burger", id);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });
  