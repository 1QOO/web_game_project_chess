
export const player1 = {
    name: "Player 1",
    img: "/player/default-photo.jpeg",
    capturedPieces: [],
}

export const player2 = {
    name: "Player 2",
    img: "/player/default-photo.jpeg",
    capturedPieces: [],
}

export const gameSettings = {
    player: player1,
    opponent: null,
    timeLimit: null,
}

export class Timer{
    constructor(timeLimit, timeIsOver, getRemainingTime){
        this.timeLimit = timeLimit;
        this.whiteTimeDuration = timeLimit;
        this.blackTimeDuration = timeLimit;
        this.tickInterval;
        this.lastTick;
        this.timeOver;
        this.timeIsOver = timeIsOver;
        this.getRemainingTime = getRemainingTime;
    }
    start(isWhiteTurn) {
        const timeDuration = isWhiteTurn ? this.whiteTimeDuration : this.blackTimeDuration;
        this.lastTick = performance.now();
        this.timeOver = setTimeout(() => this.timeIsOver(), timeDuration);

        this.tickInterval = setInterval(() => {
            this.getRemainingTime(timeDuration, this.lastTick, isWhiteTurn);
        }, 1000);
    }

    /* start(){
        const timeDuration = this.isWhiteTurn? this.whiteTimeDuration: this.blackTimeDuration;
        this.lastTick = performance.now();
        this.timeOver = setInterval(()=>this.timeIsOver(), this.whiteTimeDuration);
        if(this.isWhiteTurn) {
            this.whiteDurationTick = setTimeout(()=>{
            setInterval(()=>this.getRemainingTime(timeDuration, this.lastTick, this.isWhiteTurn), 1000)},
            this.isWhiteTurn? this.whiteTimeDuration % 1000: this.blackTimeDuration % 1000);
        }else{
        this.blackDurationTick = setTimeout(()=>{
            setInterval(()=>this.getRemainingTime(timeDuration, this.lastTick, this.isWhiteTurn), 1000)},
            this.isWhiteTurn? this.whiteTimeDuration % 1000: this.blackTimeDuration % 1000);
        }
    } */
   pause(isWhiteTurn) {
        clearInterval(this.tickInterval);
        clearTimeout(this.timeOver);
        if (isWhiteTurn) this.whiteTimeDuration -= (performance.now() - this.lastTick);
        else this.blackTimeDuration -= (performance.now() - this.lastTick);
    }
    /* pause(){
        if(this.isWhiteTurn) clearInterval(this.whiteDurationTick);
        else clearInterval(this.blackDurationTick);
        clearInterval(this.timeOver);
        if(this.isWhiteTurn) this.whiteTimeDuration -= performance.now() - this.lastTick;
        else this.blackTimeDuration -= performance.now() - this.lastTick;
        this.isWhiteTurn = !this.isWhiteTurn;
    } */
}