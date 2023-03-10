const { getRandomIntInclusive, getRandomInt } = require("./utils");
const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this.field = field;
    this.player = {
      position: {
        x: 0,
        y: 0,
      },
    };
    this.validInputs = [];
    this.xUpperBounds = this.field[0].length - 1;
    this.yUpperBounds = this.field.length - 1;
    this.updateValidInput();
  }

  static generateField(height, width, holePerctentage) {
    // height - make that number of arrays
    // width - make the contents of the arrays, consider holeCoverage
    // pick random - decide where the hat should go
    // 4 5 20%
    const field = [];
    for (let i = 0; i < height; i++) {
      let fieldRow = [];
      for (let i = 0; i < width; i++) {
        let holeChance = getRandomIntInclusive(1, 100);
        let fieldTile = fieldCharacter;
        if (holeChance <= holePerctentage - 1) {
          fieldTile = hole;
        }
        fieldRow.push(fieldTile);
      }
      field.push(fieldRow);
    }
    field[getRandomInt(1, height)][getRandomInt(1, width)] = hat;
    field[0][0] = pathCharacter;

    return field;
  }

  print() {
    this.field.forEach((row) => console.log(row.join("")));
  }

  updateValidInput() {
    // reset validInput
    this.validInputs = ["l", "r", "u", "d"];

    // remove any directions that cause out of bounds
    if (this.player.position.x - 1 < 0) {
      this.validInputs = this.validInputs.filter(
        (direction) => direction != "l"
      );
    }

    if (this.player.position.x + 1 > this.xUpperBounds) {
      this.validInputs = this.validInputs.filter(
        (direction) => direction != "r"
      );
    }

    if (this.player.position.y - 1 < 0) {
      this.validInputs = this.validInputs.filter(
        (direction) => direction != "u"
      );
    }

    if (this.player.position.y + 1 > this.yUpperBounds) {
      this.validInputs = this.validInputs.filter(
        (direction) => direction != "d"
      );
    }
  }

  getNewPosition(direction) {
    // if direction is not in valid input, then reprompt the user
    let [x, y] = [0, 0];
    if (direction === "l") {
      x = -1;
    } else if (direction === "r") {
      x = 1;
    } else if (direction === "u") {
      y = -1;
    } else if (direction === "d") {
      y = 1;
    }
    const newPosition = {
      x: this.player.position.x + x,
      y: this.player.position.y + y,
    };
    return newPosition;
  }

  isOnHoleOrHat(position) {
    const positionContents = this.field[position.y][position.x];
    if (positionContents === "O") {
      console.log("Sorry, you fell down a hole.");
      return true;
    } else if (positionContents === "^") {
      console.log("Congrats! You found your hat!");
      return true;
    } else {
      return false;
    }
  }

  move(position) {
    this.player.position.x = position.x;
    this.player.position.y = position.y;
    this.field[this.player.position.y][this.player.position.x] = "*";
  }
}

module.exports = {
  Field,
};
