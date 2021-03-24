declare module 'exec-sh' {
  import { ChildProcess } from 'child_process';

  declare function execSh (
    command: string | string[],
    options?: object | true,
    callback?: (
      error: Error | null,
      stdout: string,
      stderr: string
    ) => void
  ): ChildProcess;

  declare namespace execSh {
    declare const promise: (
      command: string | string[],
      options?: object | true
    ) => Promise<{ stdout: string, stderr: string }>;
  }

  export default execSh;
}
