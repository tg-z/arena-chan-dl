#!/usr/bin/env node

require('yargs')
  .scriptName("arena-chan-dl")
  .usage('$0 <cmd> [args]')
  .command('downloading [slug]', 'to ./downloads', (yargs) => {
    yargs.positional('slug', {
      type: 'string',
      default: 'frog',
      describe: 'the unique channel slug'
    })
  }, function (argv) {
    console.log('hello', argv.name, 'welcome to yargs!')
  })
  .help()
  .argv
