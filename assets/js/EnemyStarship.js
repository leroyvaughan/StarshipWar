var StarshipWar = StarshipWar || {};

StarshipWar.EnemyStarship = function (_typeOfShip, utils, _scoreBoard) {
    var baseUrl = 'assets/img/';

    var shipDetails = {
        "scout": {
            "type": 'scout',
            health: 75,
            "img": {
                "shielded": 'shieldedScout.png',
                "unshielded": 'scout.png',
                "destruction": 'destruction2.gif'
            },
            addObject: function(dElem){ dElem.removeClass('faded').addClass('scoutAnim'); }
        },
        "ghost": {
            "type": 'ghost',
            health: 150,
            "img": {
                "shielded": 'shieldedGhost.png',
                "unshielded": 'ghost.png',
                "destruction": 'destruction.gif'
            },
            addObject: function(dElem){ dElem.removeClass('faded').addClass('ghostAnim'); }
        },
        "cloak": {
            "type": 'cloak',
            health: 100,
            "img": {
                "shielded": 'shieldedCloak.png',
                "unshielded": 'cloak.png',
                "destruction": 'destruction2.gif'
            },
            addObject: function(dElem){ dElem.addClass('cloakAnim'); }
        }
    }

    var CurrentShip = new StarshipWar.State(shipDetails[_typeOfShip]);
    var DisplayObject = $(CurrentShip.elem);


    var TakeDamage = function () {
        if (utils.isClearToFire()) {
            var stateHasChanged = CurrentShip.CalculateDamage(utils.getDamageAmount());
            _scoreBoard.updateHealth(CurrentShip.getHealth());
            _scoreBoard.setStatus(CurrentShip.getStatus());

            if (stateHasChanged) {
                //this means the ship health determines an img change:  unshielded or destroyed
                setShipImg(CurrentShip.getImg());
                if (CurrentShip.isDestroyed()) {
                    DisplayObject.addClass("destructAnim");
                    _scoreBoard.decrementEnemies();
                    _scoreBoard.updateHealth(0);

                }
            }
        }
    };


    var setShipImg = function (curImg) {
        var imgUrl = 'url(' + baseUrl + curImg + ')';
        DisplayObject.css('background-image', imgUrl);
    }

    //click on ship to fire weapon on it
    $(CurrentShip.elem + " .hitArea").click(function () {
        TakeDamage();
    });

    //public properties
    this.ShipState = CurrentShip.getStatus();
    this.ShipHealth = CurrentShip.getHealth();
    this.ShipImg = CurrentShip.getImg();
    this.ShipElem = DisplayObject;

    //initialize!
    (function () {
        CurrentShip.addShip(DisplayObject);
        setShipImg(CurrentShip.getImg());

        _scoreBoard.setCurrentShip(CurrentShip.shipType);
        _scoreBoard.updateHealth(CurrentShip.getHealth());
    })();
};