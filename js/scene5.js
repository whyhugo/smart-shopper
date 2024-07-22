var vegetables = 0;
var protein = 0;
var fruit = 0;
var red = 0;
var notfruit = 0;

var BootScene5 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function BootScene5 ()
    {
        Phaser.Scene.call(this, { key: 'BootScene5' });
    },

    preload: function ()
    {
        // map tiles
        this.load.image('tiles', 'assets/map/spritesheet.png');
        
        // map in json format
        this.load.tilemapTiledJSON('map', 'assets/map/map.json');
        
        // our two characters
        this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
        
        // broccoli image
        this.load.image('broccoli', 'assets/vegetables/broccoli.png');
        this.load.image('cabbage', 'assets/vegetables/cabbage.png');
        this.load.image('carrot', 'assets/vegetables/carrot.png');
        this.load.image('corn', 'assets/vegetables/corn.png');
        this.load.image('eggplant', 'assets/vegetables/eggplant.png');
        this.load.image('onion', 'assets/vegetables/onion.png');
        this.load.image('tomato', 'assets/vegetables/tomato.png');

        this.load.image('eggs', 'assets/misc/eggs.png');
        this.load.image('meat', 'assets/misc/meat.png');

        this.load.image('apple', 'assets/fruit/apple.png');
        this.load.image('banana', 'assets/fruit/banana.png');
        this.load.image('coconut', 'assets/fruit/coconut.png');
        this.load.image('orange', 'assets/fruit/orange.png');
        this.load.image('watermelon', 'assets/fruit/watermelon.png');
    },

    create: function ()
    {
        // start the WorldScene5
        this.scene.start('WorldScene5');
    }
});

