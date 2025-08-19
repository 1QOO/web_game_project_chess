import { boardCols, boardRows, pieceParent } from "./pieceParent";

class king extends pieceParent {
    constructor(row, col, color, image){
        super(row, col, color, image);
    }
    
    findLegalMoves(opponentPieces){
        this.legalMove = [];
        this.tilesId =  [`${boardCols[this.col-1]}${boardRows[this.row]}`, `${boardCols[this.col-1]}${boardRows[this.row+1]}`, `${boardCols[this.col]}${boardRows[this.row+1]}`,
                        `${boardCols[this.col+1]}${boardRows[this.row+1]}`, `${boardCols[this.col+1]}${boardRows[this.row]}`,
                        `${boardCols[this.col+1]}${boardRows[this.row-1]}`, `${boardCols[this.col]}${boardRows[this.row-1]}`, `${boardCols[this.col-1]}${boardRows[this.row-1]}`]
        for (let id of this.tilesId){
            const tile = document.getElementById(id);
            if (tile && !(tile.style.backgroundImage))this.legalMove.push(id);
            if (tile && (tile.style.backgroundImage)){
                for (let piece of opponentPieces){
                    if (piece.position == id) {
                        this.legalMove.push(id);
                        break;
                    }
                }
            }
        }
        return this.legalMove;
    }
    move(position, opponentPieces){
        if (this.firstMove) this.firstMove = false;
        document.querySelector(`#${this.position}`).style.backgroundImage = "";
        this.position = position;
        this.col = boardCols.indexOf(position.at(0));
        this.row = boardRows.indexOf(position.at(1));
        if (document.querySelector(`#${this.position}`).style.backgroundImage){
            super.capturePiece(this.position, opponentPieces);
        }
        this.display(this.position);
    }
}

export const whiteKing = new king(4, 7, "white", "/img/white_king_highlighted.png");
export const blackKing = new king(4, 0, "black", "/img/black_king_highlighted.png");
