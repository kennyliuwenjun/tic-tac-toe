const LEFT_TOP = [-1,-1];
const TOP = [0,-1];
const RIGHT_TOP = [1,-1];
const LEFT = [-1,0];
const RIGHT = [1,0];
const LEFT_BOTTOM = [-1,1];
const BOTTOM = [0,1];
const RIGHT_BOTTOM = [1,1];
const WIN_REQUIREMENT = 3;
const BLACK = 1;
const WHITE = 2;

const game = [[new Chessman(WHITE,0,0),new Chessman(WHITE,0,1),0],[new Chessman(BLACK,1,0),new Chessman(BLACK,1,1),new Chessman(BLACK,1,2)],[0,0,0]];
