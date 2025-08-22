import { pieceParent } from "./pieceParent";

class king extends pieceParent {
    constructor(row, col, color, image){
        super(row, col, color, image);
    }
    
    findLegalMoves(board){
        this.legalMove = [];
        this.tilesId =  [`${this.row-1}${this.col-1}`, `${this.row-1}${this.col}`, `${this.row-1}${this.col+1}`, `${this.row}${this.col+1}`,
                        `${this.row+1}${this.col+1}`, `${this.row+1}${this.col}`, `${this.row+1}${this.col-1}`, `${this.row}${this.col-1}`,]

        for (let id of this.tilesId){
            const row = Number(id.at(0));
            const col = Number(id.at(1));

            if (0<=row && row<=7 && 0<=col && col<=7){
                if (board[row][col] && board[row][col].color != this.color) this.legalMove.push(id);
                else if (board[row][col] && board[row][col].color == this.color){}
                else  this.legalMove.push(id);
            }
        }
        return this.legalMove;
    }
}

export const whiteKing = new king(7, 4, "white", "/img/white_king_highlighted.png");
export const blackKing = new king(0, 4, "black", "/img/black_king_highlighted.png");
