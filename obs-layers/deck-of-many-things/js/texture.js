const Texture = {
    allCards:     24,
    backCard:     8,
    cardHeight:   296,
    cardWidth:    180,
    cards:        22,
    cols:         6,
    fillerCards:  [9],
    height:       1224,
    marginHeight: 14,
    marginWidth:  12,
    rows:         4,
    src:          "img/domt.png",
    width:        1140,
}

function NewTexture() {
    return Object.create(Texture)
}
