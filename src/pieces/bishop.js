import { pieceParent } from "./pieceParent";

class bishop extends pieceParent {
    constructor(row, col, color, image){
        super(row, col, color, image);
        this.notation = 'B';
    }

    findLegalMoves(board){
        this.legalMove = [];
        const position = `${this.row}${this.col}`;

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

const whiteBishop1 = new bishop(7, 2, "white", "/img/white_bishop_highlighted.png");
const whiteBishop2 = new bishop(7, 5, "white", "/img/white_bishop_highlighted.png");
const blackBishop1 = new bishop(0, 2, "black", "/img/black_bishop_highlighted.png");
const blackBishop2 = new bishop(0, 5, "black", "/img/black_bishop_highlighted.png");

export const whiteBishops = [whiteBishop1, whiteBishop2];
export const blackBishops = [blackBishop1, blackBishop2];