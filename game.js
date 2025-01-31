const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000',
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let player, cursors, bullets, aliens, scoreText, score = 0;

function preload() {
    this.load.image('player', 'https://i.imgur.com/3Uxz7OU.png');  // Placeholder character
    this.load.image('alien', 'https://i.imgur.com/w6c3kQv.png');  // Placeholder enemy
    this.load.image('bullet', 'https://i.imgur.com/5TzN1lC.png'); // Placeholder bullet
}

function create() {
    player = this.physics.add.sprite(400, 500, 'player').setCollideWorldBounds(true);
    cursors = this.input.keyboard.createCursorKeys();
    
    bullets = this.physics.add.group({ classType: Phaser.Physics.Arcade.Image });
    aliens = this.physics.add.group();
    
    this.time.addEvent({ delay: 1000, callback: spawnAlien, callbackScope: this, loop: true });
    this.input.keyboard.on('keydown-SPACE', shootBullet, this);
    
    this.physics.add.collider(bullets, aliens, destroyAlien, null, this);
    this.physics.add.collider(player, aliens, gameOver, null, this);
    
    scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '20px', fill: '#fff' });
}

function update() {
    player.setVelocity(0);

    if (cursors.left.isDown) player.setVelocityX(-200);
    else if (cursors.right.isDown) player.setVelocityX(200);
}

function shootBullet() {
    let bullet = bullets.create(player.x, player.y - 20, 'bullet');
    if (bullet) bullet.setVelocityY(-300);
}

function spawnAlien() {
    let x = Phaser.Math.Between(50, 750);
    let alien = aliens.create(x, 50, 'alien');
    if (alien) alien.setVelocityY(100);
}

function destroyAlien(bullet, alien) {
    bullet.destroy();
    alien.destroy();
    score += 10;
    scoreText.setText('Score: ' + score);
}

function gameOver() {
    this.scene.restart();
    score = 0;
}
