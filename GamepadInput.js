var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BABYLON;
(function (BABYLON) {
    // We're mainly based on the logic defined into the FreeCamera code
    var GamepadInput = (function (_super) {
        __extends(GamepadInput, _super);
        function GamepadInput(name, position, scene) {
            var _this = this;
            _super.call(this, name, position, scene);
			this.fov = 0.1;
			this.rotation = new BABYLON.Vector3(1.57,0,0);
            this._gamepads = new BABYLON.Gamepads(function (gamepad) {
                _this._onNewGameConnected(gamepad);
            });
        }
        GamepadInput.prototype._onNewGameConnected = function (gamepad) {
            // Only the first gamepad can control the camera
            if (gamepad.index === 0) {
                this._gamepad = gamepad;
            }
        };
		
		function buttonPressed(b) {
			if (typeof(b) === "object") {
				return b.pressed;
			}
			return b === 1.0;
			
		}
		
        GamepadInput.prototype._checkInputs = function () {
		var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
            if (!this._gamepad) {
                return;
            }
		
			var gp2 = gamepads[0];
			//boutton X
			if (buttonPressed(gp2.buttons[2])) {
                shootOK = true;
                }
			if (!(buttonPressed(gp2.buttons[2]))) 
			{shootOK = false;}
			//boutton A
			if (buttonPressed(gp2.buttons[0])) {
                explodeaction = true;
                }
			//boutton RB
			if (buttonPressed(gp2.buttons[5])) {
                if (!playerShootPattern) {
					playerShootPattern = true;
					refreshBulletPlayer = 120;
					return;
				}
				else if (playerShootPattern) {
					playerShootPattern = false;
					refreshBulletPlayer = 240;
				}
			}
			//boutton start
			if (buttonPressed(gp2.buttons[9])) {
                if (!GamePause) {
					GamePause = true;
					g("screenpause").style.display ="block";
					g("pause").style.display ="block";
					//u.pause();
					return;
				}
				else if (GamePause) {
					GamePause = false;
					g("screenpause").style.display ="none";
					g("pause").style.display ="none";
					//u.restart();
					return;
				}
			}
			/*if (!(buttonPressed(gp2.buttons[0]))) 
			{explodeaction = false;}*/
			//Pad analog left
			if (buttonPressed(gp2.buttons[14])) {
                moveleft = true;
                }
			if (!(buttonPressed(gp2.buttons[14]))) 
			{moveleft = false;}	
			//Pad analog rigth
			if (buttonPressed(gp2.buttons[15])) {
                moveright = true;
                }
			if (!(buttonPressed(gp2.buttons[15]))) 
			{moveright = false;}			

        };

        GamepadInput.prototype.dispose = function () {
        };
        return GamepadInput;
    })(BABYLON.FreeCamera);
    BABYLON.GamepadInput = GamepadInput;
})(BABYLON || (BABYLON = {}));
//# sourceMappingURL=babylon.GamepadInput.js.map