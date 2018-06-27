const LEFT_TOP = [-1,-1];
const TOP = [0,-1];
const RIGHT_TOP = [1,-1];
const LEFT = [-1,0];
const RIGHT = [1,0];
const LEFT_BOTTOM = [-1,1];
const BOTTOM = [0,1];
const RIGHT_BOTTOM = [1,1];
const CROSS = 'X';
const CIRCLE = 'O';

let WIN_REQUIREMENT;
let GAME_DIMENSION = 13;

const setup_game_interface = (game) => {
  const $gameContainer = $("#container");
  let columns = '';;
  for (let i=0;i<GAME_DIMENSION;i++){
    columns += 'auto ';
  }
  $gameContainer.css('grid-template-columns', columns);
  $gameContainer.css('width', GAME_DIMENSION*50);
  for(let i = 0; i < GAME_DIMENSION; i++) {
    for(let j = 0; j < GAME_DIMENSION; j++){
      setUpCell(j, i, $gameContainer, game)
    }
  }
};

const render = (game) => {
  for(let i = 0; i < GAME_DIMENSION; i++) {
    for(let j = 0; j < GAME_DIMENSION; j++){
      $(`[x=${j}][y=${i}]`).html(game.gameboard[j][i]!==null?game.gameboard[j][i].shape:null);
    }
  }
};

const setUpCell = (x, y, gameCongtainer, game) => {
  const cell = $(`<div class='grid-chessman' x='${x}' y='${y}'></div>`);
  cell.on('click',function(){
    if(game.result){
      return;
    }
    if(game.gameboard[x][y] === null && game.turn%2 === 0){
      game.result = game.placeChessman([x,y],CROSS)?CROSS:undefined;
    } else if (game.gameboard[x][y] === null && game.turn%2 === 1){
      game.result = game.placeChessman([x,y],CIRCLE)?CIRCLE:undefined;
    }
    game.turn--;
    render(game);
    if (game.result){
      alert(game.result + "  wins!!!");
      //after win function
    }
    if (game.turn === 0){
      alert ("draw!!");
      //draw
    }
  });
  gameCongtainer.append(cell);
};

const setGameMode = (dimension) => {
  switch (dimension){
    case 3:
      WIN_REQUIREMENT = 3;
      break;
    case 4:
      WIN_REQUIREMENT = 4;
      break;
    default:
      if(dimension<3){
        throw new FatalError("Something went badly wrong!");
      }
      WIN_REQUIREMENT = 5;
  };
}

$( document ).ready(function() {
    const game = new Game(GAME_DIMENSION);
    setGameMode(GAME_DIMENSION);
    setup_game_interface(game);
});
