import { pieceParent } from "./pieceParent";

class knight extends pieceParent {
    constructor(row, col, color, image){
        super(row, col, color, image);
    }
    
    findLegalMoves(board){
        this.legalMove = [];
        this.tilesId =  [`${this.row-2}${this.col+1}`, `${this.row-1}${this.col+2}`, `${this.row+1}${this.col+2}`, `${this.row+2}${this.col+1}`,
                        `${this.row+2}${this.col-1}`, `${this.row+1}${this.col-2}`, `${this.row-1}${this.col-2}`, `${this.row-2}${this.col-1}`
                        ]
        for (let id of this.tilesId){
            const row = Number(id.at(0));
            const col = Number(id.at(1));
            if(0<=row&&row<=7 && 0<=col&&col<=7){
                const tile = board[row][col];
                if (tile && (tile.color != this.color))this.legalMove.push(id);
                else if(tile && (tile.color == this.color)){}
                else this.legalMove.push(id);
            }
        }
        return this.legalMove;
    }
}

const whiteKnight1 = new knight(7, 1, "white", "/img/white_knight_highlighted.png");
const whiteKnight2 = new knight(7, 6, "white", "/img/white_knight_highlighted.png");
const blackKnight1 = new knight(0, 1, "black", "/img/black_knight_highlighted.png");
const blackKnight2 = new knight(0, 6, "black", "/img/black_knight_highlighted.png");

export const whiteKnights = [whiteKnight1, whiteKnight2];
export const blackKnights = [blackKnight1, blackKnight2];