import Settings from './setting.js'
import Printer from './printer.js'
import Ball from './ball.js'
import Player from './player.js'


class Game {
    constructor() {

        this.set = new Settings()

        this.printer = new Printer(this.set)

        this.ball = new Ball(this)
        this.player1 = new Player(this, this.set.player1, 'player1')
        this.player2 = new Player(this, this.set.player2, 'player2')

        this.requestId = true

        this.firstLaunch()

    }


    // Запуск игры впервые
    firstLaunch() {

        this.printer.drawCourt()


        this.player1.draw()
        this.player2.draw()


        this.printer.drawScore(this.set.player1.point, this.set.player2.point)

        // this.printer.drawBriefing()

        this.printer.drawScore(this.set.player1.point, this.set.player2.point)

        this.startTimer(3, () => this.start(this.requestId))

    }


    timeLoop() {
        this.printer.clearGameLayer()

        this.ball.update()
        this.player1.update()
        this.player2.update()

        this.start(this.requestId)
    }



    start(reqId) {
        if (reqId) {
            requestAnimationFrame(() => this.timeLoop())
        }
    }


    startTimer(count, callback) {
        let currentCount = count
        const centerX = this.set.fieldWidth / 2
        const centerY = this.set.fieldHeight / 2

        const timerId = setInterval(() => {
            this.printer.clearCanvas('text')

            if (currentCount > 0) {
                this.printer.text.drawText(
                    currentCount.toString(),
                    centerX,
                    centerY,
                    'white', '150', 'center', 'middle'
                );
                currentCount--;
            } else {

                this.printer.clearCanvas('text');
                this.printer.text.drawText(
                    'Go!',
                    centerX,
                    centerY,
                    'white', '150', 'center', 'middle'
                );
                clearInterval(timerId)

                setTimeout(() => {
                    this.printer.clearCanvas('text');
                    callback()
                }, 800)
            }
        }, 1000)
    }

    reStart(winningPlayerName) {
        this.requestId = false

        let winner
        let loser

        if (winningPlayerName === 'player1') {
            winner = this.player1
            loser = this.player2
        } else {
            winner = this.player2
            loser = this.player1
        }


        winner.point++;

        this.printer.drawGoalText(
            winner.color,
            loser.settings.plusPointX,
            loser.settings.align
        );

        this.printer.drawScore(this.set.player1.point, this.set.player2.point);

        this.player1.defaultSet()
        this.player2.defaultSet()
        this.ball.defaultSet()

        this.printer.clearGameLayer()

        this.player1.draw()
        this.player2.draw()

        setTimeout(() => {
            this.requestId = true;
            this.startTimer(3, () => this.start(this.requestId))
        }, 2000)
    }

}


window.onload = function () {
    new Game()
}