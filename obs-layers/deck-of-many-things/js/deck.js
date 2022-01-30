const Deck = {
    _drew:    {},
    _pulled:  {},
    _texture: {},

    texture: function(texture) {
        this._texture = texture
    },

    draw: function(id) {
        if (id) {
            this._drew[id] = true
            return id
        }

        if (Object.keys(this._drew).length == this._texture.allCards) {
            return
        }

        do{
            d = Math.floor(Math.random() * this._texture.allCards)
        } while(this._drew[d])
        this._drew[d] = true

        return d
    },

    pulled: function(id) {
        this._pulled[id] = true
        localStorage.setItem("pulled-cards", JSON.stringify(this._pulled))
    },

    reset: function(cache){
        if (cache) {
            localStorage.setItem("pulled-cards", JSON.stringify({}))    
        }

        this._pulled = {}
        if (localStorage.getItem("pulled-cards")) {
            this._pulled = JSON.parse(localStorage.getItem("pulled-cards"))
        }
        localStorage.setItem("pulled-cards", JSON.stringify(this._pulled))

        this._drew = {}
        this._drew[this._texture.backCard] = true
        
        $.each(this._texture.fillerCards, function(_, id) {
            this._drew[id] = true
        }.bind(this))

        $.each(this._pulled, function(id) {
            this._drew[id] = true
        }.bind(this))
    },
}

function NewDeck(texture) {
    var obj = Object.create(Deck)
    obj.texture(texture)
    obj.reset()
    return obj
}
