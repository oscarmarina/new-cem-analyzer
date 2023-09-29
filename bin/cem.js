#!/usr/bin/env node

import process from 'node:process';
import { analyzePackage } from '../lib/analyze.js';

process.on('unhandledRejection', (error) => {
  console.error(`Promise rejection: ${error}`);
  if (error?.stack !== undefined) {
    console.error(error.stack);
  }
  process.exit(1);
});

analyzePackage();
