const fs = require('fs');
const request = require('request');
const axios = require('axios');
const { parse } = require("node-html-parser");

async function getPostLink(url) {
  url = url + 'embed' + '/captioned';
  let res = axios.get(url).then(async (response) => {
    const root = parse(response.data);
    let link = "";
    if (response.data.search("video_url") != -1) {
      link = getVideoLinkFromHtml(response.data);
    } else {
      link = root.querySelector('img.EmbeddedMediaImage').getAttribute("src");
    while (link.search("&amp;") != -1) {
      link = link.replace("&amp;", "&");
    }
    }
    let caption = await getCaptionFromHtml(response.data);
    return {link,caption};
  });
  return res;
}

async function getCaption(url) {
  url = url + 'embed' + '/captioned';
  let res = axios.get(url).then((response) => {
    let caption = getCaptionFromHtml(response.data);
    return caption;
  });
  return res;
}

function getVideoLinkFromHtml(html) {
let crop = "{\"" + html.substring(html.search("video_url"), html.search("video_url") + 1000);
  crop = crop.substring(0, crop.search(",")) + "}";
  return JSON.parse(crop).video_url;
}

async function getCaptionFromHtml(html) {
  const root = parse(html);
  let caption = root.querySelector('.Caption')?.text;
  if (caption == undefined) {
      caption = "No caption";
}
  caption = caption.replace("view all comment","");
  return caption;
}

const getRandom = (ext) => {
        return `${Math.floor(Math.random() * 10000)}${ext}`
}

const download = (uri, filename, callback) => {
  let res = request.head(uri, function (err, res, body) {
    let typef = res.headers['content-type']
    let sizef = res.headers['content-length']
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

// Source : stackoverflow.com/ & dev.to/

module.exports = { getPostLink, getRandom, download }
