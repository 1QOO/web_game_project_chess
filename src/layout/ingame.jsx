import { CreateBoard } from '/src/ui/in-game/board';
import { setPieces, selectTile, playerDuration, opponentDuration } from '/src/lib/gameLogic';
import { Player } from '/src/ui/in-game/player'
import { gameSettings } from '/src/lib/game-settings';
import { Toolbar } from '../ui/in-game/toolbar';
import { History } from '../ui/in-game/history';
import './in-game-layout.css';

export function InGame(){
    return (
        <div className='in-game-layout'>
            <CreateBoard board={setPieces()} callBack={selectTile} />
            <Player player={gameSettings.opponent} duration={opponentDuration} />
            <Player player={gameSettings.player} duration={playerDuration} />
            <div className='grow side-layout flex flex-col gap-2'>
                <Toolbar />
                <History />
            </div>
        </div>
    )
}