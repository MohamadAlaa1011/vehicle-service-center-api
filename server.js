'use strict';

// Bonto and other PaaS hosts look for a root entry file.
// NestJS compiles to dist/main.js — this file loads it.
require('./dist/main');
