export interface Saver {
  save(): void;
}

export class DefaultSaver implements Saver {
  save(): void {
    console.log(`Saved`);
  }
}
