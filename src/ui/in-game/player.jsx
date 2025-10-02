import { CapturedPieces } from "./captured-piece";
import { PlayerProfile } from "./player-profile";
import { Timer } from "./timer";

export function Player({player, time}){
    return (
        <div className="flex gap-1 p-2">
            <PlayerProfile player={player} />
            <CapturedPieces pieces={player.capturedPieces} />
            <Timer time={time} />
        </div>
    )
}