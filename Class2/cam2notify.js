require('dotenv').config();
const libcamera = require("node-libcamera");
const axios = require("axios");
const fs = require("fs");

let FormData = require("form-data");

const token = process.env.LINE_TOKEN;

//Start to snap a photo...
libcamera.still({
        output: 'img/test_2.jpg',
        timeout: 2000,
        width: 640,
        height: 480
})
        .then((result) => {
                // Start to take a photo and save .
                console.log(result);

                // Alert to Line Notify.
                noti();
        })
        .catch((error) => {
                console.log(error);
        });

const noti = () => {
        let form_data = new FormData();
        form_data.append("message",  "Here's the photo.");
        form_data.append("imageFile", fs.createReadStream('img/test_2.jpg'));

        let headers = Object.assign({
                'Authorization': `Bearer ${token}` //Write in your Line Notify Token when you got
        }, form_data.getHeaders());

        // upload photo to Line Notify by Line API
        axios({
                method: 'post',
                url: "https://notify-api.line.me/api/notify",
                data: form_data,
                headers: headers
        })
                .then((response) => {
                        console.log("HTTP StateCode:" + response.status);
                        console.log(response.data);
                })
                .catch((error) => {
                        console.error("Failed to send a line notification");
                        if (error.response) {
                                console.error("HTTP StatusCode:" + error.response.status);
                                console.error(error.response.data);
                        } else {
                                console.error(error);
                        }
                });
};
