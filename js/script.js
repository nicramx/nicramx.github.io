var currentPane = 0;
var currentPlayers = [];
var currentCharacters = [];
var time = 0;

function resetGame() {
    player1 = {
        name: "",
        character: "",
        level: 1,
        xp: 0,
        goals: 0
    };
    player2 = {
        name: "",
        character: "",
        level: 1,
        xp: 0,
        goals: 0
    };
    time = 0;
    getPlayers("reset");
}

var levelxp = {
    level1: 0,
    level2: 10,
    level3: 30,
    level4: 60,
    level5: 100,
    level6: 150
};

var xpNeeded = [0, 10, 20, 30, 40, 50];

var player1 = {
    name: "",
    character: "",
    level: 1,
    xp: 0,
    goals: 0
}

var player2 = {
    name: "",
    character: "",
    level: 1,
    xp: 0,
    goals: 0
}

var characters = {
    attacker: {
        character: "The Attacker",
        alias: "attacker",
        quote: "I will crush you!",
        portrait: "images/attacker.png",
        level1: {
            name: "Brute Force",
            description: "Instead of saves, The Attacker uses shots from the front line to level up. Each shot is 1xp",
            type: "passive",
            icon: "images/abilities/brute force.png"
        },
        level4: {
            name: "Blitzkrieg",
            description: "All goals add 3xp to your level progression. Retroactive.",
            type: "passive",
            icon: "images/abilities/blitzkrieg.png"
        },
        level5: {
            name: "Shot Caller",
            description: "Call your next shot going in. If it goes in you are awarded 2 goals, if it misses the opposing player places the ball at their front line.",
            type: "ability",
            cooldown: 18,
            icon: "images/abilities/shot caller.png"
        },
        level6: {
            name: "The Chosen One",
            description: "Choose a player on the field, any goal from that player counts as two goals.",
            type: "passive",
            icon: "images/abilities/the chosen one.png"
        },
    },
    enchantress: {
        character: "The Enchantress",
        alias: "enchantress",
        quote: "What an enchanting day for battle!",
        portrait: "images/enchantress.png",
        level1: {
            name: "Seducer",
            description: "All balls at throw in are placed at The Enchantress' middle line.",
            type: "passive",
            icon: "images/abilities/seducer.png"
        },
        level4: {
            name: "Polymorph",
            description: "The opposing player can't move their rod until they spin around twice, can only be activated if the ball is behind The Enchantress' front line.",
            type: "ability",
            cooldown: 12,
            icon: "images/abilities/polymorph.png"
        },
        level5: {
            name: "Time Warp",
            description: "Rewind back to throw in, can be activated any time before a shot.",
            type: "ability",
            cooldown: 18,
            icon: "images/abilities/time warp.png"
        },
        level6: {
            name: "The Forbidden One",
            description: "Choose a player on the field, that player can only shoot for now on, no passing or dragging. Can pass around the character.",
            type: "passive",
            icon: "images/abilities/the forbidden one.png"
        },
    },
    trickster: {
        character: "The Trickster",
        alias: "trickster",
        quote: "The joke's on you!",
        portrait: "images/trickster.png",
        level1: {
            name: "Finesse",
            description: "Gets an extra three seconds on the front line.",
            type: "passive",
            icon: "images/abilities/finesse.png"
        },
        level4: {
            name: "Slow and Steady",
            description: "Any slow shot that goes in counts as 2 and grants 5xp.",
            type: "ability",
            cooldown: 12,
            icon: "images/abilities/slow and steady.png"
        },
        level5: {
            name: "Double Trouble",
            description: "Add an extra ball to the field, it stays in until it goes into the net. If by some miracle it doesn't go in, can activate another one for triple the fun.",
            type: "ability",
            cooldown: 30,
            icon: "images/abilities/double trouble.png"
        },
        level6: {
            name: "Copycat",
            description: "Choose an ability from any character, you now have access to it for the rest of the game.",
            type: "passive",
            icon: "images/abilities/copycat.png"
        },
    },
    wall: {
        character: "The Wall",
        alias: "wall",
        quote: "Call me protector, call me death!",
        portrait: "images/wall.png",
        level1: {
            name: "Ironchad",
            description: "All balls saved by the goalie count as 2xp.",
            type: "passive",
            icon: "images/abilities/ironchad.png"
        },
        level4: {
            name: "Another Brick",
            description: "Extend the passive Ironchad to the 2 other defenders as well",
            type: "passive",
            icon: "images/abilities/another brick.png"
        },
        level5: {
            name: "It Takes Two",
            description: "Takes two goals from a distance to count as one.",
            type: "passive",
            icon: "images/abilities/it takes two.png"
        },
        level6: {
            name: "Second Wind",
            description: "The next goal scored on you is negated. Doesn't matter where the ball goes in from.",
            type: "ability",
            cooldown: 30,
            icon: "images/abilities/second wind.png"
        }
    }
};

