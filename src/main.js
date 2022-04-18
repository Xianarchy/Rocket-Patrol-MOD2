let config = {
  type: Phaser.CANVAS,
  width: 640,
  height: 480,
  scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);


let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;


let keyF, keyR, keyLEFT, keyRIGHT;

//Points break down
// Track a high score that persists across scenes and display it in the UI (5)
// Add your own (copyright-free) background music to the Play scene (5)
// Implement the speed increase that happens after 30 seconds in the original game (5)
// Randomize each spaceship's movement direction at the start of each play (5)
// Display the time remaining (in seconds) on the screen (10)
// Replace the UI borders with new artwork (10)
// Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
// Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20) 
// Implement mouse control for player movement and mouse click to fire (20)
// Total Points : 100
// Background image source: https://unsplash.com/s/photos/white-sky