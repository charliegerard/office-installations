'use strict'

// To change before running the program
// const ROOT_DIR = '/Users/<your username>/Desktop/'
const Sonus = require('sonus')
var request = require('request')
const speech = require('@google-cloud/speech')

const client = new speech.SpeechClient({
  projectId: 'LED-speech-test',
  keyFilename: ROOT_DIR + 'keyfile.json'
})

const hotwords = [{ file: './resources/Hey.pmdl', hotword: 'hey' }]
const language = "en-US"

//recordProgram can also be 'arecord' which works much better on the Pi and low power devices
const sonus = Sonus.init({ hotwords, language, recordProgram: "rec" }, client)

Sonus.start(sonus)
console.log('Say Hey...')

sonus.on('hotword', (index, keyword) => {
  console.log('💡' + keyword)
})

sonus.on('silence', () => {
    console.log('silence')
})

sonus.on('partial-result', result => console.log("Partial", result))

sonus.on('error', error => console.log('error', error))

sonus.on('final-result', result => {
  console.log("Final", result)
  if (result.includes("stop")) {
    Sonus.stop()
  }
})
