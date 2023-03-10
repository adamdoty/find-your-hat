const { Field } = require("./field");
const prompt = require("prompt-sync")({ sigint: true });

let isRunning = true;

const myField = new Field(Field.generateField(4, 5, 20));

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
