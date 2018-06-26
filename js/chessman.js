class Chessman {
  constructor(color, x, y){
    this.x = x;
    this.y = y;
    this.color = color;
  };

  check_related_chessman_color (gameboard, direction, distance){
    let target = gameboard[this.x+direction[0]];
    if(!gameboard[this.x+direction[0]]){
      return;
    }
    target = target[this.y+direction[1]];
    return target ? target.color:undefined;
  };

  check_win (gameboard){
    return this.check_line_success(gameboard, RIGHT, LEFT) ||
           this.check_line_success(gameboard, TOP, BOTTOM) ||
           this.check_line_success(gameboard, RIGHT_TOP, LEFT_BOTTOM) ||
           this.check_line_success(gameboard, LEFT_TOP, RIGHT_BOTTOM);
  };

  consecutive_count_by_direction (gameboard, direction){
    let count = 0;
    for (let i=1; i < WIN_REQUIREMENT; i++){
      let color = this.check_related_chessman_color(gameboard,[direction[0]*i,direction[1]*i])
      if(color && color === this.color){
        count++;
      } else {
        break;
      }
    };
    return count;
  };

  check_line_success (gameboard, direction1, direction2){
    return this.consecutive_count_by_direction(gameboard, direction1) +
           this.consecutive_count_by_direction(gameboard, direction2) + 1 >= WIN_REQUIREMENT;
  };

};
