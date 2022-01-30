const Card = {
    _texture: {},
    _board:   {},
    _deck:    {},
    _front:   {},
    _back:    {},

    id: function(id) {
        if (id !== undefined) {
            this._id = id
        }
        
        return this._id
    },

    back: function(back) {
        this._back = this.sprite(back)
    },

    front: function(front) {
        this._front = this.sprite(front)
    },

    width: function() {
        return this._texture.cardWidth
    },

    deck: function(deck) {
        if (deck) {
            this._deck = deck
        }
        return this._deck
    },

    board: function(board) {
        if (board) {
            this._board = board
        }                    
        return this._board
    },

    texture: function(texture) {
        if (texture) {
            this._texture = texture
        }
        return this._texture
    },

    sprite: function(id) {
        var x = id % this._texture.cols
        var y = Math.floor(id / this._texture.cols)
        
        var left = x * (this._texture.cardWidth + this._texture.marginWidth)
        var right = left + this._texture.cardWidth
        var top = y * (this._texture.cardHeight + this._texture.marginHeight) - y
        var bottom = top + this._texture.cardHeight

        return {
            id: id,
            left: left,
            right: right,
            top: top,
            bottom: bottom,
        }
    },

    select: function() {
        this._deck.pulled(this.id())
        this._board.remove(this)
        this.selected($("#card-" + this.id() + "-back"))
        this.selected($("#card-" + this.id() + "-front"))
    },

    selected: function(div) {
        div.toggleClass("selected")
        
        var x = this._board.midPoint - (this._texture.cardWidth / 2)
        var y = this._texture.cardHeight + 32
        this.moveTo(div, x, y, 2000, function(){
            this.flip(div, 5000)
        }.bind(this))
    },

    flip: function(div) {
        div.toggleClass("flipped")
        div.delay(5000).fadeOut(1000, div.remove.bind(div))
    },

    moveTo: function(div, x, y, t, after) {
        div.animate({"left": x, "top": y}, t, after)
        this._left = x
        this._top = y
    },

    hoverIn: function() {
        $("#card-" + this.id() + "-back").animate({"left": this._left, "top": this._top + 16}, 250)
    },

    hoverOut: function() {
        $("#card-" + this.id() + "-back").animate({"left": this._left, "top": this._top}, 250)
    },

    render: function(canvas, x, y, z) {
        if (!$("#card-" + this.id() + "-back").length) {
            this._left = this._board.midPoint - (this.width() / 2)

            this._imgBack = $("<img>", {"src": this._texture.src})
                .css({
                    "margin-top": -this._back.top + "px",
                    "margin-left": -this._back.left + "px",
                })
            
            divBack = $("<div>", {
                "id": "card-" + this.id() + "-back",
                "class": "card face back",
            })
                .css({
                    "left": this._left + "px",
                    "top": y + "px",
                })
                .click(this.select.bind(this))
                .hover(
                    this.hoverIn.bind(this),
                    this.hoverOut.bind(this),
                )
                .append(this._imgBack)
            
            this._imgFront = $("<img>", {"src": this._texture.src})
                .css({
                    "margin-top": -this._front.top + "px",
                    "margin-left": -this._front.left + "px",
                })
            
            divFront = $("<div>", {
                "id": "card-" + this.id() + "-front",
                "class": "card face front",
            })
                .css({
                    "left": this._left + "px",
                    "top": y + "px",
                })
                .append(this._imgFront)
            
            canvas.append(divFront, divBack)
        }

        this.moveTo($("#card-" + this.id() + "-back"), x, y, 1000)
        this.moveTo($("#card-" + this.id() + "-front"), x, y, 1000)
    },
}

function NewCard(texture, board, deck) {
    var back = texture.backCard
    var card = deck.draw()

    if (card == undefined) {
        return
    }

    var obj = Object.create(Card)
    obj.texture(texture)
    obj.board(board)
    obj.deck(deck)
    obj.back(back)
    obj.front(card)
    return obj
}
