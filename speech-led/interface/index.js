const numLeds = 47; // Real length of strip is 64 but for prototype, only 47 fit on screen.
const numStrips = 3;

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

// lightUpColumns();

const lightUpSingleColumn = () => {
  for(var x = 0; x < numStrips; x++){
    firstLedsIndexes.push(x * numLeds)
  }

  firstLedsIndexes.map((indexInLeds, indexInArray) => {
    allLeds[indexInLeds].classList.add('lightPink');
    if(indexInLeds < numLeds * numStrips){
      loopLightUpSingleColumn(indexInLeds + 1);
    } else {
      clearTimeout(loopTimeOut)
    }
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

lightUpSingleColumn()

function loopLightUpSingleColumn(indexes){

    loopTimeOut = setTimeout(function(){
      if(allLeds[indexes-1].classList.contains('lightPink')){
        console.log('boom')
        allLeds[indexes-1].classList.remove('lightPink')
      }
      allLeds[indexes].classList.add('lightPink');
      indexes++;
      loopLightUpSingleColumn(indexes);
    },50)
}

