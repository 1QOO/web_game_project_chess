import './style.css';
import {pawn, rook, knight, bishop, queen, king} from './pieces.js';
import { createBoard } from './board.js';

document.querySelector("#app").innerHTML = createBoard();

document.addEventListener("DOMContentLoaded",()=>{
    //WHITE PIECES
    const whitePawn1 = new pawn(6, 0, "white", "/img/white_pawn_highlighted.png");
    const whitePawn2 = new pawn(6, 1, "white", "/img/white_pawn_highlighted.png");
    const whitePawn3 = new pawn(6, 2, "white", "/img/white_pawn_highlighted.png");
    const whitePawn4 = new pawn(6, 3, "white", "/img/white_pawn_highlighted.png");
    const whitePawn5 = new pawn(6, 4, "white", "/img/white_pawn_highlighted.png");
    const whitePawn6 = new pawn(6, 5, "white", "/img/white_pawn_highlighted.png");
    const whitePawn7 = new pawn(6, 6, "white", "/img/white_pawn_highlighted.png");
    const whitePawn8 = new pawn(6, 7, "white", "/img/white_pawn_highlighted.png");
    const whiteRook1 = new rook(7, 0, "white", "/img/white_rook_highlighted.png");
    const whiteRook2 = new rook(7, 7, "white", "/img/white_rook_highlighted.png");
    const whiteKnight1 = new knight(7, 1, "white", "/img/white_knight_highlighted.png");
    const whiteKnight2 = new knight(7, 6, "white", "/img/white_knight_highlighted.png");
    const whiteBishop1 = new bishop(7, 2, "white", "/img/white_bishop_highlighted.png");
    const whiteBishop2 = new bishop(7, 5, "white", "/img/white_bishop_highlighted.png");
    const whiteQueen = new queen(7, 3, "white", "/img/white_queen_highlighted.png");
    const whiteKing = new king(7, 4, "white", "/img/white_king_highlighted.png");
    //BLACK PIECES
    const blackPawn1 = new pawn(1, 0, "black", "/img/black_pawn_highlighted.png");
    const blackPawn2 = new pawn(1, 1, "black", "/img/black_pawn_highlighted.png");
    const blackPawn3 = new pawn(1, 2, "black", "/img/black_pawn_highlighted.png");
    const blackPawn4 = new pawn(1, 3, "black", "/img/black_pawn_highlighted.png");
    const blackPawn5 = new pawn(1, 4, "black", "/img/black_pawn_highlighted.png");
    const blackPawn6 = new pawn(1, 5, "black", "/img/black_pawn_highlighted.png");
    const blackPawn7 = new pawn(1, 6, "black", "/img/black_pawn_highlighted.png");
    const blackPawn8 = new pawn(1, 7, "black", "/img/black_pawn_highlighted.png");
    const blackRook1 = new rook(0, 0, "black", "/img/black_rook_highlighted.png");
    const blackRook2 = new rook(0, 7, "black", "/img/black_rook_highlighted.png");
    const blackKnight1 = new knight(0, 1, "black", "/img/black_knight_highlighted.png");
    const blackKnight2 = new knight(0, 6, "black", "/img/black_knight_highlighted.png");
    const blackBishop1 = new bishop(0, 2, "black", "/img/black_bishop_highlighted.png");
    const blackBishop2 = new bishop(0, 5, "black", "/img/black_bishop_highlighted.png");
    const blackQueen = new queen(0, 4, "black", "/img/black_queen_highlighted.png");
    const blackKing = new king(0, 3, "black", "/img/black_king_highlighted.png");
});