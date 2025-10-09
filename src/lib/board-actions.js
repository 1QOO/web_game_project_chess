import {scannPawnMoves,
        scannKnightMoves,
        scannRBQMoves,
        scannKingMoves}
from '/src/lib/scannMoves';
import { checked, checkedByKnight, doubleChecked } from './check-actions';

export function movePiece(board, piece, destination){
    board.targetEnPasant = null;
    board.pinnedPiece = [];

    if(piece.notation === 'p' && piece.firstMove) piece.firstMove = false;
    if((piece.notation === 'p') && (piece.tileIndex % 8 !== destination % 8) && (board.tiles[destination] === null)){
        piece.tileIndex > destination?
        board.tiles[destination - 8].piece = null:
        board.tiles[destination + 8].piece = null;
    }
    board.tiles[destination].piece = piece;
    board.tiles[piece.tileIndex].piece = null;
    piece.tileIndex = destination;
    
    return;
}

export function isCheck(board, king){
    const kingsTile = board.tiles[king.tileIndex];
    let isCheck = false;
    let isCheckedByKnight = false;
    let isDoubleCheck = false;
    let attacker = null;

    for(let piece of kingsTile.controledBy){
        if(king.color != piece.color){
            if(isCheck){
                isDoubleCheck = true;
                attacker = null;
                break;
            }
            isCheck = true;
            if(piece.notation === 'N')
                isCheckedByKnight = true;
            attacker = piece;
        }
    }

    if(isCheck) checkActions(isCheckedByKnight, isDoubleCheck, board, king, attacker);
    return;
}

function checkActions(checkedByKnight, doubleCheck, board, king, attacker){
    const checkedColor = king.color;
    let checkedPieces = [];

    for(let tile of board.tiles)
        if(tile.piece?.color === checkedColor)
            checkedPieces.push(tile.piece);

    clearPieceLegalMoves(checkedPieces);

    if(doubleCheck)
        doubleChecked(board, king, scannKingMoves);
    
    if(checkedByKnight)
        checkedByKnight(board, king, attacker, scannKingMoves);

    else checked(board, king, attacker, scannKingMoves);

    return;
}

function clearPieceLegalMoves(pieces){
    for(let piece of pieces)
        piece.legalMoves = [];
    return;
}

export function scannPieceMoves(board, piece){

    switch(piece.notation){
        case 'p' : {
            scannPawnMoves(board, piece);
            break;
        }
        case 'N' : {
            scannKnightMoves(board, piece);
            break;
        }
        case 'K' : {
            scannKingMoves(board, piece);
            break;
        }
        default : {
            scannRBQMoves(board, piece);
            break;
        }
    }
    
    for(let piece of board.pinnedPiece) piece.legalMoves = [];
    return;
}