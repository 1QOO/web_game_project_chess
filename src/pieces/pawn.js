import { boardRows, boardCols, pieceParent} from './pieceParent.js';
import { blackPieces } from './pieces.js';

//WHITE PAWN
class whitePawn extends pieceParent {
    constructor(row, col, color, image){
        super(row, col, color, image);
        this.position = `${boardCols[this.col]}${boardRows[this.row]}`;
        this.firstMove = true;
    }

    findLegalMoves(opponentPieces){
        this.legalMove = [];
        this.tileAheadCoord = `${boardCols[this.col]}${boardRows[this.row-1]}`;
        this.tileAhead = document.querySelector(`#${this.tileAheadCoord}`);
        this.capturableTiles = [`${boardCols[this.col-1]}${boardRows[this.row-1]}`, `${boardCols[this.col+1]}${boardRows[this.row-1]}`];

        (!(this.tileAhead.style.backgroundImage) && this.row>0) ? this.legalMove.unshift(this.tileAheadCoord) : this.legalMove.unshift("");
        for (this.tileId of this.capturableTiles){
            this.tile = document.getElementById(this.tileId);

            if (this.tile.style.backgroundImage){
                for (this.piece of opponentPieces) if (this.tileId == this.piece.position) {
                    this.legalMove.unshift(this.tileId);
                    break;
                }
            }
        }
        if (this.legalMove[0] && this.firstMove){
            this.twoTileAheadCoord =`${boardCols[this.col]}${boardRows[this.row-2]}`;

            !(document.getElementById(this.twoTileAheadCoord).style.backgroundImage) ? this.legalMove.unshift(this.twoTileAheadCoord):false;
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

//BLACK PAWN
class blackPawn extends pieceParent {
    constructor(row, col, color, image){
        super(row, col, color, image);
        this.position = `${boardCols[this.col]}${boardRows[this.row]}`;
        this.firstMove = true;
    }

    findLegalMoves(opponentPieces){
        this.legalMove = [];
        this.tileAheadCoord = `${boardCols[this.col]}${boardRows[this.row+1]}`;
        this.tileAhead = document.querySelector(`#${this.tileAheadCoord}`);
        this.capturableTiles = [`${boardCols[this.col-1]}${boardRows[this.row+1]}`, `${boardCols[this.col+1]}${boardRows[this.row+1]}`];

        (!(this.tileAhead.style.backgroundImage) && this.row<7) ? this.legalMove.unshift(this.tileAheadCoord) : this.legalMove.unshift("");
        for (this.tileId of this.capturableTiles){
            this.tile = document.getElementById(this.tileId);

            if (this.tile.style.backgroundImage){
                for (this.piece of opponentPieces) if (this.tileId == this.piece.position) {
                    this.legalMove.unshift(this.tileId);
                    break;
                }
            }
        }
        if (this.legalMove[0] && this.firstMove){
            this.twoTileAheadCoord =`${boardCols[this.col]}${boardRows[this.row+2]}`;

            !(document.getElementById(this.twoTileAheadCoord).style.backgroundImage) ? this.legalMove.unshift(this.twoTileAheadCoord):false;
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


const whitePawn1 = new whitePawn(0, 6, "white", "/img/white_pawn_highlighted.png");
const whitePawn2 = new whitePawn(1, 6, "white", "/img/white_pawn_highlighted.png");
const whitePawn3 = new whitePawn(2, 6, "white", "/img/white_pawn_highlighted.png");
const whitePawn4 = new whitePawn(3, 6, "white", "/img/white_pawn_highlighted.png");
const whitePawn5 = new whitePawn(4, 6, "white", "/img/white_pawn_highlighted.png");
const whitePawn6 = new whitePawn(5, 6, "white", "/img/white_pawn_highlighted.png");
const whitePawn7 = new whitePawn(6, 6, "white", "/img/white_pawn_highlighted.png");
const whitePawn8 = new whitePawn(7, 6, "white", "/img/white_pawn_highlighted.png");

const blackPawn1 = new blackPawn(0, 1, "black", "/img/black_pawn_highlighted.png");
const blackPawn2 = new blackPawn(1, 1, "black", "/img/black_pawn_highlighted.png");
const blackPawn3 = new blackPawn(2, 1, "black", "/img/black_pawn_highlighted.png");
const blackPawn4 = new blackPawn(3, 1, "black", "/img/black_pawn_highlighted.png");
const blackPawn5 = new blackPawn(4, 1, "black", "/img/black_pawn_highlighted.png");
const blackPawn6 = new blackPawn(5, 1, "black", "/img/black_pawn_highlighted.png");
const blackPawn7 = new blackPawn(6, 1, "black", "/img/black_pawn_highlighted.png");
const blackPawn8 = new blackPawn(7, 1, "black", "/img/black_pawn_highlighted.png");

export const whitePawns = [whitePawn1, whitePawn2, whitePawn3, whitePawn4, whitePawn5, whitePawn6, whitePawn7, whitePawn8];
export const blackPawns = [blackPawn1, blackPawn2, blackPawn3, blackPawn4, blackPawn5, blackPawn6, blackPawn7, blackPawn8];