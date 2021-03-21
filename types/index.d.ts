declare module 'exec-sh' {
  import { SpawnOptionsWithoutStdio, ChildProcessWithoutNullStreams } from 'child_process';

  export type execShCallback = (error: Error | null, stdout: string, stderr: string) => void;
  export type execShThis = {
    promise(command: string | string[], options: SpawnOptionsWithoutStdio, callback: execShCallback): ChildProcessWithoutNullStreams;
  }

  declare function execSh (this: execShThis, command: string | string[], options: SpawnOptionsWithoutStdio, callback: execShCallback): ChildProcessWithoutNullStreams;
  declare function execSh (this: execShThis, command: string | string[], callback: execShCallback): ChildProcessWithoutNullStreams;
}