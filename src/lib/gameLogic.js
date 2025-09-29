import { board } from './board.js';
import { whitePieces, blackPieces } from './pieces/pieces.js';

let isWhiteTurn = true;
let selectedTile = null;

//RETURN ARRAY OF OBJECT(SIMPLE TILE OBJECT)
function updateBoard(){
    let updatedBoard = [];

    for(let item of board.tiles){
        updatedBoard.push({id : item.id, color : item.color, piece : item.piece?item.piece.image:null, highlight : item.highlight});
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

    return updateBoard(board);
}

//FUNCTION CALLED EVERYTIME A TILE IS SELECTED, ACCEPTS TILE'S ID
export function selectTile(tileId){

    if(isWhiteTurn) return checkSelectedTile("white", tileId);
    else return checkSelectedTile("black", tileId);
}

//CHECK IF SELECTED TILE HAS A PIECE ON IT AND THE PIECE IS PLAYABLE, RETURN ARRAY OF SIMPLE BOARD FOR RENDERING
function checkSelectedTile(turn, id){
    const PIECE = board.tiles[id].piece;

    //IF A TILE IS ALREADY SELECTED BEFORE
    if(selectedTile){

        //SAME TILE SELECTED LIKE BEFORE
        if (selectedTile.id == id){
            selectedTile.highlight = null;
            selectedTile = null;

            return {updatedTiles : [id], updatedBoard : updateBoard()}
        }

        //MOVE PIECE ON SELECTED TILE
        else if(selectedTile.piece.legalMoves.includes(id)){
            const updatedTiles = board.movePiece(selectedTile, id);
            selectedTile.highlight = null;
            selectedTile = null;
            isWhiteTurn = !isWhiteTurn;

            return {updatedTiles : updatedTiles, updatedBoard : updateBoard()};
        }

        //SELECTED TILE HAS PIECE WITH LEGAL MOVE
        else if(PIECE && PIECE.color === turn && PIECE.legalMoves.length){
            const updatedTiles = [selectedTile.id, id];
            selectedTile.highlight = null;
            selectedTile = board.tiles[id];
            selectedTile.highlight = " highlight";

            return {updatedTiles : updatedTiles, updatedBoard : updateBoard()}
        }

        //SELECTED TILE HAS NO PIECE NOR LEGAL MOVE, RESET SELECTED PIECE
        else {
            const prevSelectedTile = selectedTile.id
            selectedTile.highlight = null;
            selectedTile = null;

            return {updatedTiles : [prevSelectedTile], updatedBoard : updateBoard()}
        }
    }

    //IF HASN'T SELECTED ANY TILE
    else {
        if (PIECE && PIECE.color === turn && PIECE.legalMoves.length){
            selectedTile = board.tiles[id];
            selectedTile.highlight = " highlight";
            return {updatedTiles : [id], updatedBoard : updateBoard()}
        }
    }
}