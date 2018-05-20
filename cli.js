#!/usr/bin/env node
'use strict';

const { config } = require('./package.json');
const { EOL } = require('os');
const { Machine } = require('braincrunch');
const { readFileSync } = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const opn = require('opn');
const path = require('path');

const code = readFileSync(path.join(__dirname, config.code), 'utf8');
const write = n => process.stdout.write(String.fromCharCode(n));

if (argv.w || argv.web) {
  const url = `https://copy.sh/brainfuck/?c=${encode(code)}`;
  opn(url);
} else {
  const machine = new Machine({ code, write });
  machine.run();
  process.stdout.write(EOL);
}

function encode(code) {
  return Buffer.from(code)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '$');
}
