'use strict';

function getRandom( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

const imageSection = document.getElementById( 'imageSection' );
const leftImage = document.getElementById( 'leftImage' );
const midImage = document.getElementById( 'midImage' );
const rightImage = document.getElementById( 'rightImage' );
const viewResult = document.getElementById( 'viewResult' );
const listOfResults = document.getElementById( 'listOf Results' );

let round = 25;
let counter = 0;

let leftIndex;
let midIndex ;
let rightIndex ;

let imgArray = [
  'bag.jpg',
  'banana.jpg',
  'boots.jpg',
  'bathroom.jpg',
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
  'wine-glass.jpg'];

function Images ( name , src ) {
  this.name = name;
  this.path = `./img/${src}`;
  this.shown = 0;
  this.click = 0;
  Images.all.push( this );
}

Images.all = [];

for ( let i = 0; i < imgArray.length;i++ ){

  let imageName =  imgArray[i].split( '.' )[0];
  new Images ( imageName ,imgArray[i] );

}

function renderImages() {

  leftIndex = getRandom( 0, imgArray.length - 1 );

  do {
    midIndex = getRandom( 0, imgArray.length - 1 );
    rightIndex = getRandom( 0, imgArray.length - 1 );
  } while ( leftIndex === rightIndex || midIndex === rightIndex || leftIndex === midIndex );


  leftImage.src = Images.all[leftIndex].path;
  midImage.src = Images.all[midIndex].path;
  rightImage.src = Images.all[rightIndex].path;


  Images.all[leftIndex].shown++;
  Images.all[midIndex].shown++;
  Images.all[rightIndex].shown++;

}

function clickFunction ( event ) {
  if ( ( event.target.id === 'leftImage' || event.target.id === 'rightImage' || event.target.id === 'mid(Image' ) && counter < round ){

    if ( event.target.id === 'leftImage' ) {
      Images.all[leftIndex].click++;
    }

    if ( event.target.id === 'midImage' ) {
      Images.all[midIndex].click++;
    }

    if ( event.target.id === 'rightImage' ) {
      Images.all[rightIndex].click++;


    } else if ( counter >= round ) {
      renderChart ();
    }

    renderImages();
    counter ++;
  }
}

function printResult( e ) {
  for ( let i = 0 ; i < Images.all.length; i++ ){
    let li = document.createElement( 'li' );
    listOfResults.appendChild( li );
    li.textContent = `${Images.all[i].name} had ${Images.all[i].click} votes, and was seen ${Images.all[i].shown} times. `;

  }

}
viewResult.removeEventListener( 'click',printResult );


imageSection.addEventListener( 'click',clickFunction );
viewResult.addEventListener( 'click',printResult );

renderImages();


function renderChart (){

  let name  = [];
  let veiw  = [];
  let clicks  = [];
  for ( let i = 0 ; i < Images.all.length; i++ ){
    name .push( Images.all[i].name );
    veiw .push( Images.all[i].shown );
    clicks .push( Images.all[i].click );
  }

}

let ctx = document.getElementById( 'myChart' ).getContext( '2d' );

let myChart = new Chart( ctx, {

  type: 'bar',
  data: {
    labels:imgArray  ,
    datasets: [{
      label: 'Views',
      data:  listOfResults,
      backgroundColor: 'rgba(0, 0, 255, 0.5)'
    }, {
      label: 'Clicks',
      data: clickFunction,
      backgroundColor: 'rgba(0, 0, 255, 0.2)'
    }],
  },
} );
