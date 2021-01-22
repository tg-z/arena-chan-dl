#!/usr/bin/env node
const R = require('ramda');
const fs = require('fs');
const axios = require('axios');
const parameterize = require('parameterize');
const mime = require('mime');
const chalk = require('chalk')
const makeDir = require('make-dir');
const yargs = require('yargs');
// yargs
//   .scriptName("arena-chan-dl")
//   .usage('$0 <cmd> [args]')
//   .command("get", '[channel-slug]',"download contents of an are.na channel."), (yargs) => {
//     yargs.positional('slug', {
//       type: 'string',
//       default: '',
//       describe: 'slug of the channel to download'
//     })
//   }, function (argv) {
//     console.log('Fetching...', argv.slug)
//   }
//   .help()
//   .argv;
yargs
  .scriptName('arena-chan-dl')
  .usage('$0 <cmd> <slug> [options]')
  .command('get <slug>','download contents of an are.na channel', function (yargs) {
    return yargs.positional('slug', {
      type: 'string',
      default: 'frog',
      describe: 'slug of the channel to download'
    })
  }, function (argv) {
    console.log(chalk.blue('Fetching the channel', argv.slug))
  })

  .example('$0 get frog','download specific are.na channel')
  .help()
  .alias('h','help')
  .alias('V','version')
  .argv
const args = process.argv.slice(2);
const slug = args[1];
const dir = args[2];
const per = 100; // Content pagination limit
const chunkBy = 10; // N of images to download simultaneously
let count = 0;

const channel = slug => ({
  thumb: () => {
    return axios.get(`https://api.are.na/v2/channels/${slug}/thumb`);
  },

  page: ({ page, per }) => {
    console.log(`Fetching page <${page}>`);
    return axios.get(`https://api.are.na/v2/channels/${slug}/contents?page=${page}&per=${per}`).catch(err => {
      console.error(`Failed to download the page <${page}>: ${err.stack}`);
    });
  },

  block: block => {
    count = count + 1

    console.log(chalk.cyan(`Download #${count}: ${block.id}`))

    if (!block.image) {
      console.log(`Block ${block.id} not downloaded because it does not have an image`)
      return Promise.resolve()
    };

    console.log(chalk.grey(`Downloading <${block.image.original.url}>`));

    const sdir = `${dir}/${slug}`;
(async () => {
    const path = await makeDir(sdir);
 
    console.log(path);
})();
    // if (!fs.existsSync(sdir)) fs.mkdirSync(sdir);

    return axios
      .get(block.image.original.url, { responseType: 'arraybuffer' })
      .then(({ data }) => {
        const title = block.title ? parameterize(block.title) : block.id;
	// const fileName = url => url.substring(url.lastIndexOf('/') + 1);
        // const extension = fileName(block.image.original.url);
	const ext = mime.getExtension(block.image.content_type);
        const filename = `${sdir}/${block.id}_${title}.${ext}`;
        console.log(chalk.grey(`Writing <${filename}>`));

        fs.writeFileSync(filename, data);
      })
      .catch(err => {
        console.error(chalk.redBright(`Failed to download the block <${block.id}>: ${err.stack}`));
      });
  },
});

const client = channel(slug);

client
  .thumb()
  .then(({ data: { title, length } }) => {
    const numberOfPages = Math.ceil(length / per);
    console.log(chalk.blue(`The channel <${title}> has ${length} blocks. Proceeding to download...`));
    const request = i => client.page({ page: i + 1, per });
    return Promise.all(R.times(request, numberOfPages));
  })
  .then(responses => {
    const contents = responses.reduce(((memo, { data: { contents } }) => memo.concat(contents)), []);

    R
      .splitEvery(chunkBy, contents)
      .reduce((lastPromise, blocks) => {
        return lastPromise.then(() => Promise.all(blocks.map(client.block)));
      }, Promise.resolve());
  })
  .catch(err => {
    console.error(chalk.redBright(`An error occurred: ${err.stack}`));
  });
