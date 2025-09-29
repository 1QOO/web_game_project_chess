import { whitePieces,blackPieces } from "./pieces/pieces";

class tile {
    constructor(id){
        this.id = id;
        this.color = null;
        this.piece = null;
        this.highlight = null;
        this.controledBy = [];
        
        if(Math.floor(id/8)%2===0) this.color = id%2===0?"light-square":"dark-square";
        else this.color = id%2===1?"light-square":"dark-square";
    }
}


export const board = {
    tiles : [],
    whiteKingIndex : 60,
    blackKingIndex : 4,
    enPasantTarget : null,
    pinnedPiece : [],
    movePiece : function(startTile, end){
        const piece = startTile.piece;
        const pieceColor = startTile.piece.color;
        const pieceNotation = startTile.piece.notation;
        let renderTiles = [startTile.id];
        
        if(this.enPasantTarget)this.enPasantTarget = null;

        //PAWN HAS SPECIAL MOVE PATTERN(EN PASANT), SO IT HAS DIFFERENT HANDLING
        if(pieceNotation == 'p'){
            const enPasant = this.pawnMoves(piece, end);
            if(enPasant) renderTiles.push(enPasant);
        }

        //KING ALSO HAS SPECIAL MOVE PATTERN (CASTLING), THIS FUNCTION IS FOR HANDLING KING MOVE
        if(pieceNotation === 'K'){
            let castling = null;
            pieceColor === "white"? this.whiteKingIndex = end: this.blackKingIndex = end;

            if(piece.tileIndex-end === 2 || piece.tileIndex-end === -2) castling = this.castle(startTile.id, end);
            if(castling) renderTiles=renderTiles.concat(castling);
            if(piece.hasNotMoved) piece.hasNotMoved = false;
        }
        //IF MOVED PIECE IS ROOK, SET IT TO NOT BE ABLE TO CASTLING ANYMORE
        if((pieceNotation === 'R') && piece.hasNotMoved) piece.hasNotMoved = false;

        piece.tileIndex = end;
        end = this.tiles[end];
        //SET CAPTURED PIECE TO BE NOT PLAYABLE
        if(end.piece) end.piece.legalMoves = null;

        end.piece = piece;
        startTile.piece = null;
        renderTiles.push(end.id);

        //RESET PIECE CONTROL ON TILE
        for (let tile of this.tiles) tile.controledBy = [];
        //SCANN ENTIRE TILES AND IF IT HAS PIECE ON IT SCANN ITS LEGAL MOVE
        for (let tile of this.tiles) if(tile.piece) this.scannMoves(tile.piece);
        //RESET LEGAL MOVE OF PINNED PIECE SO IT WONT UNBLOCK THE ATTACK
        for(let pair of this.pinnedPiece){
            const newLegalMoves = pair.pinnedPiece.legalMoves.filter((move)=>{
                return pair.attackerVisionIndex.includes(move);
            });
            pair.pinnedPiece.legalMoves = newLegalMoves;
        }
        //RESET PIECE(S) IS PINNED
        this.pinnedPiece = [];

        this.isChecked(pieceColor);
        this.kingScanns();

        const opponentPieces = pieceColor==="white"? whitePieces: blackPieces;
        const opponentKing = pieceColor==="white"?this.tiles[this.whiteKingIndex]: this.tiles[this.blackKingIndex];
        let endGame = true;
        for(let piece of opponentPieces){
            if(piece.notation !== 'K') if(piece.legalMoves.length){
                endGame = false;
                break;
            }
        }
        if(endGame){
            if(opponentKing.legalMoves.length) endGame = false;
            else{
                let checkmate = false;
                for(let piece of this.tiles[opponentKing.tileIndex].controledBy) if(piece.color !== opponentKing.color) checkmate = true;
                if(checkmate){
                    alert("CHECKMATE.");
                }
                else{
                    alert("STALEMATE.");
                }
            }
        }

        return renderTiles;
    },
    pawnMoves : function(piece, end){
        if(piece.firstMove){
            piece.firstMove = false;
            let isTwoSteps = piece.tileIndex - end;
            isTwoSteps<0?isTwoSteps*=-1:isTwoSteps;

            if(isTwoSteps === 16) this.enPasantTarget = end;
            piece.moves.pop();
        }

        //PAWN DOES EN PASANT
        if((piece.tileIndex%8 !== end%8) && !(this.tiles[end].piece)){
            let target = 0;
            piece.color == "white"?target = 8: target = -8;
            const targetTile = this.tiles[end+target];
            targetTile.piece = null;

            return targetTile.id;
        }
        else return null;
    },
    scannMoves : function(piece){
        piece.legalMoves = [];

        if(piece.notation === 'p'){
            this.pawnScanns(piece);
        }
        else if(piece.notation !== 'K'){
            for (let move of piece.moves){
                let nextMove = piece.tileIndex+move;
                piece.controlsTiles = [];
                let pinnedPiece = null;
                let attackerVisionIndex = [];

                while(true){

                    //POINT BREAKER
                    if (0>nextMove || nextMove>63) break;
                    if(move === 1 && nextMove%8 === 0) break;
                    if(move === -1 && nextMove%8 === 7) break;
                    if((move === 7 || move === -9) && nextMove%8 === 7) break;
                    if((move === 9 || move === -7) && nextMove%8 === 0) break;
                    //KNIGHT MOVE PATTERNS
                    if((move === 15 || move === 17) && nextMove%8 === 0) break;
                    if((move === -6 || move === 10) && nextMove%8 < 2) break;
                    if((move === -17 || move === 15) && nextMove%8 === 7) break;
                    if((move === -10 || move === 6) && nextMove%8 > 5) break;
    
                    if(this.tiles[nextMove].piece){
                        if(this.tiles[nextMove].piece.color != piece.color){
                            if(!pinnedPiece){
                                attackerVisionIndex.push(nextMove);
                                piece.legalMoves.push(nextMove);
                                this.tiles[nextMove].controledBy.push(piece);
                                if(this.tiles[nextMove].piece.notation !== 'K') pinnedPiece = this.tiles[nextMove].piece;
                            }
                            else {
                                if(this.tiles[nextMove].piece.notation === 'K'){
                                    this.pinnedPiece.push({attackerVisionIndex : [piece.tileIndex, ...attackerVisionIndex], pinnedPiece : pinnedPiece});
                                }
                                else break;
                            }
                        }
                        else {
                            this.tiles[nextMove].controledBy.push(piece);
                            break;
                        }
                    }
                    else {
                        if(!pinnedPiece){
                            piece.legalMoves.push(nextMove);
                            this.tiles[nextMove].controledBy.push(piece);
                        }
                        attackerVisionIndex.push(nextMove);
                    }
                    nextMove += move;
                    if(piece.notation === 'N') break;
                    
                    piece.controlsTiles.concat(piece.legalMoves);
                }
            }
        }
    },
    pawnScanns : function(piece){

        for(let move of piece.moves){
            if(piece.tileIndex+move<0 || piece.tileIndex>63 || this.tiles[piece.tileIndex+move].piece) break;
            piece.legalMoves.push(piece.tileIndex+move);
        }

        for(let move of piece.controlsTiles){
            const tileIndex = piece.tileIndex;

            if(tileIndex + move <0 || tileIndex + move >63) break;
            if(tileIndex%8 == 0 && (move === -9 || move === 7)) continue;
            if(tileIndex%8 == 7 && (move === -7 || move === 9)) continue;
            if(this.tiles[tileIndex + move].piece && this.tiles[tileIndex + move].piece.color !== piece.color){
                piece.legalMoves.push(tileIndex + move);
            }
            this.tiles[tileIndex+move].controledBy.push(piece);
        }
        for(let enPasant of [-1, 1]){
            const tileIndex = piece.tileIndex;
            let row = 0;
            piece.color == "white"?row=-8:row=8;

            if(tileIndex%8 == 0 && enPasant === -1) continue;
            if(tileIndex%8 == 7 && enPasant === 1) continue;
            if(tileIndex + enPasant == this.enPasantTarget && this.enPasantTarget.color !== piece.color) piece.legalMoves.push(tileIndex+enPasant+row);
        }
    },
    kingScanns : function(){
        const kings = [this.tiles[this.whiteKingIndex].piece, this.tiles[this.blackKingIndex].piece];

        for(let king of kings){
            king.legalMoves = [];
            for(let move of king.moves){
                const nextMove = king.tileIndex+move;
                const nextTile = this.tiles[nextMove];
                let opponentColor = "";
                let isTileSafe = true;
                king.color=="white"?opponentColor="black":opponentColor="white";

                if (0>nextMove || nextMove>63) continue;

                if(move === 1 && nextMove%8 === 0) continue;
                if(move === -1 && nextMove%8 === 7) continue;
                if((move === 7 || move === -9) && nextMove%8 === 7) continue;
                if((move === 9 || move === -7) && nextMove%8 === 0) continue;
                if((move === 15 || move === 17) && nextMove%8 === 0) continue;
                if((move === -6 || move === 10) && nextMove%8 < 2) continue;
                if((move === -17 || move === 15) && nextMove%8 === 7) continue;
                if((move === -10 || move === 6) && nextMove%8 > 5) continue;

                for(let tile of nextTile.controledBy){
                    if (tile.color === opponentColor){
                        isTileSafe = false;
                        break;
                    }
                }

                if(this.tiles[nextMove].piece){
                    if(nextTile.piece.color === opponentColor){
                        if(isTileSafe) king.legalMoves.push(nextMove);
                        nextTile.controledBy.push(king);
                        continue;
                    }
                    else{
                        nextTile.controledBy.push(king);
                        continue;
                    }
                }
                if(isTileSafe)king.legalMoves.push(nextMove);
                nextTile.controledBy.push(king);
            }
            this.castlingScann(king);
        }
        
    },
    isChecked : function(opponentColor){
        const kingTile = opponentColor === "white"?this.tiles[this.blackKingIndex]:this.tiles[this.whiteKingIndex];
        let checkCount = 0;
        let doubleCheck = false;
        let attacker;

        for (let piece of kingTile.controledBy) if (piece.color === opponentColor){
            attacker = piece;
            checkCount++;
        }

        if(checkCount){
            alert("Check.");
            this.checkResponse(kingTile, opponentColor, doubleCheck, attacker);
        }
    },
    checkResponse : function(kingTile, opponentColor, doubleCheck, attacker){
        const piecesSet = opponentColor === "white"? blackPieces: whitePieces;
        let step;
        const attackerVision = [];
        const attackerVisionIndex = [];
        
        const kingIndex = kingTile.piece.tileIndex;

        if(doubleCheck){
            for(let piece of piecesSet) piece.legalMoves = [];
            return;
        }

        if(attacker.notation === 'N'){
            let defenderPieces = [];

            for(let piece of this.tiles[attacker.tileIndex].controledBy) if(piece.color !== opponentColor) defenderPieces.push(piece);
            for(let piece of piecesSet) piece.legalMoves = [];
            for(let piece of defenderPieces) piece.legalMoves.push(attacker.tileIndex);
            return;
        }

        let attackerIndex = attacker.tileIndex;
        if(kingIndex%8 === attackerIndex%8) kingIndex>attackerIndex? step=8: step=-8; //KING AND ATTACKER ARE VERTICAL
        if(kingIndex - attackerIndex<8 || kingIndex - attackerIndex>-8) kingIndex>attackerIndex? step=1: step=-1; //KING AND ATTACKER ARE HORIZONTAL
        if(kingIndex%8>attackerIndex%8) kingIndex>attackerIndex? step=9: step=-7; //KING AND ATTACKER ARE DIAGONAL '/'
        if(kingIndex%8<attackerIndex%8) kingIndex>attackerIndex? step=7: step=-9; //KING AND ATTACKER ARE DIAGONAL '\'

        // GET ATTACKER VISION TO THE KING
        while(true){
            if(attackerIndex === kingIndex) break;
            attackerVision.push(this.tiles[attackerIndex]);
            attackerVisionIndex.push(attackerIndex);
            attackerIndex+=step;
        }
        
        //GET PAWN THAT CAN BLOCK OR CAPTURE THE ATTACKER
        for(let piece of piecesSet){
            if(piece.notation === 'p' && piece.legalMoves){
                for(let move of piece.legalMoves){
                    if(attackerVisionIndex.includes(move)){
                        piece.legalMoves = [move]
                        break;
                    }
                }
                if(!attackerVisionIndex.includes(piece.legalMoves[0])) piece.legalMoves = [];
            }
        }
        
        //GET PIECE THAT CAN BLOCK OR CAPTURE THE ATTACKER
        for(let piece of piecesSet) if(piece.notation !== 'p') piece.legalMoves = [];
        for(let tile of attackerVision){
            for(let piece of tile.controledBy){
                if(piece.color !== opponentColor && piece.notation !== 'p'){
                    piece.legalMoves.push(tile.id)
                }
            }
        }
    },
    castlingScann : function(king){
        let kingIsSafe = true;
        for(let piece of this.tiles[king.tileIndex].controledBy) if(piece.color !== king.color) kingIsSafe = false;

        if(king.hasNotMoved && kingIsSafe){
            let shortCastling = true;
            let longCastling = true;
            const leftCornerTile = this.tiles[king.tileIndex-4];
            const rightCornerTile = this.tiles[king.tileIndex+3];

            //CHECK IF ROOK IN THE CORNER HASN'T MOVED AND TILES BETWEEN KING AND ROOK ARE SAFE
            if(leftCornerTile.piece && leftCornerTile.piece.color === king.color && leftCornerTile.piece.notation === 'R' && leftCornerTile.piece.hasNotMoved){
                for(let tileIndex = king.tileIndex-1; tileIndex%8>0; tileIndex--){
                    if(this.tiles[tileIndex].piece){
                        longCastling = false;
                        break;
                    }
                    if(tileIndex%8>1){
                        for(let piece of this.tiles[tileIndex].controledBy) if(piece.color !== king.color){
                            longCastling = false;
                            break;
                        }
                    }
                }
            }
            else{
                longCastling = false;
            }
            if(rightCornerTile.piece && rightCornerTile.piece.color === king.color && rightCornerTile.piece.notation === 'R' && rightCornerTile.piece.hasNotMoved){
                for(let tileIndex = king.tileIndex+1; tileIndex%8<7; tileIndex++){
                    if(this.tiles[tileIndex].piece){
                        shortCastling = false;
                        break;
                    }
                    if(tileIndex%8<7){
                        for(let piece of this.tiles[tileIndex].controledBy) if(piece.color !== king.color){
                            shortCastling = false;
                            break;
                        }
                    }
                }
            }
            else{
                shortCastling = false;
            }
            if(longCastling)king.legalMoves.push(king.tileIndex-2);
            if(shortCastling)king.legalMoves.push(king.tileIndex+2);
        }
    },
    castle : function(start, end){
        //LONG CASTLING
        if(start>end){
            this.tiles[start-1].piece = this.tiles[start-4].piece;
            this.tiles[start-4].piece = null;
            this.tiles[start-1].piece.tileIndex = start-1;
            this.tiles[start-1].piece.hasNotMoved = false;

            return [this.tiles[start-1].id, this.tiles[start-4].id];
        }
        //SHORT CASTLING
        else {
            this.tiles[start+1].piece = this.tiles[start+3].piece;
            this.tiles[start+3].piece = null;
            this.tiles[start+1].piece.tileIndex = start+1;
            this.tiles[start+1].piece.hasNotMoved = false;

            return [this.tiles[start+1].id, this.tiles[start+3].id];
        }
    }
}

for (let i=0; i<64; i++) board.tiles.push(new tile(i));