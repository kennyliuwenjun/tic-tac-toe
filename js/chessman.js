class Chessman {
  constructor(shape, x, y){
    this.x = x;
    this.y = y;
    this.shape = shape;
  };

  checkRelatedChessmanShape (gameboard, direction, distance){
    let target = gameboard[this.x+direction[0]];
    if(!gameboard[this.x+direction[0]]){
      return;
    }
    target = target[this.y+direction[1]];
    return target ? target.shape:undefined;
  };

  checkWin (gameboard){
    return this.checkLineSuccess(gameboard, RIGHT, LEFT) ||
           this.checkLineSuccess(gameboard, TOP, BOTTOM) ||
           this.checkLineSuccess(gameboard, RIGHT_TOP, LEFT_BOTTOM) ||
           this.checkLineSuccess(gameboard, LEFT_TOP, RIGHT_BOTTOM);
  };

  consecutiveCountByDirection (gameboard, direction){
    let count = 0;
    for (let i=1; i < WIN_REQUIREMENT; i++){
      let shape = this.checkRelatedChessmanShape(gameboard,[direction[0]*i,direction[1]*i])
      if(shape && shape === this.shape){
        count++;
      } else {
        break;
      }
    };
    return count;
  };

  checkLineSuccess (gameboard, direction1, direction2){
    return this.consecutiveCountByDirection(gameboard, direction1) +
           this.consecutiveCountByDirection(gameboard, direction2) + 1 >= WIN_REQUIREMENT;
  };

};
