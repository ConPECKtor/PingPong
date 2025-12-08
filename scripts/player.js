import Settings from './setting.js'

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

        this.shadowUp = 0
        this.shadowDown = 0
        this.yellowZone = false
        this.canReverse = true

        this.addKeyListeners()
    }

    addKeyListeners() {
        document.addEventListener('keydown', (event) => this.keyController(event, true))
        document.addEventListener('keyup', (event) => this.keyController(event, false))
    }

    // @param {Event} event
    // @param {boolean} isPressed

    // Вот эти 2 штуки ругаются, неправильный синтаксис почему то 

    keyController(event, isPressed) {
    
        if (this.keys.has(event.keyCode)) {
        
            const direction = this.keys.get(event.keyCode)
            
        
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
        
            if (this.y > border) {
            
                this.y -= speed
            } else {
            
                this.y = border
            }
        
            this.shadowUp = speed * 2
        }

        if (this.down) {
            
            if (this.y + pHeight < fieldHeight - border) { 
            
                this.y += speed
            } else {
            
                this.y = fieldHeight - border - pHeight
            }
        
            this.shadowDown = speed * 2
        }

    
    }

    draw() {
        
        this.game.printer.drawPlayer(this)
    }

    defaultSet() {
    
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