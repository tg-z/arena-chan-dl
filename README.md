# `$ arena-chan-dl`

<p align="center">
<a href="https://github.com/tg-z/arena-chan-dl/issues"><img alt="github issues" src="https://img.shields.io/github/issues/tg-z/arena-chan-dl?color=ff69b4"></a>
<a href="https://github.com/tg-z/arena-chan-dl/stargazers"><img alt="github stars" src="https://img.shields.io/github/stars/tg-z/arena-chan-dl?color=ff69b4"></a>
<a href="https://github.com/tg-z/arena-chan-dl/graphs/contributors" alt="contributors">
<img src="https://img.shields.io/github/contributors/tg-z/arena-chan-dl?color=ff69b4"/></a>
</p>

<p align="center">
cli tool for archiving are.na channel content with ease.
</p>

<p align="center">
  <a href="#install">install</a> •
  <a href="#usage">usage</a> •
  <a href="#extra">credit</a><br>
</p>

## install
available from the npm registry. requires [node.js](https://nodejs.org/en/download/) to be installed.

```bash
# install globally with npm
npm i -g arena-chan-dl
```

```bash
# install locally with git
git clone https://github.com/tg-z/arena-chan-dl

# go to repo dir
cd arena-chan-dl

# install dependencies
npm i
```

## usage
```bash
# help
arena-chan-dl -h
arena-chan-dl --help

# define channel-slug + output path
arena-chan-dl get <slug> <dir>

# download channel to a relative folder
arena-chan-dl get frog ./downloads

# download channel to custom directory
arena-chan-dl get frog ~/documents/promnesia/are.na
```

![](http://static.damonzucconi.com/_capture/4mTGkMs6JI.gif)

## credit
this is a fork of [aredotna/download-arena-channel](https://github.com/aredotna/download-arena-channel) <3
