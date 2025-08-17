import {whitePawns, blackPawns} from "./pawn.js";
import {whiteRooks, blackRooks} from "./rook.js";
import {whiteKnights, blackKnights} from "./knight.js"
import {whiteBishops, blackBishops} from "./bishop.js";
import {whiteQueen, blackQueen} from "./queen.js";
import {whiteKing, blackKing} from "./king.js"

export const whitePieces = [...whitePawns, ...whiteRooks, ...whiteKnights, ...whiteBishops, whiteQueen, whiteKing];
export const blackPieces = [...blackPawns, ...blackRooks, ...blackKnights, ...blackBishops, blackQueen, blackKing];