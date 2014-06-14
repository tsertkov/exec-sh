# exec-sh

Execute shell command forwarding all stdio streams.

[![Build Status](https://travis-ci.org/tsertkov/exec-sh)](https://travis-ci.org/tsertkov/exec-sh)
[![NPM version](https://badge.fury.io/js/exec-sh.png)](http://badge.fury.io/js/exec-sh)
[![David Status](https://david-dm.org/tsertkov/exec-sh.png)](https://david-dm.org/tsertkov/exec-sh) 

---

## Showcase
```
// JavaScript

execSh("echo hello exec-sh && bash", { cwd: "/home" }, function(err){
  if (err) {
    console.log("Exit code: ", err.code);
  }
});
```

```
// Terminal output: interactive bash session

hello exec-sh
bash-3.2$ pwd
/home
bash-3.2$ exit 99
exit
Exit code:  99
```

## Features

exec-sh is a wrapper for child_process.spawn with improvements:

- Cross platform command execution:
  - Windows: `cmd /C COMMAND`
  - others: `sh -c COMMAND`
- Fowrards all stdio streams to current terminal (by default):
  - try `execSh("bash")`
  - try `execsh("echo -n Say: && read i && echo Said:$i")`
- stdout and stderr are passed to callback when available
  - try `execSh("pwd", console.log)`

## Installation

`npm install exec-sh`

## Usage

```
var execSh = require("../");

// run interactive bash shell
execSh("echo lorem && bash", { cwd: "/home" }, function(err){
  if (err) {
    console.log("Exit code: ", err.code);
    return;
  }

  // collect streams output
  var child = execSh(["bash -c id", "echo lorem >&2"], true,
    function(err, stdout, stderr){
      console.log("error: ", err);
      console.log("stdout: ", stdout);
      console.log("stderr: ", stderr);
    });
});
```

## Release history

- 0.1.0 Initial release

## Testing

`npm test`

## License

The MIT License (MIT)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/tsertkov/exec-sh/trend.png)](https://bitdeli.com/free "Bitdeli Badge")