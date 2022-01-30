const Board = {
    minMargin:   24,
    maxMargin:   64,
    midPoint:   600,
    width:     1200,

    _cards:     [],
    _cardWidth: 0,
    _mode:      "stack",

    clear: function() {
        this._cards = []
        $(".card").each(function(_, div) {
            div.remove()
        })
    },

    remove: function(card) {
        var id = card.id()
        this._cards[id] = undefined
        this.render()
    },

    withCard: function(card) {
        card.id(this._cards.push(card) - 1)
        this._cardWidth = card.width()
    },

    mode: function(mode) {
        if (mode == "stack") {
            this._mode = "stack"
        } else if (mode == "deal") {
            this._mode = "deal"
        }

        this.render()
        if (this._mode) {
            return this._mode
        }
        return "stack"
    },

    render: function() {
        var count = 0
        for (i = 0; i < Object.keys(this._cards).length; i++) {
            if (this._cards[i]) {
                count++
            }
        }

        var margin = 0
        var yFactor = 0
        var renderedWidth = this._cardWidth
        if (count > 1) {
            if (this._mode == "stack") {
                margin = 1
                yFactor = 1
            } else {
                margin = Math.floor((this.width - this._cardWidth) / (count - 1))
                if (margin > this.maxMargin) {
                    margin = this.maxMargin
                } else if (margin < this.minMargin) {
                    margin = this.minMargin
                }
            }
            
            renderedWidth = (margin * (count - 1)) + this._cardWidth
        }

        var j = 0
        var left = this.midPoint - Math.floor(renderedWidth / 2)

        $.each(this._cards, function(_, card) {
            if (card) {
                card.render(this._canvas, left + (j * margin), j * margin * yFactor, 0, 0)
                j++
            }
        }.bind(this))
    },
}

function NewBoard(canvas) {
    var obj = Object.create(Board)
    obj._canvas = canvas
    return obj
}
