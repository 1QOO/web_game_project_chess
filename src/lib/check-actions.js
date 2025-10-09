export function doubleChecked(){
    scannKingMoves(board, king);
    if(king.legalMoves.length){
        check();
        return;
    }
    checkmate();
    return
}

export function checkedByKnight(board, king, attacker, scannKingMoves){
    const isAttackerCapturable = captureAttacker(board, attacker);
    
    scannKingMoves(board, king);
    if(king.legalMoves.length || isAttackerCapturable){
        checked();
        return;
    };
    checkmate();
    return;
}

export function checked(board, king, attacker, scannKingMoves){
    const isAttackerCapturable = captureAttacker(board, attacker);
    const isCheckBlockable = blockCheck(board, attacker, king);

    scannKingMoves(board, king);
    if(king.legalMoves.length || isAttackerCapturable || isCheckBlockable){
        check();
        return;
    }
    checkmate();
}

function captureAttacker(board, attacker){
    let capturable = false;

    for(let piece of board.tiles[attacker.tileIndex].controledBy){
        if(piece.notation != 'K' && piece.color != attacker.color){
            piece.legalMoves.push(attacker.tileIndex);
            capturable = true;
        }
    }

    return capturable;
}

function blockCheck(board, attacker, king){
    let step;
    let blockable = false;

    if(king.tileIndex % 8 === attacker.tileIndex % 8)
        step = king.tileIndex > attacker.tileIndex? 8: -8;
    else if(Math.floor(king.tileIndex / 8) === Math.floor(attacker.tileIndex / 8))
        step = king.tileIndex > attacker.tileIndex? 1: -1;
    else{
        if(king.tileIndex % 8 > attacker.tileIndex % 8)
            step = king.tileIndex > attacker.tileIndex? 7: -7;
        else step = king.tileIndex > attacker.tileIndex? 9: -9;
    }

    let nextTileIndex = attacker.tileIndex + step;
    while(true){
        if(nextTileIndex === king.tileIndex) break;
        const tile = board.tiles[nextTileIndex];

        for(let piece of tile.controledBy){
            if((piece.notation != 'K' && piece.notation != 'p') && piece.color != attacker.color){
                piece.legalMoves.push(nextTileIndex);
                blockable = true;
            }
        }

        blockableByPawn(board, tile.id, attacker.color);
        nextTileIndex += step;
    }
    return blockable;
}

function blockableByPawn(board, tileId, opponentColor){
    if(opponentColor === "white"){
        if(tileId < 16) return;

        if(board.tiles[tileId - 8].piece){
            const piece = board.tiles[tileId - 8].piece
            if(piece.notation === 'p' && piece.color != opponentColor){
                piece.legalMoves.push(tileId);
            }
            else return;
        }
        else{
            const piece = board.tiles[tileId - 16].piece
            if(piece.notation === 'p' && piece.color != opponentColor && piece.firstMove){
                piece.legalMoves.push(tileId);
            }
            else return;
        }
    }
    else{
        if(tileId > 47) return;

        if(board.tiles[tileId + 8].piece){
            const piece = board.tiles[tileId + 8].piece
            if(piece.notation === 'p' && piece.color != opponentColor)
                piece.legalMoves.push(tileId);
            else return;
        }
        else{
            const piece = board.tiles[tileId +16].piece
            if(piece.notation === 'p' && piece.color != opponentColor && piece.firstMove)
                piece.legalMoves.push(tileId);
            else return;
        }
    }
}

function checkmate(){
    alert("Checkmate!");
    return;
}
function check(){
    alert("Check!");
    return;
}