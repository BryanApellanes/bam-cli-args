var { expect } = require("chai");

describe("cli args", function () {
    it("should parse array", function () {
        var cliArgs = require('../../cli-args');
        var args = cliArgs.parse(['/hello', '/helloThere:general kenobi', '/helloSlash:world', '-helloDashNoValue', '-helloDash:world']);

        // console.log(args);
        expect(args.hello).to.equal(true);
        expect(args.helloThere).to.equal('general kenobi');
        expect(args.helloSlash).to.equal('world');
        expect(args.helloDashNoValue).to.equal(true);
        expect(args.helloDash).to.equal('world');
    })
});