var powerups = {
    midfreeze: {
        name: "Freeze the Lane",
        description: "The player that was just scored on sets their mid line feet up, and must not touch them.",
        duratiopn: 60
    },
    italian: {
        name: "Italian Style",
        description: "No passing or dragging around, only rifling.",
        duration: 60
    },
    reverse: {
        name: "Backwards Only",
        description: "Only the goalie and forwards are allowed to advance the ball, other bars need to pass/shoot backwards.",
        duration: 90
    },
    switchball: {
        name: "Ball Switch",
        description: "Change which ball is currently in use.",
        duration: 0
    }
}

function getPlayers(action) {
    var players = document.getElementsByClassName("player");
    for (var i = 0; i < players.length; i++) {
        if (players[i].checked) {
            currentPlayers.push(players[i].value);
            if (action === "reset")
                players[i].checked = false;
        }
    }

    if (action === "reset") {
        currentPlayers = [];
    }

    if (action === "check") {
        if (currentPlayers.length === 2)
            return true;
        else {
            getPlayers("reset");
            return alert("Please pick two.")
        };
    }
}

function firstPlayer() {
    var vs = document.getElementById("vs");
    vs.innerHTML = currentPlayers[0] + " vs " + currentPlayers[1];

    var x = rand(0, 1);

    if (x == 0) {
        player1["name"] = currentPlayers[0];
        player2["name"] = currentPlayers[1];
    }
    if (x == 1) {
        player1["name"] = currentPlayers[1];
        player2["name"] = currentPlayers[0];
    }
    var first = document.getElementById("first");
    first.innerHTML = currentPlayers[x] + " is first to select!";
}

function hideAllPanesBut(num) {
    var page = document.getElementsByClassName("pane");
    for (var i = 0; i < page.length; i++) {
        page[i].style.display = "none";
    }

    page[num].style.display = "block";
}

function showPane(num, num2) {
    switch (num) {
        case 0:
            resetGame();
            hideAllPanesBut(num);
            break;
        case 2:
            if (getPlayers("check")) {
                num = 2;
                firstPlayer()
            } else num = 1;
            hideAllPanesBut(num);
            break;
        case 3:
            if (num === 1 && num2 === 2)
                getPlayers("reset");
            hideAllPanesBut(num);
            break;
        case 4:
            if (charSelect())
                num = 4;
            else num = 3;
            hideAllPanesBut(num);
        case 5:
            abilityButtons();
            setupScore(0, 0);
            hideAllPanesBut(num);
        default:
            hideAllPanesBut(num);
            break;
    }
}

function randExclude(a, b, exc) {
    x = rand(a, b)
    if (x != exc) {
        return x;
    } else return randExclude(a, b, exc);
}

function diffChar(r) {
    var firstSet = document.getElementsByName("test");
    var secondSet = document.getElementsByName("test2");
    var firstChar;
    var indexFirst = -1;

    var num;
    if (r === "r1") {
        num = rand(0, 3);
        firstSet[num].checked = true;
    }

    for (var i = 0; i < firstSet.length; i++) {
        if (firstSet[i].checked) {
            firstChar = firstSet[i].value;
            indexFirst = i;
        }
    }

    if (r === "r2") {
        num = randExclude(0, 3, indexFirst);
        secondSet[num].checked = true;
    }

    for (var i = 0; i < secondSet.length; i++) {
        if (secondSet[i].value === firstChar) {
            secondSet[i].disabled = true;
            secondSet[i].parentElement.getElementsByTagName("img")[0].classList.add("greyscaled", "disable");
            secondSet[i].checked = false;
        } else {
            secondSet[i].parentElement.getElementsByTagName("img")[0].classList.remove("greyscaled", "disable");
            secondSet[i].disabled = false
        };
    }
    charSelect();

}

