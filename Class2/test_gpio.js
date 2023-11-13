const gpio = require("onoff").Gpio;

let LED = new gpio('4', 'out');

const blinkLED = () => {
	if (LED.readSync() == 0) {
		LED.writeSync(1);
	} else {
		LED.writeSync(0);
	}
};

const endBlink = () => {
	clearInterval(blinkTime);
	LED.writeSync(0);
	LED.unexport();
};

let blinkTime = setInterval(blinkLED, 250);

setTimeout(endBlink, 10000);
