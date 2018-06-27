class Game {
  constructor(dimensionLength){
    this.result;
    this.turn = dimensionLength**2;
    this.gameboard = [];
    for (let i=0; i<dimensionLength;i++){
      this.gameboard[i]=[];
      for(let j=0; j<dimensionLength;j++){
        this.gameboard[i][j]=null;
      };
    };
  };

  placeChessman(coordinates, shape){
    this.gameboard[coordinates[0]][coordinates[1]] = new Chessman(shape, coordinates[0], coordinates[1]);
    const result = this.gameboard[coordinates[0]][coordinates[1]].checkWin(this.gameboard)
    console.log(result);
    this.consoleDisplay();
    return result;
  };

  consoleDisplay(){
    let result = '';
    for (let i=0; i<this.gameboard.length;i++){
      for(let j=0; j<this.gameboard[i].length;j++){
        result += ` ${this.gameboard[j][i]?this.gameboard[j][i].shape:'.'} `
      };
      result += '\n';
    };
    console.log(result);
  };
}