function charSelect() {
    var firstSet = document.getElementsByName("test");
    var secondSet = document.getElementsByName("test2");
    var firstChar = -1;
    var secondChar = -1;
    for (var i = 0; i < 4; i++) {
        if (firstSet[i].checked) {
            firstChar = firstSet[i].value;
        }
        if (secondSet[i].checked) {
            secondChar = secondSet[i].value
        }
    }

    if ((firstChar != -1) && (secondChar != -1)) {
        player1["character"] = firstChar;
        player2["character"] = secondChar;
        return true;
    } else {
        return false;
    }
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function abilityButtons() {
    var player1Div = document.querySelectorAll("#player1 div[class^=level]");
    var player2Div = document.querySelectorAll("#player2 div[class^=level]");

    var c1 = characters[player1["character"]];
    var c2 = characters[player2["character"]];
    var lvl = "";
    var moves = [1, 4, 5, 6];
    var click1 = "";
    var click2 = "";
    for (var i = 0; i < moves.length; i++) {
        lvl = "level" + moves[i];
        click1 = (c1[lvl]["type"] === "ability") ? "onclick=\"cooldown(this,'" + lvl + "','player1'," + c1[lvl]["cooldown"] + ");\"" : "onclick=\"cooldown(this,'" + lvl + "','player1',0);\"";
        click2 = (c2[lvl]["type"] === "ability") ? "onclick=\"cooldown(this,'" + lvl + "','player2'," + c2[lvl]["cooldown"] + ");\"" : "onclick=\"cooldown(this,'" + lvl + "','player2',0);\"";
        if (lvl != "level1") {
            player1Div[i].innerHTML = "<img class='greyscaled' alt='" + c1[lvl]["name"] + "' src='" + c1[lvl]["icon"] + "' " + click1 + ">";
            player2Div[i].innerHTML = "<img class='greyscaled' alt='" + c2[lvl]["name"] + "' src='" + c2[lvl]["icon"] + "' " + click2 + ">";
        } else {
            player1Div[i].innerHTML = "<img alt='" + c1[lvl]["name"] + "' src='" + c1[lvl]["icon"] + "' " + click1 + ">";
            player2Div[i].innerHTML = "<img alt='" + c2[lvl]["name"] + "' src='" + c2[lvl]["icon"] + "' " + click2 + ">";
        }
    }
}

function cooldown(img, lvl, p, cd) {
    if (eval(p)["level"] < parseInt(lvl[5]))
        return 0;
    if (cd > 0) {
        img.classList.add("greyscaled");
        const FULL_DASH_ARRAY = 283;
        const WARNING_THRESHOLD = 30;
        const ALERT_THRESHOLD = 10;

        const COLOR_CODES = {
            info: {
                color: "red"
            },
            warning: {
                color: "orange",
                threshold: WARNING_THRESHOLD
            },
            alert: {
                color: "green",
                threshold: ALERT_THRESHOLD
            }
        };

        const TIME_LIMIT = cd;
        let timePassed = 0;
        let timeLeft = TIME_LIMIT;
        let timerInterval = null;
        let remainingPathColor = COLOR_CODES.info.color;
        img.parentNode.innerHTML = `
        ${img.outerHTML}
        <div class="base-timer-${lvl}-${p}">
        <svg class="base-timer__svg-${lvl}-${p}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g class="base-timer__circle-${lvl}-${p}">
            <circle class="base-timer__path-elapsed-${lvl}-${p}" cx="50" cy="50" r="45"></circle>
            <path
                id="base-timer-path-remaining-${lvl}-${p}"
                stroke-dasharray="283"
                class="base-timer__path-remaining-${lvl}-${p} ${remainingPathColor}"
                d="
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
                "
            ></path>
            </g>
        </svg>
        <span id="base-timer-label-${lvl}-${p}" class="base-timer__label-${lvl}-${p}">${formatTime(
            timeLeft
        )}</span>
        </div>
        `;

        startTimer();

        function onTimesUp() {
            clearInterval(timerInterval);
            document.getElementsByClassName(`base-timer-${lvl}-${p}`)[0].style.display = "none";
            var x;
            switch (lvl) {
                case "level1":
                    x = 0;
                    break;
                case "level4":
                    x = 1
                    break;
                case "level5":
                    x = 2;
                    break;
                case "level6":
                    x = 3
                    break;
            }
            var y;
            if (p == "player1") {
                y = "#player1 div[class^=level] img"
            }
            if (p == "player2") {
                y = "#player2 div[class^=level] img"
            }
            var playerDiv = document.querySelectorAll(y);
            playerDiv[x].classList.remove("greyscaled");
            playSound("cooldown ready");
        }

        function startTimer() {
            timerInterval = setInterval(() => {
                timePassed = timePassed += 1;
                timeLeft = TIME_LIMIT - timePassed;
                document.getElementById(`base-timer-label-${lvl}-${p}`).innerHTML = formatTime(
                    timeLeft
                );
                setCircleDasharray();
                setRemainingPathColor(timeLeft);

                if (timeLeft === 0) {
                    onTimesUp();
                }
            }, 1000);
        }

        function formatTime(time) {
            const minutes = Math.floor(time / 60);
            let seconds = time % 60;

            if (seconds < 10) {
                seconds = `0${seconds}`;
            }

            return `${minutes}:${seconds}`;
        }

        function setRemainingPathColor(timeLeft) {
            const {
                alert,
                warning,
                info
            } = COLOR_CODES;
            if (timeLeft <= alert.threshold) {
                document
                    .getElementById(`base-timer-path-remaining-${lvl}-${p}`)
                    .classList.remove(warning.color);
                document
                    .getElementById(`base-timer-path-remaining-${lvl}-${p}`)
                    .classList.add(alert.color);
            } else if (timeLeft <= warning.threshold) {
                document
                    .getElementById(`base-timer-path-remaining-${lvl}-${p}`)
                    .classList.remove(info.color);
                document
                    .getElementById(`base-timer-path-remaining-${lvl}-${p}`)
                    .classList.add(warning.color);
            }
        }

        function calculateTimeFraction() {
            const rawTimeFraction = timeLeft / TIME_LIMIT;
            return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
        }

        function setCircleDasharray() {
            const circleDasharray = `${(
            calculateTimeFraction() * FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
            document
                .getElementById(`base-timer-path-remaining-${lvl}-${p}`)
                .setAttribute("stroke-dasharray", circleDasharray);
        }
    }
}

function addRule(stylesheetId, selector, rule) {
    var stylesheet = document.getElementById(stylesheetId);

    if (stylesheet) {
        stylesheet = stylesheet.sheet;

        if (stylesheet.addRule) {
            stylesheet.addRule(selector, rule);
        } else if (stylesheet.insertRule) {
            stylesheet.insertRule(selector + ' { ' + rule + ' }', stylesheet.cssRules.length);
        }
    }
}

function addXP(player, bar, xp) {
    var xpbar = document.querySelectorAll("#" + player + " " + ".xp-container .xp-bar")[0];
    var xpLevel = checkLevel(player, xp);
    var p = eval(player);

    xpbar.parentNode.innerHTML = xpLevel[1] + " / " + xpLevel[2] + "<div class=\"xp-bar " + bar.slice(1, 5) + " " + p["character"] + "\"></div>";

    addRule("myStyles", bar, "width: " + (xpLevel[1] / xpLevel[2]) * 100 + "%");
    var p1 = document.getElementById("p1Level");
    var p2 = document.getElementById("p2Level");
    p1.innerHTML = "Level " + player1["level"];
    p2.innerHTML = "Level " + player2["level"];
}

function checkLevel(player, xp) {
    var xpReq;
    var playerDiv = document.querySelectorAll("#" + player + " div[class^=level]");
    var p = eval(player);
    if (xp > 0 || xp < 0) {
        if (p["level"] === 1) {
            xpReq = xpNeeded[1];
            if (xp === 1 && p["xp"] === (xpReq - 1)) {
                p["level"] = 2;
                p["xp"] = 0;
                xpReq = xpNeeded[2];
            } else p["xp"] += 1;
            return [p["level"], p["xp"], xpReq];
        }
        if (p["level"] === 2) {
            xpReq = xpNeeded[2];
            if (xp === 1 && p["xp"] === (xpReq - 1)) {
                p["level"] = 3;
                p["xp"] = 0;
                xpReq = xpNeeded[3];
            } else p["xp"] += 1;
            return [p["level"], p["xp"], xpReq];
        }
        if (p["level"] === 3) {
            xpReq = xpNeeded[3];
            if (xp === 1 && p["xp"] === (xpReq - 1)) {
                p["level"] = 4;
                p["xp"] = 0;
                xpReq = xpNeeded[4];
                playerDiv[1].childNodes[0].classList.remove("greyscaled");
            } else p["xp"] += 1;
            return [p["level"], p["xp"], xpReq];
        }
        if (p["level"] === 4) {
            xpReq = xpNeeded[4];
            if (xp === 1 && p["xp"] === (xpReq - 1)) {
                p["level"] = 5;
                p["xp"] = 0;
                xpReq = xpNeeded[5];
                playerDiv[2].childNodes[0].classList.remove("greyscaled");
            } else p["xp"] += 1;
            return [p["level"], p["xp"], xpReq];
        }
        if (p["level"] === 5) {
            xpReq = xpNeeded[5];
            if (xp === 1 && p["xp"] === (xpReq - 1)) {
                p["level"] = 6;
                p["xp"] = 0;
                xpReq = xpNeeded[0];
                playerDiv[3].childNodes[0].classList.remove("greyscaled");
            } else p["xp"] += 1;
            return [p["level"], p["xp"], xpReq];
        }
    }
}

function playSound(sound) {
    var audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}

function setupScore(goal1, goal2) {
    var p1 = document.getElementById("p1Goals");
    var p2 = document.getElementById("p2Goals");
    p1.classList.add(player1["character"]);
    p2.classList.add(player2["character"]);
    player1["goals"] += goal1;
    player2["goals"] += goal2;
    p1.innerHTML = player1["goals"];
    p2.innerHTML = player2["goals"];
    if(goal1 || goal2 == 1)
        playSound("goal horn");
}