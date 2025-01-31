const gameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#222',
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 600 }, debug: false }
    },
    scene: { preload, create, update }
};

let player, cursors, score = 0, scoreText, obstacles;
const game = new Phaser.Game(gameConfig);

function preload() {
    this.load.image('player', 'https://i.imgur.com/3Uxz7OU.png');
    this.load.image('obstacle', 'https://i.imgur.com/Ff1Kf8j.png');
}

function create() {
    player = this.physics.add.sprite(100, 500, 'player').setCollideWorldBounds(true);
    cursors = this.input.keyboard.createCursorKeys();
    
    obstacles = this.physics.add.group();
    this.time.addEvent({ delay: 1500, callback: spawnObstacle, callbackScope: this, loop: true });

    this.physics.add.collider(player, obstacles, gameOver, null, this);

    scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '20px', fill: '#fff' });

    this.input.on('pointerdown', jump);
}

function update() {
    if (player.body.touching.down) {
        player.setVelocityY(-400);
    }
}

function jump() {
    if (player.body.touching.down) {
        player.setVelocityY(-400);
    }
}

function spawnObstacle() {
    let obstacle = obstacles.create(800, 550, 'obstacle');
    obstacle.setVelocityX(-200);
    obstacle.setCollideWorldBounds(false);
}

function gameOver() {
    this.scene.restart();
    score = 0;
}

Telegram.WebApp.ready();
