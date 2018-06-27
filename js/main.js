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
let GAME_DIMENSION;

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
  };
  $("body").append($(`<div id="turn"></div>`));
};

const render = (game) => {
  for(let i = 0; i < GAME_DIMENSION; i++) {
    for(let j = 0; j < GAME_DIMENSION; j++){
      $(`[x=${j}][y=${i}]`).html(game.gameboard[j][i]!==null?game.gameboard[j][i].shape:null);
    }
  }
  let turn = game.turn%2 === 0 ? CROSS : CIRCLE;
  if (game.result||game.turn === 0){
    $("#turn").html('');
  } else {
    $("#turn").html(`${turn}'s turn`);
  }
};

const setUpCell = (x, y, gameCongtainer, game) => {
  const cell = $(`<div class='grid-chessman' x='${x}' y='${y}'></div>`);
  cell.on('click',function(){
    let turn = game.turn%2 === 0 ? CROSS : CIRCLE;
    if(game.result){
      return;
    }
    if(game.gameboard[x][y] === null){
      game.result = game.placeChessman([x,y],turn)?turn:undefined;
      game.turn--;
    }
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

const init = () => {
  $("body").append($('<section> Please enter game dimension (3-15)<br/> winning requirement 3 for 3 dimension <br/> winning requirement 4 for 4 dimension <br/> winning requirement 5 for rest of dimension <br/><input id="dimensionLength" value="3" type="text"><input id="start" value="START" type="button"> </section>'));
  $("#start").on('click',function(){
    GAME_DIMENSION = +$("#dimensionLength").val();
    if(GAME_DIMENSION>=3 && GAME_DIMENSION<=15){
      $("section").html('').attr('id', 'container')
      const game = new Game(GAME_DIMENSION);
      setGameMode(GAME_DIMENSION);
      setup_game_interface(game);
    } else {
      alert("please enter a number between 3 and 15");
    }
  });
}

$( document ).ready(function() {
  init();
});
