/**
 * Created by bimathew on 11/01/2019.

 */

$(function ($) {
    //create tic tac toe

    $('body').append(
        '<fieldset id="settings">' +
        ' <legend>Settings:</legend>' +
        '<div style="text-align: center;"><div id="results"></div></div>' +
        '<select id="select_mode">' +
        '<option value="1">Multi Player</option>' +
        '<option value="2">Single Player Simple</option>' +
        '<option value="3">Single Player Hard</option>' +
        '</select> </br>' +
        '<input id="resetBtn" type="button" value="reset" />' +
        '</fieldset></br></br>' +
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
        '</div>'
    );

    var ticTacToe = $("#tictac"),
        resetBtn = $("#resetBtn"),
        resultDiv = $('#results'),
        settings = $('#settings'),
        player = $('#select_mode'),
        ticTacToeChildDiv = ticTacToe.children(),
        nonSelected,
        ticTacToeStyle = {
            "width": "450px",
            "border": "1px solid black",
            "overflow": "hidden",
            "height": "450px",
            "margin": "0 auto"
        },
        ticTacToeChildStyle = {
            "width": "148px",
            "border": "1px solid green",
            "float": "left",
            "height": "150",
            "font-size": "150px",
            "text-align": "center"
        },
        resultDivStyle = {
            "font-size": "20px"
        },
        resetButton = {
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
        },
        singlePlayerMode = false,
        toughMode = false,
        randomProperty = function (obj) {
            var keys = Object.keys(obj);
            return obj[keys[Math.floor(Math.random() * keys.length)]];
        };
    ticTacToe.css(ticTacToeStyle);
    resultDiv.css(resultDivStyle);
    ticTacToeChildDiv.css(ticTacToeChildStyle);
    resetBtn.css(resetButton);
    settings.css(resultDivStyle);
    player.on("change", function () {
        switch ($(this).val()) {
            case "2":
                singlePlayerMode = true;
                toughMode = false;
                break;
            case "3":
                singlePlayerMode = true;
                toughMode = true;
                break;
            default :
                singlePlayerMode = false;
                toughMode = false;
        }
        resetBtn.trigger('click');
    });

    resetBtn.on('click', function () {
        var firstPlayer,
            secondPlayer,
            results,
            bestPosIds,
            displayValue;
        firstPlayer = "X";
        secondPlayer = "O";
        displayValue = secondPlayer;
        ticTacToeChildDiv.html('').css("background-color", "");
        resultDiv.html(firstPlayer + ' Turn');
        nonSelected = {};
        ticTacToe.off('click');
        bestPosIds = ['#five', '#one', '#three', '#seven', '#nine'];
        ticTacToeChildDiv.each(function () {
            var ele = $(this);
            nonSelected[ele.attr('id')] = ele;
        });
        ticTacToe.on('click', function (e) {
            var selectedElement = $(e.target);
            if (!selectedElement.html()) {
                resultDiv.html(displayValue + ' Turn');
                displayValue = displayValue == secondPlayer ? firstPlayer : secondPlayer;
                selectedElement.html(displayValue);


            } else {
                return false
            }

            var winnerPositions =
            {
                "#one,#two,#three": null,
                "#one,#four,#seven": null,
                "#three,#six,#nine": null,
                "#three,#five,#seven": null,
                "#seven,#eight,#nine": null,
                "#four,#five,#six": null,
                "#two, #five,#eight": null,
                "#one,#five,#nine": null
            };

            $.each(nonSelected, function (key, obj) {
                if (!obj.is(':empty')) {
                    delete nonSelected[key];
                    return false;
                }
            });

            var isAllSelected = $.isEmptyObject(nonSelected);

            if (isAllSelected) {
                resultDiv.html("Game Over !Please reset it");
                ticTacToe.off('click');
            }

            $.each(winnerPositions, function (key) {
                var selectors = $(key);
                winnerPositions[key] = $.map($(selectors), function (val) {
                    return $(val).html()
                });

                var cmp = winnerPositions[key][0] || false;
                var won = winnerPositions[key].every(function (selected) {
                    return cmp === selected;
                });
                if (won) {
                    results = cmp;
                    selectors.css("background-color", "red");
                    return false;
                }
            });

            if (results) {
                resultDiv.html(results + ' Won The Game');
                ticTacToe.off('click');
            }

            if (!results && singlePlayerMode && displayValue == firstPlayer && !isAllSelected) {
                var autoPlayer = randomProperty(nonSelected),
                    bestKey;
                if (toughMode) {
                    $.each(winnerPositions, function (key, value) {
                        $.each(bestPosIds, function (index, id) {
                            id = $(id);
                            if (!id.html()) {
                                bestKey = id;
                                return false
                            }
                        });
                        var move = winnerPositions[key];
                        var selected = move.every(function (x_or_0) {
                            return x_or_0 === '';
                        });
                        var allSelected = move.every(function (x_or_0) {
                            return x_or_0 !== '';
                        });
                        if (!allSelected) {
                            var firstMove = move[0],
                                secondMove = move[1],
                                thirdMove = move[2],
                                keys = key.split(",");
                            if (firstMove && firstMove == secondMove) {
                                autoPlayer = $(keys[2]);
                                return false
                            } else if (secondMove && secondMove == thirdMove) {
                                autoPlayer = $(keys[0]);
                                return false
                            } else if (thirdMove && thirdMove == firstMove) {
                                autoPlayer = $(keys[1]);
                                return false
                            }
                            else if (firstMove && secondMove) {
                                autoPlayer = $(keys[2]);

                            } else if (secondMove && thirdMove) {
                                autoPlayer = $(keys[0]);

                            } else if (secondMove && thirdMove) {
                                autoPlayer = $(keys[1]);

                            } else if (firstMove) {
                                autoPlayer = bestKey || $(keys[1]);

                            } else if (secondMove) {
                                autoPlayer = bestKey || $(keys[2]);
                            } else if (thirdMove) {
                                autoPlayer = bestKey || $(keys[3]);
                            }

                        }
                    });
                }
                autoPlayer.trigger('click');

            }
        });
    });
    resetBtn.trigger('click');

});
