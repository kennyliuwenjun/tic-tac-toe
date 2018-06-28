const LEFT_TOP = [-1,-1];
const TOP = [0,-1];
const RIGHT_TOP = [1,-1];
const LEFT = [-1,0];
const RIGHT = [1,0];
const LEFT_BOTTOM = [-1,1];
const BOTTOM = [0,1];
const RIGHT_BOTTOM = [1,1];
const APP_NAME = 'kennytictactoe'
const CROSS = 'X';
const CIRCLE = 'O';

let WIN_REQUIREMENT;
let GAMEBOARD_LENGTH;


const setup_game_interface = (game) => {
  const $gameContainer = $("#container");
  let columns = '';;
  for (let i=0;i<GAMEBOARD_LENGTH;i++){
    columns += 'auto ';
  }
  $gameContainer.css('grid-template-columns', columns);
  $gameContainer.css('width', GAMEBOARD_LENGTH*50);
  for(let i = 0; i < GAMEBOARD_LENGTH; i++) {
    for(let j = 0; j < GAMEBOARD_LENGTH; j++){
      setUpCell(j, i, $gameContainer, game)
    }
  };
  $("body").append($(`<div id="game_msg"></div>`));
  $("body").append($(`<div id="scoreboard"></div>`));
  $("body").append($(`<input type="button" value="reset result" id="resetLocalData"></input>`));
  $("#resetLocalData").on('click', function(){
    localData.reset();
    render(game);
  });
};

const localData = {
  getter: function() {
    let data = JSON.parse(localStorage.getItem(APP_NAME));
    if(!data){
      data = {score:{}};
      data.score[CROSS] = 0;
      data.score[CIRCLE] = 0;
    };
    return data;
  },
  setter: function(data) {
    localStorage.setItem(APP_NAME, JSON.stringify(data));
  },
  reset: function(){
    localStorage.removeItem(APP_NAME);
  }
};

const render = (game) => {
  for(let i = 0; i < GAMEBOARD_LENGTH; i++) {
    for(let j = 0; j < GAMEBOARD_LENGTH; j++){
      $(`[x=${j}][y=${i}]`).html(game.gameboard[j][i]!==null?game.gameboard[j][i].shape:null);
    }
  };

  const data = localData.getter();
  $("#scoreboard").html(`X: ${data.score[CROSS]} wins<br/> O: ${data.score[CIRCLE]} wins`);


  let turn = game.turn%2 === 0 ? CROSS : CIRCLE;
  if (game.result||game.turn === 0){
    const resultMsg = game.result?`${game.result} won!`:`draw !`;
    $("#game_msg").html(resultMsg);
    $("body").append($(`<input type="button" value="reset game" id="reset"></div>`));
    afterFinish();
  } else {
    $("#game_msg").html(`${turn}'s turn`);
  }

};

const afterFinish =() =>{
  $("#reset").on('click',function(){
    $("body").html('');
    init();
  });
}

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
      if(game.result){
        const data = localData.getter();
        data.score[game.result]++;
        localData.setter(data);
      }
    }
    render(game);
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
  $("body").append($('<section> Please enter gameboard length (3-15)<br/><input id="dimensionLength" value="3" type="text"><input id="start" value="START" type="button"> </section>'));
  $("#start").on('click',function(){
    GAMEBOARD_LENGTH = +$("#dimensionLength").val();
    if(GAMEBOARD_LENGTH>=3 && GAMEBOARD_LENGTH<=15){
      $("section").html('').attr('id', 'container')
      game = new Game(GAMEBOARD_LENGTH);
      setGameMode(GAMEBOARD_LENGTH);
      setup_game_interface(game);
      render(game);
    } else {
      alert("please enter a number between 3 and 15");
    }
  });
}

$( document ).ready(function() {
  let game, scoreboard;
  init();
});
