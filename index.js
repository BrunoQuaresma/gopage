#!/usr/bin/env node

const program = require('commander')
const build = require('./commands/build')
const preview = require('./commands/preview')

const DEFAULT_PORT = 8080
const DEFAULT_ROOT = './build'

program
  .version('0.1.0')
  .command('build')
  .description('Build your page')
  .option('-c, --config [config]', 'Config file. Defaults is "./page.json"', './page.json')
  .action((cmd) => {
    build(cmd.config)
  })

program
  .command('preview')
  .description('See your preview page in the browser')
  .action(() => preview(DEFAULT_PORT, DEFAULT_ROOT))

program.parse(process.argv)