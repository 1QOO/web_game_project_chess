import { board, whitePieces, blackPieces } from '/src/lib/board.js';
import { movePiece, scannPieceMoves, isCheck } from '/src/lib/board-actions.js';
import { gameSettings, Timer as timer } from '/src/lib/game-settings.js';
import { playerDuration, opponentDuration } from '/src/layout/ingame.jsx';
import { boardStatus } from '/src/ui/in-game/board';

const pieces = whitePieces.concat(blackPieces);
let isWhiteTurn = true;
let selectedTile = null;
let begin = false;
let Timer;
let gameOver = false;

function timeIsOver(){
    Timer.pause(isWhiteTurn);
    console.log(`white ${Timer.whiteTimeDuration}`);
    gameOver = true;
    if(selectedTile){
        selectedTile.highlight = null;
        const updatedBoard = updateBoard();
        boardStatus.dissableBoard(updatedBoard);
    }
}

function getRemainingTime(timeDuration, lastTick, isWhiteTurn){
    const ms = (timeDuration - (performance.now() - lastTick));
    const mins = Math.floor(ms / 1000/ 60);
    const secs = Math.floor(ms / 1000 % 60);

    if(isWhiteTurn) playerDuration.setTime(`${mins.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`);
    else  opponentDuration.setTime(`${mins.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`);
}

//RETURN ARRAY OF OBJECT(SIMPLE TILE OBJECT)
function updateBoard(board){
    let updatedBoard = [];

    for(let tile of board.tiles){
        updatedBoard.push({ id : tile.id,
                            color : tile.color,
                            piece : tile.piece?tile.piece.image:null,
                            highlight : tile.highlight
                        });
    }

    return updatedBoard;
}

//SET PIECES ON BOARD AT GAME START AND RETURN ARRAY OF SIMPLE BOARD FOR RENDERING
export function setPieces(){
    for (let i=0; i<64; i++){
        board.tiles[i].controledBy = [];

        if(i<16){
            blackPieces[i].tileIndex = i;
            board.tiles[i].piece = blackPieces[i];
        }
        if(i>47){
            whitePieces[i-48].tileIndex = i;
            board.tiles[i].piece = whitePieces[i-48];
        }
    }
    for(let piece of pieces) scannPieceMoves(board, piece);

    return updateBoard(board);
}

//FUNCTION CALLED EVERYTIME A TILE IS SELECTED, ACCEPTS TILE'S ID
export function selectTile(tileId){
    if(gameOver) return;

    if(isWhiteTurn) return checkSelectedTile("white", tileId);
    else return checkSelectedTile("black", tileId);
}

//CHECK IF SELECTED TILE HAS A PIECE ON IT AND THE PIECE IS PLAYABLE, RETURN ARRAY OF SIMPLE BOARD FOR RENDERING
function checkSelectedTile(turn, id){
    const PIECE =   ((board.tiles[id].piece?.color === turn) && board.tiles[id].piece.legalMoves.length)?
                    board.tiles[id].piece: null;

    //HAS NOT SELECTED ANY TILE
    if(!selectedTile){
        if(!PIECE) return;
        if(!begin){
            Timer = new timer(gameSettings.timeLimit, timeIsOver, getRemainingTime);
            Timer.start(isWhiteTurn);
            begin = true;
        }
        selectedTile = board.tiles[id];
        selectedTile.highlight = " highlight";

        return updateBoard(board);
    }
    else{
        //SAME TILE SELECTED
        if (selectedTile.id == id){
            selectedTile.highlight = null;
            selectedTile = null;

            return updateBoard(board);
        }
        //SELECTED TILE HAS PIECE WITH LEGAL MOVE
        if(PIECE){
            const updatedTiles = [selectedTile.id, id];
            selectedTile.highlight = null;
            selectedTile = board.tiles[id];
            selectedTile.highlight = " highlight";

            return updateBoard(board);
        }

        //MOVE PIECE ON SELECTED TILE
        if(selectedTile.piece.legalMoves.includes(id)){
            movePiece(board, selectedTile.piece, id);
            board.tiles.map(tile=>{
                tile.controledBy=[];
            });
            pieces.map(piece=>scannPieceMoves(board, piece));
            isCheck(board, isWhiteTurn? board.blackKing: board.whiteKing);
            selectedTile.highlight = null;
            selectedTile = null;
            Timer.pause(isWhiteTurn);
            isWhiteTurn = !isWhiteTurn;
            Timer.start(isWhiteTurn);

            return updateBoard(board);
        }

        //SELECTED TILE HAS NO PIECE NOR LEGAL MOVE, RESET SELECTED PIECE
        if (!PIECE){
            selectedTile.highlight = null;
            selectedTile = null;

            return updateBoard(board);
        }
    }
}