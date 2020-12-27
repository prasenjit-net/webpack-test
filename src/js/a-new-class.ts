export class ANewClass {
  private data: DataClass;
  constructor(m: string, sm?: string) {
    this.data = { message: m, subMessage: sm };
  }
  public printToConsole() {
    console.info(`The message is ${this.data.message} -> ${this.data.subMessage}`);
  }
}

interface DataClass {
  message: string;
  subMessage?: string;
}
