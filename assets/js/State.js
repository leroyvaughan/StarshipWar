var StarshipWar = StarshipWar || {};

StarshipWar.State = function (_shipType) {
    var Starship = _shipType;
    var _currentHealth = Starship.health;
    var _currentState = Starship.img.shielded;
    var _shipStatus = "Shielded";
    var _destroyed = false;

    this.shipType = Starship.type;
    this.elem = "#" + Starship.type;
    this.addShip = Starship.addObject;
    this.getHealth = function () { return _currentHealth; };
    this.getImg = function () { return _currentState; };
    this.getStatus = function () { return _shipStatus; };
    this.isDestroyed = function () { return _destroyed; };


    var stateChangeCheck = function () {
        if (_currentHealth < 1) {
            _currentState = Starship.img.destruction;
            _shipStatus = "Destroyed...";
            _destroyed = true;
            return true;
        }
        else if (_currentHealth < 51) {
            _currentState = Starship.img.unshielded;
            _shipStatus = "UnShielded";
            return true;
        }
        else {//return false if img need not change
            return false;
        }
    }
    this.CalculateDamage = function (dmg) {
        _currentHealth = _currentHealth - dmg;
        return stateChangeCheck(_currentHealth);
    };

    return this;
}