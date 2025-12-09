import Canvas from './canvas.js'

class Printer {
    constructor(set) {
        this.set = set

        this.ballDirectionAngle = 0

        this.layers = new Map([
            ["background", new Canvas(set)],
            ["score", new Canvas(set)],
            ["other", new Canvas(set)],
            ["text", new Canvas(set)],
            ["game", new Canvas(set)]
        ])


        this.background = this.layers.get("background")
        this.score = this.layers.get("score")
        this.other = this.layers.get("other")
        this.text = this.layers.get("text")
        this.game = this.layers.get("game")
    }

    drawCourt() {
        this.background.drawRoundRect(
            0, 0, this.set.fieldWidth, this.set.fieldHeight,
            this.set.fieldBorderRadius,
            this.set.fieldBackgroundColor,
            this.set.borderColor, this.set.borderThickness
        )
        const centerX = this.set.fieldWidth / 2

        this.background.drawLine(
            centerX, 0,
            centerX, this.set.fieldHeight,
            this.set.borderThickness, this.set.borderColor
        )

        const circleRadius = this.set.fieldHeight / 4
        this.background.drawCircle(
            centerX, this.set.fieldHeight / 2, 
            circleRadius, 
            'transparent', 
            this.set.borderColor, this.set.borderThickness 
        )

        const distFromWall = this.set.player.distanceFromWall 
        const courtHeight = this.set.fieldHeight

        this.background.drawLine(distFromWall, 0, distFromWall, courtHeight, this.set.borderThickness, this.set.borderColor)
        
        this.background.drawLine(this.set.fieldWidth - distFromWall, 0, this.set.fieldWidth - distFromWall, courtHeight, this.set.borderThickness, this.set.borderColor)
    }

    drawBall(ball) {
        this.game.drawCircle(
            ball.x, ball.y, 
            ball.radius, 
            ball.color 
        );
    }

    drawPlayer(player) {

        const borderThickness = player.width * 2
        const y2 = player.y + this.set.player.height

        this.game.drawLine(
            player.x, player.y, 
            player.x, y2, 
            borderThickness,
            player.color 
        )
    }


    clearCanvas(layerName) {
        
        const canvas = this.layers.get(layerName)
        if (canvas) {
            canvas.clear()
        }
    }

    clearGameLayer() {
        this.game.clear()
    }


    drawScore(player1Score, player2Score) {
        this.score.clear()
        const centerX = this.set.fieldWidth / 2
        const scoreY = 80

        
        this.score.drawText(
            player1Score, centerX - 20, scoreY, 
            this.set.player1.color, '48', 
            'right', 'bottom'
        )

        
        this.score.drawText(
            player2Score, centerX + 20, scoreY, 
            this.set.player2.color, '48', 
            'left', 'bottom'
        )
    } // 

    drawGoalText(playerColor, plusOneX, plusOneAlign) {
        const centerX = this.set.fieldWidth / 2
        const centerY = this.set.fieldHeight / 2

        this.text.drawText('Goal!', centerX, centerY, playerColor, '90', 'center', 'middle')

        this.text.drawText('+1', plusOneX, centerY + 120, playerColor, '40', plusOneAlign, 'middle')
        
        setTimeout(() => {
            this.text.clear()
        }, 800)
    }
}


export default Printer
