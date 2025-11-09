export interface IEngine {
  doSomething1(task: string): Promise<string>;
  doSomething2(task: string): Promise<string>;
  doSomething3(task: string): Promise<number>;
}
