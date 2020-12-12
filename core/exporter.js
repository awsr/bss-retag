const process = require("process");
const processTags = require("./bss-retag");

processTags(process.argv[2]);