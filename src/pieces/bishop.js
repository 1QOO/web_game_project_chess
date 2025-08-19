import { boardCols, boardRows, pieceParent } from "./pieceParent";

class bishop extends pieceParent {
    constructor(row, col, color, image){
        super(row, col, color, image);
    }

    findLegalMoves(opponentPieces){
        this.legalMove = [];

        //UP-RIGHT
        for(let i = this.col, j = this.row; i<=8 && j>=0 ; ++i, --j){
            console.log("Up-Right iteration")
            if (this.position != `${boardCols[i]}${boardRows[j]}` && (document.getElementById(`${boardCols[i]}${boardRows[j]}`))){
                console.log(`upright ${boardCols[i]}${boardRows[j]}`)
                if(document.getElementById(`${boardCols[i]}${boardRows[j]}`).style.backgroundImage){
                    for(let piece of opponentPieces){
                        if(piece.position == `${boardCols[i]}${boardRows[j]}`){
                            this.legalMove.push(`${boardCols[i]}${boardRows[j]}`);
                            break;
                        }
                    }
                    break;
                }
                else this.legalMove.push(`${boardCols[i]}${boardRows[j]}`);
            }
        }

        //DOWN-RIGHT
        for(let i = this.col, j = this.row; i<=8 && j<=8 ; ++i, ++j){
            console.log("Down-Right iteration")
            if (this.position != `${boardCols[i]}${boardRows[j]}` && (document.getElementById(`${boardCols[i]}${boardRows[j]}`))){
                console.log(`downright ${boardCols[i]}${boardRows[j]}`)
                if(document.getElementById(`${boardCols[i]}${boardRows[j]}`).style.backgroundImage){
                    for(let piece of opponentPieces){
                        if(piece.position == `${boardCols[i]}${boardRows[j]}`){
                            this.legalMove.push(`${boardCols[i]}${boardRows[j]}`);
                            break;
                        }
                    }
                    break;
                }
                else this.legalMove.push(`${boardCols[i]}${boardRows[j]}`);
            }
        }

        //DOWN-LEFT
        for(let i = this.col, j = this.row; i>=0 && j<=8; --i, ++j){
            console.log("Down-Left iteration")
            if (this.position != `${boardCols[i]}${boardRows[j]}` && (document.getElementById(`${boardCols[i]}${boardRows[j]}`))){
                console.log(`downleft ${boardCols[i]}${boardRows[j]}`)
                if(document.getElementById(`${boardCols[i]}${boardRows[j]}`).style.backgroundImage){
                    for(let piece of opponentPieces){
                        if(piece.position == `${boardCols[i]}${boardRows[j]}`){
                            this.legalMove.push(`${boardCols[i]}${boardRows[j]}`);
                            break;
                        }
                    }
                    break;
                }
                else this.legalMove.push(`${boardCols[i]}${boardRows[j]}`);
            }
        }

        //UP-LEFT
        for(let i = this.col, j = this.row; i>=0 && j>=0 ; i--, j--){
            console.log("Up-Left iteration")
            if (this.position != `${boardCols[i]}${boardRows[j]}` && (document.getElementById(`${boardCols[i]}${boardRows[j]}`))){
                console.log(`upleft ${boardCols[i]}${boardRows[j]}`)
                if(document.getElementById(`${boardCols[i]}${boardRows[j]}`).style.backgroundImage){
                    for(let piece of opponentPieces){
                        if(piece.position == `${boardCols[i]}${boardRows[j]}`){
                            this.legalMove.push(`${boardCols[i]}${boardRows[j]}`);
                            break;
                        }
                    }
                    break;
                }
                else this.legalMove.push(`${boardCols[i]}${boardRows[j]}`);
            }
        }
        return this.legalMove[0] ? this.legalMove : [''];
    }
}

const whiteBishop1 = new bishop(2, 7, "white", "/img/white_bishop_highlighted.png");
const whiteBishop2 = new bishop(5, 7, "white", "/img/white_bishop_highlighted.png");
const blackBishop1 = new bishop(2, 0, "black", "/img/black_bishop_highlighted.png");
const blackBishop2 = new bishop(5, 0, "black", "/img/black_bishop_highlighted.png");

export const whiteBishops = [whiteBishop1, whiteBishop2];
export const blackBishops = [blackBishop1, blackBishop2];