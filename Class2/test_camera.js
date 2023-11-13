const libcamera = require("node-libcamera");

libcamera.still({
	output: 'img/test_2.jpg',
	timeout: 2000,
	width: 640,
	height: 480
})
	.then((result) => {console.log("success");})
	.catch((error) => {console.log(error);})
