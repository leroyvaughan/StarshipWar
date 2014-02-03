var StarshipWar = StarshipWar || {};

StarshipWar.Scout = "";
StarshipWar.Ghost = "";
StarshipWar.Cloak = "";



StarshipWar.Utils = function () {
    //private vars
    var _curWeapon = "";
    var _curDamage = 0;
    var _wHdr = $("#chooseWeapon");
    var _blinker = "chooseUrWeapon";
    var numOfStarships = 0;

    var showGameOverDisplay = function () {
        

    };

    //public setter/getter(s)
    this.setCurrentWeapon = function (curWeapon) {
        _curWeapon = curWeapon;
    };
    this.getCurrentWeapon = function () {
        return _curWeapon;
    };

    this.setDamageAmount = function (curDamage) {
        _curDamage = curDamage;
        _wHdr.removeClass(_blinker);
    }
    this.getDamageAmount = function () {
        return _curDamage;
    };

    //other public methods
    this.isClearToFire = function () {
        return (_curDamage > 0)? true : false;
    };

    this.flashWeaponsHdr = function () {
        if (!_wHdr.hasClass(_blinker)) {
            _wHdr.addClass(_blinker)
        }
    }

    this.incrementStarships = function () {
        numOfStarships++;
    };

    this.decrementStarships = function () {
        if (numOfStarships > 0) {
            numOfStarships--;
        }
        if(numOfStarships === 0) {
            //probably want to create an observer class??
            //this code below should be a call t0 showGameOverDisplay(); ??
            setTimeout(function () {
                $("#playerNotice").show();
                $("#gameDetails").html("You Win. Game Over...");
                $("#gameBtn").html("reset").click(function () {
                    document.location.reload();
                });
            }, 1500);
        }
    };

    this.getNumOfStarships = function () {
        return numOfStarships;
    };

    return this;
};

StarshipWar.main = function () {
    var UtilityObj = new StarshipWar.Utils();
    StarshipWar.Scout = new StarshipWar.EnemyStarship('scout', UtilityObj, new StarshipWar.Display());
    StarshipWar.Ghost = new StarshipWar.EnemyStarship('ghost', UtilityObj, new StarshipWar.Display());
    StarshipWar.Cloak = new StarshipWar.EnemyStarship('cloak', UtilityObj, new StarshipWar.Display());

    var PlayerConsole = function () {
        var utils = UtilityObj;
        var baseUrl = 'assets/img/';
        var rocketBtn = $("#rocketBtn");
        var laserBtn = $("#laserBtn");

        //initial game details
        $("#gameDetails").show();
        var gameBtn = "<div id='gameBtn'>Start Game</div>";
        $("#playerNotice #main").html(gameBtn);

        $("#gameBtn").click(function () {
            $("#targetNotice").show();
            $("#playerNotice").hide();
            $("#shipDiv").css("visibility", 'visible');
            utils.flashWeaponsHdr();

            rocketBtn.click(function () {
                utils.setDamageAmount(50);
                utils.setCurrentWeapon('rocket');
                resetBtns();
                $(this).css('background-image', 'url(' + baseUrl + 'rocketBtnGlow.png)');
                $(this).next().css('color', '#fff');
            });

            laserBtn.click(function () {
                utils.setDamageAmount(25);
                utils.setCurrentWeapon('laser');
                resetBtns();
                $(this).css('background-image', 'url(' + baseUrl + 'laserBtnGlow.png)');
                $(this).next().css('color', '#fff');
            });
        });

        var resetBtns = function () {
            rocketBtn.css('background-image', 'url(' + baseUrl + 'rocketBtn.png)');
            laserBtn.css('background-image', 'url(' + baseUrl + 'laserBtn.png)');
            $(".btns div").css('color', '#777');
            $("#targetNotice").hide();
        };


        var turret = $("#playerTurret");
        var turretBoundsDiv = $("#turretBounds");
        var docWidth, turretBoundsWidth, boundsPadding, rtBound;
        var midPt, turretPos, xFlip;

        $(document).bind('mousemove', function (e) {
            docWidth = $(document).width();
            turretBoundsWidth = turretBoundsDiv.width();
            boundsPadding = turretBoundsWidth * .1;
            midPt = turretBoundsWidth / 2;
            turretPos = e.pageX - 75;
            xFlip = 1;

            //flip image left/right
            if (turretPos > midPt) {
                xFlip = -1;
            }
        
            //keep turret in containing div w/ bounds limits
            rtBound = turretBoundsWidth - (boundsPadding + 75)
            if (turretPos > rtBound) {
                turretPos = rtBound;
            }
            else if (turretPos < boundsPadding) { turretPos = boundsPadding; }
        
            turret.css({
                left: turretPos,
                "-webkit-transform": 'scaleX(' + xFlip + ')' ,
                "-moz-transform": 'scaleX(' + xFlip + ')',
                "transform": 'scaleX(' + xFlip + ')'
            });
        });
    }();

    StarshipWar.setUI();
};


StarshipWar.Display = function () {
    var _curShip, _healthElem, _statusElem;

    this.setCurrentShip = function(shipName){
        _curShip = "#" + shipName + "Pnl";
        _healthElem = $(_curShip + " .health");
        _statusElem = $(_curShip + " .status");
    };

    this.updateHealth = function (_health) {
        _healthElem.html(_health).removeClass("dmgHealthAnim");

        setTimeout(function () {
            _healthElem.addClass("dmgHealthAnim");
        }, 200);

        if (_health === 0) {
        _healthElem.css("color", "red");
        }
    }

    this.setStatus = function (_status) {
        var txtColor = "#ff0";
        var txt = _status.toLowerCase();

        if (txt === "destroyed...") {
            txtColor = "red";
        }
        else if (txt === "unshielded") {
            txtColor = "orange";
        }
        _statusElem.html(_status).css("color", txtColor);
    };

    this.decrementEnemies = function () {
        curElem = $("#enemies")
        var enemiesLeft = parseInt(curElem.html());
        curElem.html(enemiesLeft - 1);
    }
}


StarshipWar.setUI = function(pConsole){
    var elem1 = $("#turretBounds");
    var elem2 = $("#playerConsole");
    var bPos = (elem1.width() === elem2.width()) ? '10px' : '';

    $("#playerTurret").css("bottom", bPos);

    elem1 = null; elem2 = null; bPos = null;
};



$(function(){
    //run the app
    StarshipWar.main();

    $(window).resize(function () {
        StarshipWar.setUI();
    });
});







//http://www.dofactory.com/javascript-state-pattern.aspx