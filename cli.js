'use strict';

const { Machine } = require('braincrunch');
const { readFileSync } = require('fs');
const path = require('path');

const write = n => process.stdout.write(String.fromCharCode(n));

const code = readFileSync(path.join(__dirname, './brainfuck'), 'utf8');
const machine = new Machine({ code, write });
machine.run();
