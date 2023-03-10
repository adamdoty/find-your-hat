const { Field } = require("./field");
const prompt = require("prompt-sync")({ sigint: true });
const fieldWidth = 5;
const fieldHeight = 4;
const percentageOfHoles = 20;

let isRunning = true;

let fieldGrid;

if (process.argv.length > 2) {
  fieldGrid = Field.generateField(
    process.argv[2],
    process.argv[3],
    process.argv[4]
  );
} else {
  fieldGrid = Field.generateField(fieldHeight, fieldWidth, percentageOfHoles);
}

const myField = new Field(fieldGrid);

myField.print();

while (isRunning) {
  myField.updateValidInput();

  // ask for input until valid input is given
  let userInput = prompt("Which way? ");

  // validate input
  if (!myField.validInputs.includes(userInput)) {
    console.log(`Not a valid input. Use ${myField.validInputs.join(", ")}.`);
    continue;
  }

  let newPosition = myField.getNewPosition(userInput);

  // check if game state has changed
  if (myField.isOnHoleOrHat(newPosition)) {
    break;
  }
  myField.move(newPosition);
  myField.print();
}
