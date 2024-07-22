var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 320,
    height: 240,
    zoom: 2,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 320,
        height: 240,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false // set to true to view zones
        }
    },
    scene: [
        BootSceneStart,
        WorldSceneStart,
        BootSceneRestart,
        WorldSceneRestart,
        BootSceneEnd,
        WorldSceneEnd,
        BootScene1,
        WorldScene1,
        BootScene12,
        WorldScene12,
        BootScene2,
        WorldScene2,
        BootScene23,
        WorldScene23,
        BootScene3,
        WorldScene3,
        BootScene34,
        WorldScene34,
        BootScene4,
        WorldScene4,
        BootScene45,
        WorldScene45,
        BootScene5,
        WorldScene5,
        BootScene56,
        WorldScene56,
        BootScene6,
        WorldScene6,
        BootScene67,
        WorldScene67,
        BootScene7,
        WorldScene7,
        BootScene78,
        WorldScene78,
        BootScene8,
        WorldScene8,
        BootScene89,
        WorldScene89,
        BootScene9,
        WorldScene9,
        BootScene910,
        WorldScene910,
        BootScene10,
        WorldScene10,
    ]
};

var game = new Phaser.Game(config);

function resize() {
    game.scale.setMaxZoom();
  }

window.addEventListener("resize", resize);