var topics = ['Avatar the Last Airbender', 'Aang', 'Katara', 'Sokka', 'Toph', 'FireLord Ozai', 'Appa Avatar', 'Uncle Iroh']

function renderButtons() {
    $('#buttons-view').empty();

    for (let i = 0; i < topics.length; i++) {
       var gifButton = $('<button>');
        gifButton.attr("data-gif", topics[i]);
        gifButton.text(topics[i]);
        gifButton.addClass("gifGetter");
        gifButton.addClass('btn btn-primary');
        gifButton.addClass('button-color');
        $('#buttons-view').append(gifButton);
    }
}

renderButtons();

$(document).on('click', '.gifGetter', function() {
    var demo = $(this).attr('data-gif');
    console.log(this)
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    demo + "&api_key=wtHjicxuwApAhu301hs6kPo5RevMnteL&limit=10";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        console.log(response);
        var results = response.data

        $('#gifs-here').empty();

        for (let i = 0; i < results.length; i++) {
            var gifDiv = $('<div>');
            var p = $('<p>');
            p.text(results[i].rating);
            var gifImage = $('<img>');
            gifImage.attr('src', results[i].images.fixed_height_still.url);
            gifDiv.append(p);
            gifDiv.append(gifImage);
            gifImage.attr('data-still', results[i].images.fixed_height_still.url);
            gifImage.attr('data-animate', results[i].images.fixed_height.url);
            gifImage.attr('data-state', 'still');
            gifImage.addClass('gif');


            $('#gifs-here').prepend(gifDiv);
            // renderButtons();
        }
        
    })
})

$('#add-gif').on('click', function (event) {
    event.preventDefault();
    var gif = $('#gif-input').val().trim();

    topics.push(gif);

    renderButtons();
    // $('#gif-input')[0].reset();
})

$(document).on('click', '.gif', function () {
    // $(this).
    var state = $(this).attr('data-state');
    if (state==='still'){
        var animatedSrc = $(this).attr('data-animate');
        $(this).attr('src', animatedSrc);
        $(this).attr('data-state', 'animate')
      } else {
        var stillSrc = $(this).attr('data-still')
        $(this).attr('src',stillSrc)
        $(this).attr('data-state', 'still')
      }
})
