import {whitePawns, blackPawns} from "./pawn.js";
import {whiteRooks, blackRooks} from "./rook.js";
import {whiteKnights, blackKnights} from "./knight.js"
import {whiteBishops, blackBishops} from "./bishop.js";
import {whiteQueen, blackQueen} from "./queen.js";
import {whiteKing, blackKing} from "./king.js"

export const whitePieces = [...whitePawns, whiteRooks[0], whiteKnights[0], whiteBishops[0], whiteQueen, whiteKing, whiteBishops[1], whiteKnights[1], whiteRooks[1]];
export const blackPieces = [blackRooks[0], blackKnights[0], blackBishops[0], blackQueen, blackKing, blackBishops[1], blackKnights[1], blackRooks[1], ...blackPawns];