const numLeds = 47; // Real length of strip is 64 but for prototype, only 47 fit on screen.
const numStrips = 10;

var loopTimeOut;

for(var i = 0; i < numStrips * numLeds; i++){
  var led = document.createElement('div');
  led.classList.add('led');
  led.setAttribute('id', i);
  led.innerHTML = i;
  document.body.appendChild(led);
}

const firstLedsIndexes = [];
const allLeds = document.getElementsByClassName('led');

const lightUpColumns = () => {
  for(var x = 0; x < numStrips; x++){
    firstLedsIndexes.push(x * numLeds)
  }

  firstLedsIndexes.map((indexInLeds, indexInArray) => {
    allLeds[indexInLeds].classList.add('lightPink');
    loopLightUpColumns(indexInLeds + 1);
  })
}

function loopLightUpColumns (index) {
  if(index < numLeds * 3){
    setTimeout(function(){
      allLeds[index].classList.add('lightPink');
      index++;
      loopLightUpColumns(index);
    },50)
  }
}

// lightUpColumns();

const lightUpSingleColumn = () => {
  for(var x = 0; x < numStrips; x++){
    firstLedsIndexes.push(x * numLeds)
  }

  loopLightUpSingleColumn(firstLedsIndexes);
}

// lightUpSingleColumn()

let rowCompleted = false;

function loopLightUpSingleColumn(indexes){
  var newIndexes = [];
  loopTimeOut = setTimeout(function(){
    if(!rowCompleted){
      indexes.map(index => {
          if(index - 1 >= 0 && !newIndexes.includes(index) && allLeds[index - 1].classList.contains('lightPink')){
            allLeds[index-1].classList.remove('lightPink');
          }
          allLeds[index].classList.add('lightPink');
          index++;
          newIndexes.push(index);
          if(newIndexes.includes(numLeds)){
            rowCompleted = true;
            turnOffAllLeds(newIndexes, loopTimeOut);
          }
      })
      loopLightUpSingleColumn(newIndexes);
    }
  },300)
}

function turnOffAllLeds(indexes, timeOutFunctionName){
  indexes.forEach(index => {
    if(allLeds[index-1] && allLeds[index-1].classList.contains('lightPink')){
      allLeds[index-1].classList.remove('lightPink');
    }
  })
  clearTimeout(timeOutFunctionName);
}

var letterAAray = [2,48,50,94,98,141,145,188,192,235,236,237,238,239,282,286,329,333,376,380,423,427];
var letterBArray = [0,1,2,47,50,94,97,141,144,188,189,190,235,236,237,282,285,329,332,376,379,423,424,425];

const letters = {
  'a': letterAAray,
  'b': letterBArray
}

function showLetter(letterArray){
  loopLightUpSingleColumn(letterArray)
}

showLetter(letterAAray);
