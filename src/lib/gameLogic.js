import { board } from './board.js';
import { whitePieces, blackPieces } from './pieces/pieces.js';
import { gameSettings, Timer as timer } from './game-settings.js';
import { playerDuration, opponentDuration } from '/src/layout/ingame.jsx';
import { boardStatus } from '/src/ui/in-game/board';

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
function updateBoard(){
    let updatedBoard = [];

    for(let item of board.tiles){
        updatedBoard.push({ id : item.id,
                            color : item.color,
                            piece : item.piece?item.piece.image:null,
                            highlight : item.highlight
                        });
    }

    return updatedBoard;
}

//SET PIECES ON BOARD AT GAME START AND RETURN ARRAY OF SIMPLE BOARD FOR RENDERING
export function setPieces(){
    for(let i=0; i<16; i++){
        blackPieces[i].tileIndex = i;
        board.tiles[i].piece = blackPieces[i]
    }

    for(let i=0; i<16; i++){
        whitePieces[i].tileIndex = i+48;
        board.tiles[i+48].piece = whitePieces[i]
    }
    
    for(let piece of whitePieces.concat(blackPieces)) board.scannMoves(piece);

    return updateBoard();
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

        return {updatedTiles : [id],
                updatedBoard : updateBoard(),
            }

    }
    else{
        //SAME TILE SELECTED
        if (selectedTile.id == id){
            selectedTile.highlight = null;
            selectedTile = null;

            return {updatedTiles : [id],
                    updatedBoard : updateBoard(),
                }
        }
        //SELECTED TILE HAS PIECE WITH LEGAL MOVE
        if(PIECE){
            const updatedTiles = [selectedTile.id, id];
            selectedTile.highlight = null;
            selectedTile = board.tiles[id];
            selectedTile.highlight = " highlight";

            return {updatedTiles : updatedTiles,
                    updatedBoard : updateBoard(),
                }
        }

        //MOVE PIECE ON SELECTED TILE
        if(selectedTile.piece.legalMoves.includes(id)){
            const updatedTiles = board.movePiece(selectedTile, id);
            selectedTile.highlight = null;
            selectedTile = null;
            Timer.pause(isWhiteTurn);
            isWhiteTurn = !isWhiteTurn;
            Timer.start(isWhiteTurn);

            return {updatedTiles : updatedTiles,
                    updatedBoard : updateBoard(),
                };
        }

        //SELECTED TILE HAS NO PIECE NOR LEGAL MOVE, RESET SELECTED PIECE
        if (!PIECE){
            const prevSelectedTile = selectedTile.id
            selectedTile.highlight = null;
            selectedTile = null;

            return {updatedTiles : [prevSelectedTile],
                    updatedBoard : updateBoard(),
                }
        }
    }
}