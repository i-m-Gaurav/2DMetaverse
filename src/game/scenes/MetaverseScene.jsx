import Phaser from 'phaser';

export default class MetaverseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MetaverseScene' });
        this.player = null;
    }

    preload() {
        // Load a simple placeholder for the avatar
        this.load.image('avatar', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
      }

    create() {

          // Desk area setup
    const deskX = 200;
    const deskY = 300;
    this.createDesk(deskX, deskY, 'Your Desk', 0x3498db);

    this.createDesk(400, 300, 'His Desk',0x3476db);

    // Create the player sprite at the desk position
    this.player = this.physics.add.sprite(deskX, deskY, 'avatar');
    this.player.setCollideWorldBounds(true); // Prevents player from leaving scene bounds

    // Set up keyboard controls
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    
  }

  addNewUser(user) {
    this.createUserDesk(user);
}

createUserDesk(user) {
    if (!this.userDesks[user.uid]) {
        const x = Math.random() * 600 + 100;
        const y = Math.random() * 400 + 100;
        const desk = this.createDesk(x, y, `${user.displayName}'s Desk`, 0x3498db);
        this.userDesks[user.uid] = desk;
    }
}

createDesk(x, y, label, color) {
    const desk = this.add.rectangle(x, y, 150, 100, color);
    this.add.text(x - 30, y - 40, label, { fill: '#ffffff' });
    return desk;
}

    

    update() {
        // Reset player velocity to stop previous movement
        this.player.setVelocity(0);
    
        // Set player velocity based on keyboard input
        const speed = 150;
        if (this.cursors.up.isDown) {
          this.player.setVelocityY(-speed);
        } else if (this.cursors.down.isDown) {
          this.player.setVelocityY(speed);
        }
        if (this.cursors.left.isDown) {
          this.player.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
          this.player.setVelocityX(speed);
        }
      }
    
}