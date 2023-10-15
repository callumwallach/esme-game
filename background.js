class Layer {
  constructor(game, width, height, speedModifier, image) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedModifier = speedModifier;
    this.image = image;
    this.x = 0;
    this.y = 0;
  }
  update() {
    this.x =
      this.x < -this.width ? 0 : this.x - this.game.speed * this.speedModifier;
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

class Background {
  constructor(game) {
    this.game = game;
    // this.width = 1667;
    // this.height = 500;
    this.width = 1024;
    this.height = 512;
    this.layer1image = document.getElementById("layer1");
    this.layer2image = document.getElementById("layer2");
    this.layer3image = document.getElementById("layer3");
    this.layer4image = document.getElementById("layer4");
    this.layer5image = document.getElementById("layer5");
    this.layer6image = document.getElementById("layer6");
    this.layer7image = document.getElementById("layer7");
    this.layer1 = new Layer(
      this.game,
      this.width,
      this.height,
      0,
      this.layer1image
    );
    this.layer2 = new Layer(
      this.game,
      this.width,
      this.height,
      0.17,
      this.layer2image
    );
    this.layer3 = new Layer(
      this.game,
      this.width,
      this.height,
      0.34,
      this.layer3image
    );
    this.layer4 = new Layer(
      this.game,
      this.width,
      this.height,
      0.51,
      this.layer4image
    );
    this.layer5 = new Layer(
      this.game,
      this.width,
      this.height,
      0.68,
      this.layer5image
    );
    this.layer6 = new Layer(
      this.game,
      this.width,
      this.height,
      0.83,
      this.layer6image
    );
    this.layer7 = new Layer(
      this.game,
      this.width,
      this.height,
      1,
      this.layer7image
    );
    this.backgroundLayers = [
      this.layer1,
      this.layer2,
      this.layer3,
      this.layer4,
      this.layer5,
      this.layer6,
      this.layer7,
    ];
  }
  update() {
    this.backgroundLayers.forEach((layer) => layer.update());
  }
  draw(context) {
    this.backgroundLayers.forEach((layer) => layer.draw(context));
  }
}

export default Background;
