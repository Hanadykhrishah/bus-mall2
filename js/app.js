'use strict';

function randomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

const imageSection = document.getElementById( 'imageSection' );
const leftImage = document.getElementById( 'leftImage' );
const middleImage = document.getElementById( 'middleImage' );
const rightImage = document.getElementById( 'rightImage' );
const viewResult = document.getElementById( 'viewResult' );
const listOfResult = document.getElementById( 'listOfResult' );

let rounds = 25;
let counter = 0;

let leftIndex;
let middleIndex;
let rightIndex;

let arr = [];

let imgArray = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg'

];


function Images( name, src , vote = 0, clicks = 0 ) {
  this.name = name;
  this.path = `./img/${src}`;
  this.views = vote;
  this.clicks = clicks;
  all.push( this );
}

let all = [];

for ( let i = 0; i < imgArray.length; i++ ) {

  new Images( imgArray[i].split( '.' )[0], imgArray[i] );
}

function render() {


  do {
    leftIndex = randomNumber( 0, imgArray.length - 1 );
    middleIndex = randomNumber( 0, imgArray.length - 1 );
    rightIndex = randomNumber( 0, imgArray.length - 1 );
  } while ( leftIndex === rightIndex || leftIndex === middleIndex || rightIndex === middleIndex || arr.includes( leftIndex ) || arr.includes( middleIndex ) || arr.includes( rightIndex ) );

  console.log( arr.includes( leftIndex ), arr.includes( middleIndex ), arr.includes( rightIndex ) );

  arr = [];

  arr.push( leftIndex, middleIndex, rightIndex );
  console.log( arr );
  rightImage.src = all[rightIndex].path;
  leftImage.src = all[leftIndex].path;
  middleImage.src = all[middleIndex].path;


  all[rightIndex].views++;
  all[leftIndex].views++;
  all[middleIndex].views++;


  console.log( all );
}



function eventHandler( e ) {

  if ( ( e.target.id === 'rightImage' || e.target.id === 'leftImage' || e.target.id === 'middleImage' ) && counter < rounds ) {

    if ( e.target.id === 'rightImage' ) {
      all[rightIndex].clicks++;

    }
    if ( e.target.id === 'leftImage' ) {
      all[leftIndex].clicks++;
    }
    if ( e.target.id === 'middleImage' ) {
      all[middleIndex].clicks++;
      console.log( all );
    }
    render();
    counter++;

  } else if ( counter >= rounds ) {
    drowChart();
  }
  localStorage.setItem( 'data' , JSON.stringify( Images.all ) );
}

function printResult( e ) {
  for ( let i = 0; i < all.length; i++ ) {
    let li = document.createElement( 'li' );
    listOfResult.appendChild( li );
    li.textContent = `${all[i].name} had ${all[i].clicks} votes, and was seen ${all[i].views} times.`;

  }
  viewResult.removeEventListener( 'click', printResult );
}

imageSection.addEventListener( 'click', eventHandler );
viewResult.addEventListener( 'click', printResult );


render();

function drowChart() {
  let name = [];
  let clicks = [];
  let views = [];
  for ( let i = 0; i < all.length; i++ ) {
    name.push( all[i].name );
    views.push( all[i].views );
    clicks.push( all[i].clicks );

  }
  let ctx = document.getElementById( 'myChart' ).getContext( '2d' );
  let myChart = new Chart( ctx, {
    type: 'bar',
    data: {
      labels: name,
      datasets: [{
        label: ' # of clicks',
        data: clicks,
        backgroundColor: [
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 5


      }, {
        label: ' # of views',
        data: views,
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 5

      }]

    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  } );

  myChart.datasets;
}

function checkStorage() {

  let data = JSON.parse( localStorage.getItem( 'data' ) );
  if ( data ) {
    Images.all = [];
    for ( let i = 0 ; i < data.lenght; i++ ){

      new Images ( data[i].name, data[i].path, data[i].views,data[i].clicks );
    }


  }



}
checkStorage();
render();
