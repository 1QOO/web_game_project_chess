import { CreateBoard } from '/src/ui/in-game/board';
import { setPieces, selectTile } from '/src/lib/gameLogic';
import { PlayerProfile, CapturedPieces, Time } from '/src/ui/in-game/player'
import { gameSettings } from '/src/lib/game-settings';
import { Toolbar } from '../ui/in-game/toolbar';
import { History } from '../ui/in-game/history';
import './in-game-layout.css';

export let playerDuration = {};
export let opponentDuration = {};

export function InGame(){
    return (
        <div className='in-game-layout'>
            <div className="player gap-2">
                <PlayerProfile player={gameSettings.opponent} />
                <CapturedPieces />
                <Time time={opponentDuration} />
            </div>
            <CreateBoard board={setPieces()} callBack={selectTile} />
            <div className="player gap-2">
                <PlayerProfile player={gameSettings.player} />
                <CapturedPieces />
                <Time time={playerDuration} />
            </div>
            <div className='grow side-layout flex flex-col gap-2'>
                <Toolbar />
                <History />
            </div>
        </div>
    )
}