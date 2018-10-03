/**
 * Created by bimathew on 10/29/2014.
 */ (function ($) {
    //create tic tac toe

    $('body').append(
        '<div id="results"></div>' +
        '<input id="resetBtn" type="button" value="reset" /> </br>' +
        '<div id="player">Single Player<input id="singleBtn" type="checkbox" value="SinglePlayer" /></div>' +
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
        playerDiv = $('#player'),
        player = $('#singleBtn'),
        ticTacToeChildDiv = ticTacToe.children(),
        singlePlayerMode = false,
        areEqual = function () {
            var len = arguments.length;
            for (var i = 1; i < len; i++) {
                if (arguments[i] === null || arguments[i] !== arguments[i - 1])
                    return false;
            }
            return true;
        };
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
            "height": "50px",
            "width": "600px",
            "font-size": "40px"
        },
        button = {
            "background-color": "#4CAF50",
            "border": "none",
            "color": "white",
            "padding": "15px 32px",
            "text-align": "center",
            "text-decoration": "none",
            "display": "inline-block",
            "font-size": "16px",
            "margin": "4px 2px",
            "cursor": "pointer"
        };
    ticTacToe.css(ticTacToeStyle);
    resultDiv.css(resultDivStyle);
    ticTacToeChildDiv.css(ticTacToeChildStyle);
    playerDiv.css(resultDivStyle);
    player.css(resultDivStyle);
    resetBtn.css(button);

    player.on("click", function () {
        resetBtn.trigger('click');
        singlePlayerMode = $(this).is(':checked')
    });

    resetBtn.on('click', function () {
        firstPlayer = "X";
        secondPlayer = "0";
        displayValue = secondPlayer;
        ticTacToeChildDiv.html('');
        resultDiv.html('')
        ticTacToe.on('click', function (e) {
            var selectedElement = $(e.target),
                non_empty = 0,
                nonSelected = [];

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

            ticTacToeChildDiv.each(function () {
                var ele = $(this);
                if (!ele.is(':empty')) {
                    non_empty++;
                } else {
                    nonSelected.push(ele)
                }
            });
            if (non_empty == 9) {
                resultDiv.html("Game Over !Please reset it");
                ticTacToe.off('click');
            }

            if (areEqual(one, two, three) || areEqual(one, four, seven) || areEqual(one, five, nine)) {
                results = one;
            }
            else if (areEqual(three, six, nine) || areEqual(three, five, seven)) {
                results = three;
            } else if (areEqual(four, five, six)) {
                results = four;
            } else if (areEqual(seven, eight, nine)) {
                results = seven;
            } else if (areEqual(two, five, eight)) {
                results = two;
            }
            if (results) {
                resultDiv.html(results + ' Won The Game');
                ticTacToe.off('click');
            }

            if (singlePlayerMode && displayValue == firstPlayer && nonSelected.length) {
                var autoPlayer = nonSelected[Math.floor(Math.random() * nonSelected.length)];
                autoPlayer.trigger('click')
            }
        });
    });
    resetBtn.trigger('click');

}(jQuery));
