import { pieceParent } from "./pieceParent";

class bishop extends pieceParent {
    constructor(row, col, color, image){
        super(row, col, color, image);
    }
}

const whiteBishop1 = new bishop(2, 7, "white", "/img/white_bishop_highlighted.png");
const whiteBishop2 = new bishop(5, 7, "white", "/img/white_bishop_highlighted.png");
const blackBishop1 = new bishop(2, 0, "black", "/img/black_bishop_highlighted.png");
const blackBishop2 = new bishop(5, 0, "black", "/img/black_bishop_highlighted.png");

export const whiteBishops = [whiteBishop1, whiteBishop2];
export const blackBishops = [blackBishop1, blackBishop2];