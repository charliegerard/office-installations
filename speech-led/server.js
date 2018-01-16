const Sonus = require('sonus');
const request = require('request');


const record = require('node-record-lpcm16');

// // Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

// // Creates a client
// const client = new speech.SpeechClient();

// /**
//  * TODO(developer): Uncomment the following lines before running the sample.
//  */
// const encoding = 'LINEAR16';
// const sampleRateHertz = 16000;
// const languageCode = 'en-US';

// const request = {
//   config: {
//     encoding: encoding,
//     sampleRateHertz: sampleRateHertz,
//     languageCode: languageCode,
//   },
//   interimResults: false, // If you want interim results, set this to true
// };

// // Create a recognize stream
// const recognizeStream = client
//   .streamingRecognize(request)
//   .on('error', console.error)
//   .on('data', data =>
//     process.stdout.write(
//       data.results[0] && data.results[0].alternatives[0]
//         ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
//         : `\n\nReached transcription time limit, press Ctrl+C\n`
//     )
//   );

// // Start recording and send the microphone input to the Speech API
// record
//   .start({
//     sampleRateHertz: sampleRateHertz,
//     threshold: 0,
//     // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
//     verbose: false,
//     recordProgram: 'rec', // Try also "arecord" or "sox"
//     silence: '10.0',
//   })
//   .on('error', console.error)
//   .pipe(recognizeStream);

// console.log('Listening, press Ctrl+C to stop.');


// Johnny-five part to test LED strip

var pixel = require("node-pixel");
var five = require("johnny-five");

var board = new five.Board({port: '/dev/tty.usbmodem14611'});
var strip = null;

board.on("ready", function() {

    strip = new pixel.Strip({
        board: this,
        controller: "FIRMATA",
        strips: [ {pin: 2, length: 60}, ], // this is preferred form for definition
        gamma: 2.8, // set to a gamma that works nicely for WS2812
    });

    strip.on("ready", function() {
        // do stuff with the strip here.
      strip.color("rgb(0, 255, 0)"); // sets strip to green using rgb values
      strip.show();
    });
});

// var five = require("johnny-five");
// var board = new five.Board({port: '/dev/tty.usbmodem14611'});

// board.on("ready", function() {
//   var led = new five.Led(13);

//   console.log("connected to board and readty")
//   // This will grant access to the led instance
//   // from within the REPL that's created when
//   // running this program.
//   // this.repl.inject({
//   //   led: led
//   // });

//   led.blink();
// });
