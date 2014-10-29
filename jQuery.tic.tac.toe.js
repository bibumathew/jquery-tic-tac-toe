/**
 * Created by bimathew on 10/29/2014.
 */ (function ($) {
    //create tic tac toe

    $('body').append(
        '<div id="results"></div>' +
        '<input id="resetBtn" type="button" value="reset" />' +
        '<div id="tictac">' +
        '<div id="one"></div>' +
        '<div id="two"></div>' +
        '<div id="three"></div>' +
        '<div id="four"></div>' +
        '<div id="five"></div>' +
        '<div id="six"></div>' +
        '<div id="seven"></div>' +
        '<div id="eight"></div>' +
        '<div id="nine"></div>' +
        '</div>');

    var firstPlayer,
        secondPlayer,
        displayValue,
        ticTacToe = $("#tictac"),
        resetBtn = $("#resetBtn"),
        resultDiv = $('#results'),
        ticTacToeChildDiv = ticTacToe.children(),
        ticTacToeStyle = {
            "width": "600px",
            "border": "1px solid black",
            "overflow": "hidden",
            "height": "600px",
            "margin": "0 auto"
        },
        ticTacToeChildStyle = {
            "width": "198px",
            "border": "1px solid green",
            "float": "left",
            "height": "200px",
            "font-size": "150px",
            "text-align": "center"
        },
        resultDivStyle = {
            "height":"50px",
            "width": "600px",
            "font-size": "40px"
        };
    ticTacToe.css(ticTacToeStyle);
    resultDiv.css(resultDivStyle);
    ticTacToeChildDiv.css(ticTacToeChildStyle);
    resetBtn.on('click', function () {
        firstPlayer = "X";
        secondPlayer = "0";
        displayValue = secondPlayer;
        ticTacToeChildDiv.html('');
        resultDiv.html("Start Game");
        ticTacToe.on('click', function (e) {
            var selectedElement = $(e.target);
            if (!selectedElement.html()) {
                displayValue = displayValue == secondPlayer ? firstPlayer : secondPlayer;
                selectedElement.html(displayValue);
            }
            var one = $('#one').html(),
                two = $('#two').html(),
                three = $('#three').html(),
                four = $('#four').html(),
                five = $('#five').html(),
                six = $('#six').html(),
                seven = $('#seven').html(),
                eight = $('#eight').html(),
                nine = $('#nine').html(),
                results = "";

            if (one && two && three && four && five && six && seven && eight && nine) {
                resultDiv.html("Game Over !Please reset it");
                ticTacToe.off('click');
            }

            if (( !!one) && (one == two && two == three) || (one == four && four == seven) ||
                (one == five && five == nine)) {
                results = one;
            } else if (( !!three) && (three == six && six == nine) || (three == five && five == seven)) {
                results = three;
            } else if (( !!four) && four == five && five == six) {
                results = four;
            } else if (( !!seven) && seven == eight && eight == nine) {
                results = seven;
            } else if (( !!two) && two == five && five == eight) {
                results = two;
            }
            if (!!results) {
                resultDiv.html(results + ' Won The Game');
                ticTacToe.off('click');
            }
        });
    });
    resetBtn.trigger('click');

}(jQuery));
