import {boardRows, boardCols, pieceParent} from './pieceParent.js';

class rook extends pieceParent {
    constructor(row, col, color, image){
        super(row, col, color, image);
    }

    findLegalMoves(opponentPieces){
        this.legalMove = [];

        //UP
        for(let i = this.row; i>0 ; --i){
            if (this.position != `${boardCols[this.col]}${boardRows[i]}`){
                if(document.getElementById(`${boardCols[this.col]}${boardRows[i]}`).style.backgroundImage){
                    for(let piece of opponentPieces){
                        if(piece.position == `${boardCols[this.col]}${boardRows[i]}`){
                            this.legalMove.push(`${boardCols[this.col]}${boardRows[i]}`);
                            break;
                        }
                    }
                    break;
                }
                else this.legalMove.push(`${boardCols[this.col]}${boardRows[i]}`);
            }
        }

        //RIGHT
        for(let i = this.col; i<8 ; ++i){
            if (this.position != `${boardCols[i]}${boardRows[this.row]}`){
                if(document.getElementById(`${boardCols[i]}${boardRows[this.row]}`).style.backgroundImage){
                    for(let piece of opponentPieces){
                        if(piece.position == `${boardCols[i]}${boardRows[this.row]}`){
                            this.legalMove.push(`${boardCols[i]}${boardRows[this.row]}`);
                            break;
                        }
                    }
                    break;
                }
                else this.legalMove.push(`${boardCols[i]}${boardRows[this.row]}`);
            }
        }

        //DOWN
        for(let i = this.row; i<8 ; ++i){
            if (this.position != `${boardCols[this.col]}${boardRows[i]}`){
                if(document.getElementById(`${boardCols[this.col]}${boardRows[i]}`).style.backgroundImage){
                    for(let piece of opponentPieces){
                        if(piece.position == `${boardCols[this.col]}${boardRows[i]}`){
                            this.legalMove.push(`${boardCols[this.col]}${boardRows[i]}`);
                            break;
                        }
                    }
                    break;
                }
                else this.legalMove.push(`${boardCols[this.col]}${boardRows[i]}`);
            }
        }

        //LEFT
        for(let i = this.col; i>0 ; --i){
            if (this.position != `${boardCols[i]}${boardRows[this.row]}`){
                if(document.getElementById(`${boardCols[i]}${boardRows[this.row]}`).style.backgroundImage){
                    for(let piece of opponentPieces){
                        if(piece.position == `${boardCols[i]}${boardRows[this.row]}`){
                            this.legalMove.push(`${boardCols[i]}${boardRows[this.row]}`);
                            break;
                        }
                    }
                    break;
                }
                else this.legalMove.push(`${boardCols[i]}${boardRows[this.row]}`);
            }
        }
        return this.legalMove[0] ? this.legalMove : [''];
    }

    move(position, opponentPieces){
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

const whiteRook1 = new rook(0, 7, "white", "/img/white_rook_highlighted.png");
const whiteRook2 = new rook(7, 7, "white", "/img/white_rook_highlighted.png");
const blackRook1 = new rook(0, 0, "black", "/img/black_rook_highlighted.png");
const blackRook2 = new rook(7, 0, "black", "/img/black_rook_highlighted.png");

export const whiteRooks = [whiteRook1, whiteRook2];
export const blackRooks = [blackRook1, blackRook2];