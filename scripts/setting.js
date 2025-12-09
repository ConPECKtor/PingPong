
class Settings {
    constructor(params) {
        this.fieldWidth = 1280
        this.fieldHeight = 720   
        this.fieldBorderRadius = 20
        this.fieldBackgroundColor = "lavander" 
        this.borderThickness = 10
        this.borderColor = "#004A7F"
        this.textTimerColor = "white"
        this.scoreTextColor = "#606060"
        this.technicalColor = "orange"
        this.highlightColor = "red"

        this.ball = {
            speed: 5,
            radius: 3,
            defaultXCoords: this.fieldWidth / 2,
            defaultYCoords: this.fieldHeight / 2,
            color: "red",
            beatenCounter: 0,
            returnSpeed: 3,
            x: this.fieldWidth / 2,
            y: this.fieldHeight / 2,
            accelerationX: 3,
            accelerationY: 3
            
        }

        this.player = {
            width: 10,
            height: 30,
            speed: 4,
            distanceFrowTopBottom: 30,
            distanceFromWall: 20, 
            defaultY: (this.fieldHeight / 2) - (100 / 2),
        }

        this.player1 = {
            point: 0,
            plusPointX: (this.fieldWidth / 2) - 40,
            color: "red",
            keys: new Map([
                [87, 'up'], // W
                [83, 'down'] // S
            ]) 
        }

        this.player2 = {
            point: 0,
            plusPointX: (this.fieldWidth / 2) - 40,
            color: "blue",
            keys: new Map([
                [38, 'up'], // Стрелка вверх
                [40, 'down'] // Стрелка вниз
            ]) 
        }
    }
}

export default Settings