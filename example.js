#!/usr/bin/env node

require('yargs')
  .scriptName("arena-chan-dl")
  .usage('$0 <cmd> [args]')
  .command('downloading <channel-slug>', 'to downloads', (yargs) => {
    yargs.positional('slug', {
      type: 'string',
      default: 'frog',
      describe: 'the unique channel slug'
    })
  }, function (argv) {
    console.log('hello', argv.slug, 'welcome to yargs!')
  })
  .dir('dir').alias('dir', 'd')
  .help('help').alias('help', 'h')
  .version('version', '1.0.0').alias('version', 'v')
  .argv;
