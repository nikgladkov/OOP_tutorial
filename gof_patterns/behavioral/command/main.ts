import { Invoker, SaveCommand, UndoCommand } from "./commands";
import { DefaultSaver } from "./saver";
import * as readline from "readline";

const invoker = new Invoker();
const defaultsaver = new DefaultSaver();
const saveCommand = new SaveCommand(defaultsaver);
const undoCommand = new UndoCommand();

console.log(`\n==Document is opened==\n`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("S - Save, U - Undo, Q - Quit:");

rl.on("line", (input) => {
  const cmd = input.trim().toUpperCase();

  switch (cmd) {
    case "S":
      invoker.setCommand(saveCommand);
      invoker.execute();
      break;
    case "U":
      invoker.setCommand(undoCommand);
      invoker.execute();
      break;
    case "Q":
      console.log("Quit");
      rl.close();
      return;
    default:
      console.log("Unknown command");
  }

  console.log("What's next?");
});
