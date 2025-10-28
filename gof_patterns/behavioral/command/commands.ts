import { Saver } from "./saver";

export interface Command {
  execute(): void;
}

export class SaveCommand implements Command {
  recivier: Saver;

  constructor(receiver: Saver) {
    this.recivier = receiver;
  }

  execute(): void {
    this.recivier.save();
  }
}

export class UndoCommand implements Command {
  execute(): void {
    console.log(`Undo`);
  }
}

export class Invoker {
  private command: Command | undefined;

  setCommand(command: Command) {
    this.command = command;
  }

  execute() {
    this.command.execute();
  }
}
