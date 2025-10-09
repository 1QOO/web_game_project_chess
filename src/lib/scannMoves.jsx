function isPiecePinned(board, step, piece){
    let nextMove = piece.tileIndex + step;

    while(true){
        if(step == -8 && nextMove < 0) break;
        if(step == 8 && nextMove > 63) break;
        if(step == -1 && nextMove % 8 == 7) break;
        if(step == 1 && nextMove % 8 == 0) break;
        if(step == -9 && (nextMove % 8 == 7 || nextMove < 0)) break;
        if(step == -7 && (nextMove % 8 == 0 || nextMove < 0)) break;
        if(step == 9 && (nextMove % 8 == 0 || nextMove > 63)) break;
        if(step == 7 && (nextMove % 8 == 7 || nextMove > 63)) break;

        if(board.tiles[nextMove].piece){
            const secondPiece = board.tiles[nextMove].piece;

            if(secondPiece.notation === 'K' && secondPiece.color === piece.color){
                // maintain pinnedPiece as an array
                if(!Array.isArray(board.pinnedPiece)) board.pinnedPiece = [];
                board.pinnedPiece.push(piece);
            }

            break;
        }

        nextMove += step;
    }
    return;
}

export function scannPawnMoves(board, piece){
    piece.legalMoves = [];
    const nextMove = piece.tileIndex + piece.step;

    // forward move
    if(nextMove > -1 && nextMove < 64 && board.tiles[nextMove].piece === null){
        piece.legalMoves.push(nextMove);
        const doubleMove = nextMove + piece.step;
        if(piece.firstMove && doubleMove > -1 && doubleMove < 64 && board.tiles[doubleMove].piece === null) {
            piece.legalMoves.push(doubleMove);
        }
    }

    // captures (diagonals)
    const captureLeft = nextMove - 1;
    const captureRight = nextMove + 1;
    if(piece.tileIndex % 8 !== 0 && captureLeft > -1){
        board.tiles[captureLeft].controledBy.push(piece);
        if(board.tiles[captureLeft].piece != null && board.tiles[captureLeft].piece?.color != piece.color)
            piece.legalMoves.push(captureLeft);
    }
    if(piece.tileIndex % 8 !== 7 && captureRight < 64){
        board.tiles[captureRight].controledBy.push(piece);
        if(board.tiles[captureRight].piece != null && board.tiles[captureLeft].piece?.color != piece.color)
            piece.legalMoves.push(captureRight);
    }

    // en passant targets (safety guards)
    if(board.targetEnPasant?.tileIndex === piece.tileIndex - 1) piece.legalMoves.push(piece.tileIndex - 1);
    if(board.targetEnPasant?.tileIndex === piece.tileIndex + 1) piece.legalMoves.push(piece.tileIndex + 1);

    return;
}

export function scannKnightMoves(board, piece){
    // More robust knight move computation: validate destination and check for wrap-around
    piece.legalMoves = [];
    for(let step of piece.step){
        const dest = piece.tileIndex + step;
        if(dest < 0 || dest > 63) continue;

        const fileFrom = piece.tileIndex % 8;
        const fileTo = dest % 8;
        const fileDiff = Math.abs(fileFrom - fileTo);
        const rankFrom = Math.floor(piece.tileIndex / 8);
        const rankTo = Math.floor(dest / 8);
        const rankDiff = Math.abs(rankFrom - rankTo);

        // verify L-shape
        if(!((fileDiff === 1 && rankDiff === 2) || (fileDiff === 2 && rankDiff === 1))) continue;

        // mark control
        board.tiles[dest].controledBy.push(piece);

        // add legal move if empty or occupied by enemy
        if(!board.tiles[dest].piece || board.tiles[dest].piece.color !== piece.color){
            piece.legalMoves.push(dest);
        }
    }
    return;
}

export function scannKingMoves(board, king){
    for(let step of king.step){
        const nextMove = king.tileIndex + step;

        if(nextMove < 0 || nextMove > 63) continue;
        if(step == -8 && nextMove < 0) continue;
        if(step == 8 && nextMove > 63) continue;
        if(step == -1 && nextMove % 8 == 7) continue;
        if(step == 1 && nextMove % 8 == 0) continue;
        if(step == -9 && (nextMove % 8 == 7 || nextMove < 0)) continue;
        if(step == -7 && (nextMove % 8 == 0 || nextMove < 0)) continue;
        if(step == 9 && (nextMove % 8 == 0 || nextMove > 63)) continue;
        if(step == 7 && (nextMove % 8 == 7 || nextMove > 63)) continue;

        let safeTile = true;
        for(let piece of board.tiles[nextMove].controledBy){
            if(piece.color != king.color){
                safeTile = false;
                break;
            }
        }
        board.tiles[nextMove].controledBy.push(king);
        if(board.tiles[nextMove].piece){
            if(board.tiles[nextMove].piece.color != king.color && safeTile){
                king.legalMoves.push(nextMove);
            }
            continue; // king cannot go past an occupied tile
        }
        if(safeTile) king.legalMoves.push(nextMove);
    }
    return;
}

export function scannRBQMoves(board, piece){
    piece.legalMoves = [];

    for(let step of piece.step){
        let nextMove = piece.tileIndex + step;

        while(true){
            if(nextMove < 0 || nextMove > 63) break;

            if(step == -8 && nextMove < 0) break;
            if(step == 8 && nextMove > 63) break;
            if(step == -1 && nextMove % 8 == 7) break;
            if(step == 1 && nextMove % 8 == 0) break;
            if(step == -9 && (nextMove % 8 == 7 || nextMove < 0)) break;
            if(step == -7 && (nextMove % 8 == 0 || nextMove < 0)) break;
            if(step == 9 && (nextMove % 8 == 0 || nextMove > 63)) break;
            if(step == 7 && (nextMove % 8 == 7 || nextMove > 63)) break;

            if(board.tiles[nextMove].piece){
                if(board.tiles[nextMove].piece.color != piece.color){
                    piece.legalMoves.push(nextMove);
                    isPiecePinned(board, step, piece);
                }
                board.tiles[nextMove].controledBy.push(piece);
                break;
            }

            board.tiles[nextMove].controledBy.push(piece);
            piece.legalMoves.push(nextMove);
            nextMove += step;
        }
    }
    return;
}