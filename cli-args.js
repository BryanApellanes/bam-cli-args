var cliArgs = (function () {
    var path = require('path');

    function parseArgs(argsArray){
        var parsedArgs = {};
        for (var i = 0; i < argsArray.length; i++) {
            var arg = argsArray[i];
            var nameValue = arg.split(':');
            if (nameValue.length === 1) {
                if (nameValue[0].startsWith("/") || nameValue[0].startsWith("-")) {
                    var name = nameValue.toString();
                    name = name.substring(1, name.length);
                    parsedArgs[name] = true;
                } else {
                    parsedArgs[arg] = true;
                }
            } else if (nameValue.length === 2) {
                var name = nameValue[0];
                if (name.startsWith("/") || name.startsWith("-")) {
                    name = name.substring(1, name.length);
                }
                parsedArgs[name] = nameValue[1].replace(/_/g, ' ');
            }
        }

        var result = {
            args: argsArray,
            parsedArgs: parsedArgs
        };
        for (var argName in parsedArgs) {
            result[argName] = parsedArgs[argName];
        }
        return result;        
    }

    var parsed = parseArgs(process.argv.slice(2));

    return {
        parse: parseArgs,
        bamArgs: parsed.args,
        scriptInfo: function(){
            var scriptPath = process.argv[1];            
            var dirPath = path.dirname(scriptPath);
            var dirName = path.basename(dirPath);
            var scriptInfo = {
                scriptPath: scriptPath,
                scriptName: path.basename(scriptPath),
                dirPath: dirPath,
                dirName: dirName,
                isBamModule: dirName.startsWith('bam-'),
                bamModuleName: dirName.substring('bam-'.length),
                arguments: parsed.parsedArgs
            };

            return scriptInfo;
        }
    }
})()

module.exports = cliArgs;