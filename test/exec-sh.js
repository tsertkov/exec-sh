/*global describe, it, before, beforeEach, after, afterEach */
var
  execSh = require(".."),
  assert = require("assert"),
  sinon = require("sinon"),
  merge = require("merge"),
  cp = require("child_process");

describe("exec-sh", function(){

  describe("module.exports", function(){
    it("should export a single function", function(){
      assert.equal(typeof execSh, "function");
    });
  });

  describe("#execSh() arguments", function(){
    var spawn, exitCode;

    beforeEach(function(){
      exitCode = 0;
      spawn = sinon.stub(cp, "spawn");
      spawn.returns({
        spawn_return: true,
        on: function(e, c){
          if (e === "close") {
            c(exitCode);
          }
        }
      });
    });

    afterEach(function(){
      cp.spawn.restore();
    });

    it("should pass command to spawn function", function(){
      execSh("command");
      sinon.assert.calledOnce(spawn);
      assert.equal("command", spawn.getCall(0).args[1][1]);
    });

    it("should accept array of commands to run", function(){
      execSh(["command1", "command2"]);
      sinon.assert.calledOnce(spawn);
      assert.equal("command1;command2", spawn.getCall(0).args[1][1]);
    });

    it("should accept true as options argument", function(){
      execSh("command", true);
      sinon.assert.calledOnce(spawn);
      assert.equal(spawn.getCall(0).args[2].stdio, null);
    });

    it("should merge defaults with options", function(){
      execSh("command");
      var defOptionsClone = merge(true, spawn.getCall(0).args[2]);
      var options = { key: "value" };

      execSh("command", options);
      assert.deepEqual(spawn.getCall(1).args[2], merge(true, defOptionsClone, options));

      // change value of the fist property in default options to null
      assert.ok(Object.keys(defOptionsClone).length > 0);
      defOptionsClone[Object.keys(defOptionsClone)[0]] = null;

      execSh("command", defOptionsClone);
      assert.deepEqual(spawn.getCall(2).args[2], defOptionsClone);
    });

    it("should accept optional 'callback' parameter", function(){
      var callback = sinon.spy();
      execSh("command", callback);
      execSh("command", { key: "value" }, callback);
      sinon.assert.callCount(callback, 2);
    });

    it("should use 'cmd /C' command prefix on windows", function(){
      var platform = process.platform;
      process.platform = "win32";
      execSh("command");
      process.platform = platform;

      sinon.assert.calledOnce(spawn);
      assert.equal(spawn.getCall(0).args[0], "cmd");
    });

    it("should use 'sh -c' command prefix on *nix", function(){
      var platform = process.platform;
      process.platform = "linux";
      execSh("command");
      process.platform = platform;

      sinon.assert.calledOnce(spawn);
      assert.equal(spawn.getCall(0).args[1][0], "-c");
      assert.equal(spawn.getCall(0).args[0], "sh");
    });

    it("should return spawn() result", function(){
      assert(execSh("command").spawn_return);
    });

    it("should catch exceptions thrown by spawn", function(done){
      spawn.throws();
      execSh("command", function(err){
        assert(err instanceof Error);
        done();
      });
    });

    it("should run callback with error when shell exit with non-zero code", function(done){
      exitCode = 1;
      execSh("command", function(err){
        assert(err instanceof Error);
        assert.equal(exitCode, err.code);
        done();
      });
    });
  });
});
