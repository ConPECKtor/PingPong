import Settings from './setting.js'

class Ball {
    constructor(game) {
        this.game = game
        this.set = new Settings()


        this.speed = this.set.ball.speed
        this.radius = this.set.ball.radius
        this.color = this.set.ball.color

        this.x = this.set.ball.defaultXCoords
        this.y = this.set.ball.defaultYCoords

        this.dx = 0
        this.dy = 0

        this.beatenCounter = 0
    }

    getRandom() {
        return Math.random() * (1 - 0.8) + 0.8
    }

    getRandomDirection() {
        return Math.random() < 0.5 ? -1 : 1
    }

    dropBall(align) {
        this.speed = this.set.ball.speed

        let dirX = this.getRandom() * this.getRandomDirection()
        let dirY = this.getRandom() * this.getRandomDirection()

        if (align === 'left') {
            dirX = Math.abs(dirX) * -1
        } else if (align === 'right') {
            dirX = Math.abs(dirX)
        }

        this.dx = dirX
        this.dy = dirY
    }

    move() {
        this.x += this.dx * this.speed
        this.y += this.dy * this.speed
    }

    checkCollisionWithWalls() {
        if (this.x + this.radius > this.set.fieldWidth) {
            this.game.reStart('player1')
        }

        else if (this.x - this.radius < 0) {
            this.game.reStart('player2')
        }

        if (this.y - this.radius < 0 || this.y + this.radius > this.set.fieldHeight) {
            this.dy = -this.dy
        }

    }

    reverseBall(axis) {
        if (axis === 'x') {
            this.dx = this.getRandom() * (this.dx > 0 ? -1 : 1)
        } else {
            this.dy = this.getRandom() * (this.dy > 0 ? -1 : 1)
        }
    }

    draw() {
        this.game.printer.drawBall(this)
    }

    update() {
        this.checkCollisionWithWalls()
        this.move()
        this.draw()
    }

    defaultSet() {
        this.x = this.set.ball.defaultXCoords
        this.y = this.set.ball.defaultYCoords
        this.speed = this.set.ball.speed
        this.beatenCounter = 0
    }
}

export default Ball
