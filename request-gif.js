

$(document).ready(function() {
    // register our function as the "callback" to be triggered by the form's submission event
    $("#form-gif-request").submit(validateTest); // in other words, when the form is submitted, fetchAndDisplayGif() will be executed
});

/**
 * sends an asynchronous request to Giphy.com aksing for a random GIF using the
 * user's search term (along with "jackson 5")
 *
 * upon receiving a response from Giphy, updates the DOM to display the new GIF
 */

function validateTest(event) {

  event.preventDefault();

  if (!$("#val-check").val() || isNaN($("#val-check").val()) || $("#val-check").val() != 5) {

    $("#alert-box").addClass("has-error");
    $("#feedback").attr("hidden", false).text("No GIF for you!").css('color', 'red');
    $("#gif").attr("hidden", true);

  } else {

    $("#alert-box").removeClass("has-error");
    fetchAndDisplayGif();

  }

}

function fetchAndDisplayGif() {

    // This prevents the form submission from doing what it normally does: send a request (which would cause our page to refresh).
    // Because we will be making our own AJAX request, we dont need to send a normal request and we definitely don't want the page to refresh.

    // get the user's input text from the DOM
    var searchQuery = $("#form-gif-request input[type=text]").val();

    // configure a few parameters to attach to our request
    var params = {
        api_key: "dc6zaTOxFJmzC",
        tag : "jackson 5 " + searchQuery
    };

    // make an ajax request for a random GIF
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/random",
        data: params, // attach those extra parameters onto the request
        beforeSend: function(){
          console.log(searchQuery);
          $("#feedback").attr("hidden", false).text("Loading...").css('color', 'black');
        },
        success: function(response) {
            // if the response comes back successfully, the code in here will execute.

            // jQuery passes us the `response` variable, a regular javascript object created from the JSON the server gave us


            $("#gif").attr("src", response.data.image_url);

            $("#feedback").attr("hidden", true);
            $("#gif").attr("hidden", false);
        },
        error: function() {
            // if something went wrong, the code in here will execute instead of the success function

            // give the user an error message
            $("#feedback").text("Sorry, could not load GIF. Try again!");
            setGifLoadedStatus(false);
        }
    });

    // TODO
    // give the user a "Loading..." message while they wait



}


/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
}
