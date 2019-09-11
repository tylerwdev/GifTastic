var topics = ['Mario', 'Legend of Zelda', 'Metroid', 'Mega Man', 'Resident Evil', 'Final Fantasy']

function renderButtons() {
    $('#buttons-view').empty();

    for (let i = 0; i < topics.length; i++) {
       var gifButton = $('<button>');
        gifButton.attr("data-gif", topics[i]);
        gifButton.text(topics[i]);
        gifButton.addClass("gifGetter")
        $('#buttons-view').append(gifButton);
    }
}

renderButtons();

$(".gifGetter").on('click', function() {
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

        for (let i = 0; i < results.length; i++) {
            var gifDiv = $('<div>');
            var p = $('<p>');
            p.text(results[i].rating);
            var gifImage = $('<img>');
            gifImage.attr('src', results[i].images.fixed_height.url);
            gifDiv.append(p);
            gifDiv.append(gifImage);
            $('#gifs-here').prepend(gifDiv);
            
        }

    })
})
