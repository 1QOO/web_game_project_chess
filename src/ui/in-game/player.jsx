import { CapturedPieces } from "./captured-piece";
import { PlayerProfile } from "./player-profile";
import { Timer } from "./timer";
import './player.css';

export function Player({player, time}){
    return (
        <div className="player gap-2">
            <PlayerProfile player={player} />
            <CapturedPieces pieces={player.capturedPieces} />
            <Timer time={time} />
        </div>
    )
}