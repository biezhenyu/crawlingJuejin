const request = require('request-promise');
const cheerio = require('cheerio');
exports.tags = async function (url) {
  let options = {
    url,
    transform(body) {
      return cheerio.load(body); //转成jQuery对象 $
    }
  }
  return request(options).then($ => {
    let infos = $('.item .tag .info-box');
    let tags = [];
    infos.each((index, info) => {
      let tagInfo = $(info);
      let href = tagInfo.children().first().attr('href');
      let image = tagInfo.find('div.thumb').first().data('src');
      let title = tagInfo.find('div.title').first().text();
      let subscribe = tagInfo.find('div.subscribe').first().text();
      let article = tagInfo.find('div.article').first().text();  // trim 去掉空格
      tags.push({
        title,
        image,
        href: `https://juejin.im${href}`,
        subscribe: Number(subscribe.match(/^(\d+)/)[1]),
        article: Number(article.match(/^(\d+)/)[1])
      });
    });
    return tags.slice(0, 2);
  });
}

exports.articleList = async function (url) {
  let options = {
    url,
    transform(body) {
      return cheerio.load(body); //转成jQuery对象 $
    }
  }
  return request(options).then($ => {
    let infos = $('.info-box .title-row .title');
    let articles = [];
    infos.each((index, item) => {
      const article = $(item);
      let href = article.attr('href')
      const title = article.text()
      const id = href.slice(6)
      href = `https://juejin.im${href}`;
      articles.push({
        id,
        href,
        title
      });
    });
    return articles
  });
}




// let tagUrl = 'https://juejin.im/subscribe/all';
// exports.tags(tagUrl).then(tags => {
//     console.log(tags);
// });

let articleUrl = 'https://juejin.im/tag/%E5%89%8D%E7%AB%AF';
exports.articleList(articleUrl).then(articles => {
    console.log(articles);
});

