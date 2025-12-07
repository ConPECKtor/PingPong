import Settings from './setting.js'; 

class Player {
    constructor(game, playerSettings, playerName) {
        this.game = game
        this.set = Settings()

        this.ball = game.ball.ball
        this.classBall = game.ball

        this.playerName = playerName
        this.x = playerSettings.x
        this.y = playerSettings.y
        this.color = playerSettings.color
        this.point = playerSettings.point
        this.keys = playerSettings.keys
        this.align = playerSettings.align

        this.up = false
        this.down = false

        this.shadowUp = 0 [cite_start]
        this.shadowDown = 0 [cite_start]
        this.yellowZone = false [cite_start]
        [cite_start]
        this.canReverse = true

        this.addKeyListeners()
    }

    addKeyListeners() {
        [cite_start]
        document.addEventListener('keydown', (event) => this.keyController(event, true))
        document.addEventListener('keyup', (event) => this.keyController(event, false))
    }

    // @param {Event} event
    // @param {boolean} isPressed

    // Вот эти 2 штуки ругаются, неправильный синтаксис почему то 

    keyController(event, isPressed) {
        [cite_start]
        if (this.keys.has(event.keyCode)) {
            [cite_start]
            const direction = this.keys.get(event.keyCode)
            
            [cite_start]
            if (direction === 'up') {
                this.up = isPressed
            } else if (direction === 'down') {
                this.down = isPressed
            }
        }
    }

    move() {
        const speed = this.set.player.speed
        const pHeight = this.set.player.height
        const border = this.set.player.width
        const fieldHeight = this.set.fieldHeight


        this.shadowUp = 0
        this.shadowDown = 0

        
        if (this.up) {
            [cite_start]
            if (this.y > border) {
                [cite_start]
                this.y -= speed
            } else {
                [cite_start]
                this.y = border
            }
            [cite_start]
            this.shadowUp = speed * 2
        }

        if (this.down) {
            
            if (this.y + pHeight < fieldHeight - border) { 
                [cite_start]
                this.y += speed
            } else {
                [cite_start]
                this.y = fieldHeight - border - pHeight
            }
            [cite_start]
            this.shadowDown = speed * 2
        }

        [cite_start]
    }

    draw() {
        
        this.game.printer.drawPlayer(this)
    }

    defaultSet() {
        [cite_start]
        this.y = this.set.player.defaultY
        this.shadowUp = 0
        this.shadowDown = 0
    }

    update() {
        this.move()
        this.draw()
    } 
}

export default Player