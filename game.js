const gameState = {
	speed: 100
};

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	backgroundColor: "b9eaff",
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
            enableBody: true,
            debug:true
		}
	},
	scene: [StartScene]
};

const game = new Phaser.Game(config);

