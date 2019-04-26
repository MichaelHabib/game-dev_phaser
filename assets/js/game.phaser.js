var game = new Phaser.Game(800, 600, Phaser.Auto, 'Game', {
    preload: preload,
    create: create,
    update: update
});
//Workaround for HUD rendering issues!
var scoreText;
//Making data.json available globally.
var dataJSON;
var genpain_spritesJSON;
//HUD Objects
var HUD = {};
var HUDData = {
    "hp": {
        "label": "HP",
        "value": 10

    },
    "score": {
        "label": "Score",
        "value": 0

    }

};

var player;
var cursors;

function preload() {
    game.load.json('data', 'assets/data/data.json');
    game.load.json('genpain_sprites', 'assets/data/genpain_sprites.json');
    //Get assets information from data
    $.getJSON("assets/data/data.json", function(data) {
        $.each(data.assets.images, function(key, val) {
            game.load.image(key, val);
        });
        $.each(data.assets.spriteSheets, function(key, val) {
            game.load.spritesheet(key, val.file, val.w, val.h);
        });

    });
}

function create() {
    ///////////////////////////////////
    //GAME SETTINGS and DATA
    //Load JSO file through Phaser. Other JSON code also exists in preload(). 
    dataJSON = game.cache.getJSON('data');
    genpain_spritesJSON = game.cache.getJSON('genpain_sprites');
    // Stretch to fill
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    //Full Screen Game
    //game.input.onDown.add(fullScreenDisplay, this);
    
    ///////////////////////////////////
    //Create HUD 
    createHUD();

    ///////////////////////////////////
    //Create a star.
    var star = game.add.sprite(game.world.centerX, game.world.centerY, 'star');
    //Moves the image anchor to the middle, so it centers inside the game properly
    star.anchor.set(0.5);
    //Make star clickable.
    star.inputEnabled = true;
    star.events.onInputDown.add(detectClick, this);

    ///////////////////////////////////
    //  This sprite was created with the Phaser Gen Paint app
    //  also available in the Phaser Examples repo and on the Phaser site.
    var dudeData = genpain_spritesJSON.dude;
    game.create.texture('phaserDude', dudeData, 4, 4, 0);

    player = game.add.sprite(300, 300, 'phaserDude');
    player.anchor.set(0.5);

}

function update() {

}

function createHUD() {
    //Set golab variable scoreText.
    //ToDo: Find a way to push HUD to HUD{} global object. 
    scoreText = game.add.text(16, 16, 'score:' + HUDData.score.value, {
        fontSize: '316px',
        fill: '#fff'
    });


}

function updateHUD() {
    //HUD.score.txt = 'score:' + HUDData.score.value;
    //console.info("updateHUD() > HUDData.score.value = " + HUDData.score.value);
    //console.info("updateHUD() > HUD.score.txt = " + HUD.score.txt);
    scoreText.text = 'score:' + HUDData.score.value;

}

//Used to update score on click.
function detectClick() {
    //alert("star clicked");  
    var score = HUDData.score.value;
    HUDData.score.value = score + 1;
    updateHUD();


}


function fullScreenDisplay() {

    if (game.scale.isFullScreen) {
        game.scale.stopFullScreen();
    }
    else {
        game.scale.startFullScreen(false);
    }

}
