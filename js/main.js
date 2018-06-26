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

let WIN_REQUIREMENT = 5;
let GAME_DIMENSION = 13;


const draw_game_interface = (game) => {
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

const setUpCell = (x, y, gameCongtainer, game) => {
  const cell = $(`<div class='grid-chessman' x='${x}' y='${y}'></div>`);
  cell.on('click',function(){
    let terminate = false;
    if(game.turn%2===0){
      terminate = game.placeChessman([x,y],CROSS);
      $(this).html(CROSS);
    } else if (game.turn%2===1){
      terminate = game.placeChessman([x,y],CIRCLE);
      $(this).html(CIRCLE);
    }
    if (terminate){
      alert($(this).html()+ "  wins!!!");
    }
    game.turn++;
  });
  gameCongtainer.append(cell);
}

$( document ).ready(function() {
    const game = new Game(GAME_DIMENSION);
    draw_game_interface(game);
});
