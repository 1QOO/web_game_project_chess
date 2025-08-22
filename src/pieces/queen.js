import {pieceParent} from './pieceParent.js';

class queen extends pieceParent {
    constructor(row, col, color, image){
        super(row, col, color, image);
    }
    
    findLegalMoves(board){
        this.legalMove = [];
        const position = `${this.row}${this.col}`;

        //UP
        for(let i = this.row; i>0 ; --i){
            if (position != `${i}${this.col}`){
                if(board[i][this.col]){
                    if (board[i][this.col].color != this.color) this.legalMove.push(`${i}${this.col}`);
                    break;
                }
                else this.legalMove.push(`${i}${this.col}`);
                console.log("finish");
                console.log(this.legalMove)
            }
        }

        //RIGHT
        for(let i = this.col; i<7 ; ++i){
            if (position != `${this.row}${i}`){
                if(board[this.row][i]){
                    if (board[this.row][i].color != this.color) this.legalMove.push(`${this.row}${i}`);
                    break;
                }
                else this.legalMove.push(`${this.row}${i}`);
            }
        }

        //DOWN
        for(let i = this.row; i<7 ; ++i){
            if (position != `${i}${this.col}`){
                if(board[i][this.col]){
                    if (board[i][this.col].color != this.color) this.legalMove.push(`${1}${this.col}`);
                    break;
                }
                else this.legalMove.push(`${1}${this.col}`);
            }
        }

        //LEFT
        for(let i = this.col; i>0 ; --i){
            if (position != `${this.row}${i}`){
                if(board[this.row][i]){
                    if (board[this.row][i].color != this.color) this.legalMove.push(`${this.row}${i}`);
                    break;
                }
                else this.legalMove.push(`${this.row}${i}`);
            }
        }

        //UP-RIGHT
        for(let i = this.row, j = this.col; i>=0 && j<=7 ; --i, ++j){
            if (position != `${i}${j}`){
                if (board[i][j] && board[i][j].color != this.color){
                    this.legalMove.push(`${i}${j}`);
                    break;
                }
                else if (board[i][j] && board[i][j].color == this.color) break;
                else this.legalMove.push(`${i}${j}`);
            }
        }

        //DOWN-RIGHT
        for(let i = this.row, j = this.col; i<=7 && j<=7 ; ++i, ++j){
            if (position != `${i}${j}`){
                if (board[i][j] && board[i][j].color != this.color){
                    this.legalMove.push(`${i}${j}`);
                    break;
                }
                else if (board[i][j] && board[i][j].color == this.color) break;
                else this.legalMove.push(`${i}${j}`);
            }
        }

        //DOWN-LEFT
        for(let i = this.row, j = this.col; i<=7 && j>=0 ; ++i, --j){
            if (position != `${i}${j}`){
                if (board[i][j] && board[i][j].color == this.color){
                    this.legalMove.push(`${i}${j}`);
                    break;
                }
                else if (board[i][j] && board[i][j].color != this.color) break;
                else this.legalMove.push(`${i}${j}`);
            }
        }

        //UP-LEFT
        for(let i = this.row, j = this.col; i>=0 && j>=0 ; --i, --j){
            if (position != `${i}${j}`){
                if (board[i][j] && board[i][j] && board[i][j].color != this.color){
                    this.legalMove.push(`${i}${j}`);
                    break;
                }
                else if (board[i][j] && board[i][j] && board[i][j].color == this.color) break;
                else this.legalMove.push(`${i}${j}`);
            }
        }
        return this.legalMove[0] ? this.legalMove : [''];
    }
}

export const whiteQueen = new queen(7, 3, "white", "/img/white_queen_highlighted.png");
export const blackQueen = new queen(0, 3, "black", "/img/black_queen_highlighted.png");
