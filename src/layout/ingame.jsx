import { CreateBoard } from '/src/ui/board';
import { setPieces, selectTile } from '../lib/gameLogic';
import { Player } from '/src/ui/in-game/player'
import { gameSettings } from '/src/lib/game-settings';
import './in-game-layout.css';

export function InGame(){
    return (
        <div className='in-game-layout'>
            <Player player={gameSettings.player1} time={gameSettings.timeLimit}/>
            <CreateBoard board={setPieces()} callBack={selectTile} />
            <Player player={gameSettings.player2} time={gameSettings.timeLimit}/>
        </div>
    )
}