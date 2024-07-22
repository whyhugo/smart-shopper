var vegetables = 0;
var protein = 0;
var fruit = 0;
var red = 0;
var notfruit = 0;

var BootScene910 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function BootScene910 ()
    {
        Phaser.Scene.call(this, { key: 'BootScene910' });
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
        // start the WorldScene910
        this.scene.start('WorldScene910');
    }
});

var WorldScene910 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function WorldScene910 ()
    {
        Phaser.Scene.call(this, { key: 'WorldScene910' });
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


        this.addLevelText();

        this.time.delayedCall(2000, function() {
            this.scene.start('BootScene10');  // switch to Scene2
            vegetables = 0;
            protein = 0;
            fruit = 0;
            red = 0;
            notfruit = 0;
        }, [], this);
    },
    onMeetEnemy: function(player, zone) {        
        // we move the zone to some other location
        zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
        zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
        
        // shake the world
        this.cameras.main.shake(1);
        
        // start battle 
    },

    addLevelText: function() {
        // create a graphics object for the semi-transparent background
        var graphics = this.add.graphics();
        graphics.fillStyle(0xFFFFFF, 0.15); // white with 50% opacity
        graphics.fillRect(0, 0, this.cameras.main.width, 30); // position and size of the background

        // create the text
        var levelText = this.add.text(this.cameras.main.width / 2, 15, '恭喜過關！！！', {
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



