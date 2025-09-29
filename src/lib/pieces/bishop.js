import { pieceParent } from "./pieceParent";

class bishop extends pieceParent {
    constructor(color, image){
        super(color, image);
        this.notation = 'B';
        this.moves = [7, -7, 9, -9];
    }
}

const whiteBishop1 = new bishop("white", "/img/white_bishop_highlighted.png");
const whiteBishop2 = new bishop("white", "/img/white_bishop_highlighted.png");
const blackBishop1 = new bishop("black", "/img/black_bishop_highlighted.png");
const blackBishop2 = new bishop("black", "/img/black_bishop_highlighted.png");

export const whiteBishops = [whiteBishop1, whiteBishop2];
export const blackBishops = [blackBishop1, blackBishop2];