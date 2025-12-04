import Settings from "./setting.js"

let set = new Settings()

class Canvas {
    constructor(set) {
        this.set = set

        this.canvas = document.createElement("canvas")

        this.ctx = this.canvas.getContext("2d")

        this.canvas.width = set.width
        this.canvas.height = set.height
        
        document.getElementById("#game").appendChild(this.canvas)
    }

    drawText(text, x, y, color, size, align, textBaseline) {
        this.ctx.fillStyle = color 

        this.ctx.font = `${size}px Arial`

        this.ctx.alignText = align

        this.ctx.textBaseline = textBaseline

        this.ctx.fillText(text, x, y)
    }

    drawLine(x1,y1,x2,y2,thickness,color) {
        this.ctx.beginPath()
        this.ctx.lineCap = "round"
        this.ctx.moveTo(x1,y1)
        this.ctx.lineTo(x2,y2)
        this.ctx.lineWidth = thickness
        this.ctx.strokeStyle = color
        this.ctx.stroke()
        this.ctx.closePath()
    }

    drawRoundRect(x, y, width, height, radius, fillColor, lineColor, lineThickness) {
        this.ctx.beginPath()
        this.ctx.moveTo(x + radius, y)

        this.ctx.lineTo(x + width - radius, y)
        this.ctx.quadranticCurveTo(x + width, y, x + width, y + radius)

        this.ctx.lineTo(x + width, y + height - radius)
        this.ctx.quadranticCurveTo(x + width, y + height, x + width - radius, y + height)

        this.ctx.lineTo(x + radius, y + height)
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius)

        this.ctx.lineTo(x, y + radius)
        this.ctx.quadraticCurveTo(x, y, x + radius, y)

        this.ctx.closePath()

        this.ctx.fillStyle = fillColor
        this.ctx.fill()

        this.ctx.strokeStyle = lineColor
        this.ctx.lineWidth = lineThickness
        this.ctx.stroke()
    }

    drawCircle(x, y, radius, color, lineColor = false, lineThickness = 0) {
        this.ctx.beginPath()

        this.ctx.arc(x,y,radius, 0, Math * PI)

        this.ctx.fillStyle = color

        this.ctx.fill()

        if (lineColor) {
            this.ctx.strokeStyle = lineColor
            this.ctx.lineWidth = lineThickness
            this.ctx.stroke()
        }

        this.ctx.closePath()
    }

    drawArc(x,y,radius, startAngle, endAngle, thickness, color) {
        this.ctx.beginPath()

        this.ctx.arc(x, y, radius, startAngle, endAngle)

        this.ctx.lineCap = "round"
        this.ctx.strokeStyle = color
        this.ctx.lineWidth = thickness
        this.ctx.stroke()

        this.ctx.closePath()
    }

    clear() {
        this.ctx.clearRect(0,0,this.set.width,this.set.height)
    }
}

export default Canvas