var WorldScene5 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function WorldScene5 ()
    {
        Phaser.Scene.call(this, { key: 'WorldScene5' });
    },

    preload: function ()
    {
        
    },

    create: function ()
    {
        // create the map
        var map = this.make.tilemap({ key: 'map' });
        
        // first parameter is the name of the tilemap in tiled
        var tiles = map.addTilesetImage('spritesheet', 'tiles');
        
        // creating the layers
        var grass = map.createStaticLayer('Grass', tiles, 0, 0);
        var obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
        
        // make all tiles in obstacles collidable
        obstacles.setCollisionByExclusion([-1]);
        
        // animation with key 'left', we don't need left and right as we will use one and flip the sprite
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13]}),
            frameRate: 10,
            repeat: -1
        });
        
        // animation with key 'right'
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 6, 0, 12 ] }),
            frameRate: 10,
            repeat: -1
        });        

        // our player sprite created through the phycis system
        this.player = this.physics.add.sprite(50, 100, 'player', 6);
        
        // don't go out of the map
        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true);
        
        // don't walk on trees
        this.physics.add.collider(this.player, obstacles);

        // limit camera to map
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true; // avoid tile bleed
    
        // user input
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // where the enemies will be
        this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
        for(var i = 0; i < 30; i++) {
            var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
            var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
            // parameters are x, y, width, height
            this.spawns.create(x, y, 20, 20);            
        }        
        // add collider
        this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);

        // create broccoli group
        this.broccolis = this.physics.add.group({
            key: 'broccoli',
            repeat: 4,
            setXY: { x: 10, y: 10, stepX: Phaser.Math.Between(50, 200), stepY: Phaser.Math.Between(50, 200) }
        });

        this.broccolis.children.iterate(function (broccoli) {
            broccoli.setDisplaySize(12.5, 12.5); // set size to 15x15
        });

        // add overlap detection between player and broccolis
        this.physics.add.overlap(this.player, this.broccolis, this.collectBroccoli, null, this);

        ////////////////////////////////////////////
        this.cabbage = this.physics.add.group({
            key: 'cabbage',
            repeat: 3,
            setXY: { x: 115, y: 10, stepX: Phaser.Math.Between(50, 200), stepY: Phaser.Math.Between(50, 200) }
        });

        this.cabbage.children.iterate(function (cabbage) {
            cabbage.setDisplaySize(12.5, 12.5); // set size to 15x15
        });

        // add overlap detection between player and broccolis
        this.physics.add.overlap(this.player, this.cabbage, this.collectCabbage, null, this);

        ////////////////////////////////////////////
        this.carrot = this.physics.add.group({
            key: 'carrot',
            repeat: 3,
            setXY: { x: 30, y: 10, stepX: Phaser.Math.Between(50, 200), stepY: Phaser.Math.Between(50, 200) }
        });

        this.carrot.children.iterate(function (carrot) {
            carrot.setDisplaySize(12.5, 12.5); // set size to 15x15
        });

        // add overlap detection between player and broccolis
        this.physics.add.overlap(this.player, this.carrot, this.collectCarrot, null, this);

        ////////////////////////////////////////////
        this.corn = this.physics.add.group({
            key: 'corn',
            repeat: 3,
            setXY: { x: 70, y: 140, stepX: Phaser.Math.Between(50, 200), stepY: Phaser.Math.Between(50, 200) }
        });

        this.corn.children.iterate(function (corn) {
            corn.setDisplaySize(12.5, 12.5); // set size to 15x15
        });

        // add overlap detection between player and broccolis
        this.physics.add.overlap(this.player, this.corn, this.collectCorn, null, this);

        ////////////////////////////////////////////
        this.eggplant = this.physics.add.group({
            key: 'eggplant',
            repeat: 3,
            setXY: { x: 10, y: 73, stepX: Phaser.Math.Between(50, 200), stepY: Phaser.Math.Between(50, 200) }
        });

        this.eggplant.children.iterate(function (eggplant) {
            eggplant.setDisplaySize(12.5, 12.5); // set size to 15x15
        });

        // add overlap detection between player and broccolis
        this.physics.add.overlap(this.player, this.eggplant, this.collectEggplant, null, this);

        ////////////////////////////////////////////
        this.onion = this.physics.add.group({
            key: 'onion',
            repeat: 3,
            setXY: { x: 64, y: 33, stepX: Phaser.Math.Between(50, 200), stepY: Phaser.Math.Between(50, 200) }
        });

        this.onion.children.iterate(function (onion) {
            onion.setDisplaySize(12.5, 12.5); // set size to 15x15
        });

        // add overlap detection between player and broccolis
        this.physics.add.overlap(this.player, this.onion, this.collectOnion, null, this);

        ////////////////////////////////////////////
        this.tomato = this.physics.add.group({
            key: 'tomato',
            repeat: 3,
            setXY: { x: 26, y: 93, stepX: Phaser.Math.Between(50, 200), stepY: Phaser.Math.Between(50, 200) }
        });

        this.tomato.children.iterate(function (tomato) {
            tomato.setDisplaySize(12.5, 12.5); // set size to 15x15
        });

        // add overlap detection between player and broccolis
        this.physics.add.overlap(this.player, this.tomato, this.collectTomato, null, this);

        ////////////////////////////////////////////
        this.eggs = this.physics.add.group({
            key: 'eggs',
            repeat: 3,
            setXY: { x: 199, y: 76, stepX: Phaser.Math.Between(50, 200), stepY: Phaser.Math.Between(50, 200) }
        });

        this.eggs.children.iterate(function (eggs) {
            eggs.setDisplaySize(12.5, 12.5); // set size to 15x15
        });

        // add overlap detection between player and broccolis
        this.physics.add.overlap(this.player, this.eggs, this.collectEggs, null, this);

        ////////////////////////////////////////////
        this.meat = this.physics.add.group({
            key: 'meat',
            repeat: 3,
            setXY: { x: 51, y: 179, stepX: Phaser.Math.Between(50, 200), stepY: Phaser.Math.Between(50, 200) }
        });

        this.meat.children.iterate(function (meat) {
            meat.setDisplaySize(12.5, 12.5); // set size to 15x15
        });

        // add overlap detection between player and broccolis
        this.physics.add.overlap(this.player, this.meat, this.collectMeat, null, this);

        ////////////////////////////////////////////
        this.apple = this.physics.add.group({
            key: 'apple',
            repeat: 3,
            setXY: { x: 11, y: 69, stepX: Phaser.Math.Between(50, 200), stepY: Phaser.Math.Between(50, 200) }
        });

        this.apple.children.iterate(function (apple) {
            apple.setDisplaySize(12.5, 12.5); // set size to 15x15
        });

        // add overlap detection between player and broccolis
        this.physics.add.overlap(this.player, this.apple, this.collectApple, null, this);

        ////////////////////////////////////////////
        this.banana = this.physics.add.group({
            key: 'banana',
            repeat: 3,
            setXY: { x: 43, y: 122, stepX: Phaser.Math.Between(50, 200), stepY: Phaser.Math.Between(50, 200) }
        });

        this.banana.children.iterate(function (banana) {
            banana.setDisplaySize(12.5, 12.5); // set size to 15x15
        });

        // add overlap detection between player and broccolis
        this.physics.add.overlap(this.player, this.banana, this.collectBanana, null, this);

        ////////////////////////////////////////////
        this.coconut = this.physics.add.group({
            key: 'coconut',
            repeat: 3,
            setXY: { x: 29, y: 108, stepX: Phaser.Math.Between(50, 200), stepY: Phaser.Math.Between(50, 200) }
        });

        this.coconut.children.iterate(function (coconut) {
            coconut.setDisplaySize(12.5, 12.5); // set size to 15x15
        });

        // add overlap detection between player and broccolis
        this.physics.add.overlap(this.player, this.coconut, this.collectCoconut, null, this);

        ////////////////////////////////////////////
        this.orange = this.physics.add.group({
            key: 'orange',
            repeat: 3,
            setXY: { x: 102, y: 54, stepX: Phaser.Math.Between(50, 200), stepY: Phaser.Math.Between(50, 200) }
        });

        this.orange.children.iterate(function (orange) {
            orange.setDisplaySize(12.5, 12.5); // set size to 15x15
        });

        // add overlap detection between player and broccolis
        this.physics.add.overlap(this.player, this.orange, this.collectOrange, null, this);

        ////////////////////////////////////////////
        this.watermelon = this.physics.add.group({
            key: 'watermelon',
            repeat: 3,
            setXY: { x: 72, y: 154, stepX: Phaser.Math.Between(50, 200), stepY: Phaser.Math.Between(50, 200) }
        });

        this.watermelon.children.iterate(function (watermelon) {
            watermelon.setDisplaySize(12.5, 12.5); // set size to 15x15
        });

        // add overlap detection between player and broccolis
        this.physics.add.overlap(this.player, this.watermelon, this.collectWatermelon, null, this);

        this.addLevelText();
    },
    onMeetEnemy: function(player, zone) {        
        // we move the zone to some other location
        zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
        zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
        
        // shake the world
        this.cameras.main.shake(1);
        
        // start battle 
    },
    collectBroccoli: function (player, broccoli) {
        broccoli.disableBody(true, true);  // broccoli disappears
        vegetables += 1;
        notfruit += 1;
        if (red >= 2 && vegetables >= 3) {
            this.scene.start('BootScene56');  // switch to Scene2
        }
      // increment vegetables count
    },
    collectCabbage: function (player, cabbage) {
        cabbage.disableBody(true, true);  // broccoli disappears
        vegetables += 1;
        notfruit += 1;
        if (red >= 2 && vegetables >= 3) {
            this.scene.start('BootScene56');  // switch to Scene2
        }  // increment vegetables count
    },
    collectCarrot: function (player, carrot) {
        carrot.disableBody(true, true);  // broccoli disappears
        vegetables += 1;
        notfruit += 1;
        if (red >= 2 && vegetables >= 3) {
            this.scene.start('BootScene56');  // switch to Scene2
        }  // increment vegetables count
    },
    collectCorn: function (player, corn) {
        corn.disableBody(true, true);  // broccoli disappears
        vegetables += 1;
        notfruit += 1;
        if (red >= 2 && vegetables >= 3) {
            this.scene.start('BootScene56');  // switch to Scene2
        }  // increment vegetables count
    },
    collectEggplant: function (player, eggplant) {
        eggplant.disableBody(true, true);  // broccoli disappears
        vegetables += 1;
        notfruit += 1;
        if (red >= 2 && vegetables >= 3) {
            this.scene.start('BootScene56');  // switch to Scene2
        }  // increment vegetables count
    },
    collectOnion: function (player, onion) {
        onion.disableBody(true, true);  // broccoli disappears
        vegetables += 1;
        notfruit += 1;
        if (red >= 2 && vegetables >= 3) {
            this.scene.start('BootScene56');  // switch to Scene2
        }  // increment vegetables count
    },
    collectTomato: function (player, tomato) {
        tomato.disableBody(true, true);  // broccoli disappears
        vegetables += 1;
        notfruit += 1;
        red += 1;
        if (red >= 2 && vegetables >= 3) {
            this.scene.start('BootScene56');  // switch to Scene2
        }  // increment vegetables count
    },
    collectEggs: function (player, eggs) {
        eggs.disableBody(true, true);  // broccoli disappears
        protein += 1;
        notfruit += 1;
        this.scene.start('BootSceneRestart');  // increment vegetables count
    },
    collectMeat: function (player, meat) {
        meat.disableBody(true, true);  // broccoli disappears
        protein += 1;
        notfruit += 1;
        red += 1;
        if (red >= 2 && vegetables >= 3) {
            this.scene.start('BootScene56');  // switch to Scene2
        }  // increment vegetables count
    },
    collectApple: function (player, apple) {
        apple.disableBody(true, true);  // broccoli disappears
        fruit += 1;
        red += 1;
        if (red >= 2 && vegetables >= 3) {
            this.scene.start('BootScene56');  // switch to Scene2
        }  // increment vegetables count
    },
    collectBanana: function (player, banana) {
        banana.disableBody(true, true);  // broccoli disappears
        fruit += 1;
        this.scene.start('BootSceneRestart');
        // increment vegetables count
    },
    collectCoconut: function (player, coconut) {
        coconut.disableBody(true, true);  // broccoli disappears
        fruit += 1;
        this.scene.start('BootSceneRestart');
       // increment vegetables count
    },
    collectOrange: function (player, orange) {
        orange.disableBody(true, true);  // broccoli disappears
        fruit += 1;
        this.scene.start('BootSceneRestart');
        // increment vegetables count
    },
    collectWatermelon: function (player, watermelon) {
        watermelon.disableBody(true, true);  // broccoli disappears
        fruit += 1;
        red += 1;
        if (red >= 2 && vegetables >= 3) {
            this.scene.start('BootScene56');  // switch to Scene2
        }  // increment vegetables count
    },

    addLevelText: function() {
        // create a graphics object for the semi-transparent background
        var graphics = this.add.graphics();
        graphics.fillStyle(0xFFFFFF, 0.15); // white with 50% opacity
        graphics.fillRect(0, 0, this.cameras.main.width, 40); // position and size of the background

        // create the text
        var levelText = this.add.text(this.cameras.main.width / 2, 20, '第五關\n請蒐集 2 個紅色的食物 & 3 個蔬菜', {
            font: '12px Arial',
            fill: '#fff'
        });
        levelText.setOrigin(0.5, 0.5); // center the text
    },

    update: function (time, delta)
    {
    //    this.controls.update(delta);
    
        this.player.body.setVelocity(0);

        // Horizontal movement
        if (this.cursors.left.isDown)
        {
            this.player.body.setVelocityX(-80);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.setVelocityX(80);
        }

        // Vertical movement
        if (this.cursors.up.isDown)
        {
            this.player.body.setVelocityY(-80);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.body.setVelocityY(80);
        }        

        // Update the animation last and give left/right animations precedence over up/down animations
        if (this.cursors.left.isDown)
        {
            this.player.anims.play('left', true);
            this.player.flipX = true;
        }
        else if (this.cursors.right.isDown)
        {
            this.player.anims.play('right', true);
            this.player.flipX = false;
        }
        else if (this.cursors.up.isDown)
        {
            this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.anims.play('down', true);
        }
        else
        {
            this.player.anims.stop();
        }
    }
});



