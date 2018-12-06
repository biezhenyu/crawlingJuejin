const request = require('request-promise');
const cheerio = require('cheerio');

// 获取标签列表
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
    return tags;
  });
}

// 获取文章详情
async function articleDetail(url) {
  let options = {
    url,
    transform(body) {
      return cheerio.load(body); //转成jQuery对象 $
    }
  }
  return request(options).then($ => {
    let content = $('.article-content').first().html();
    let tagTitles = $('.tag-list .item .tag-title');
    let tags = [];
    tagTitles.each((index, item) => {
      tags.push($(item).text())
    });
    return {
      content,
      tags
    }
  });
}

// 获取文章列表
exports.articleList = async function (url) {
  let options = {
    url,
    transform(body) {
      return cheerio.load(body); //转成jQuery对象 $
    }
  }
  return request(options).then(async $ => {
    let infos = $('.info-box .title-row .title');
    let articles = [];

    // 拿到列表 （在foreach里面不能使用await）
    for (let i = 0; i < infos.length; i++) {
      const article = $(infos[i]);
      let href = article.attr('href')
      const title = article.text()
      const id = href.slice(6)
      href = `https://juejin.im${href}`;
      let detail = await articleDetail(href);
      articles.push({
        id,
        href,
        title,
        content: detail.content,
        tags: detail.tags
      });
    }
    return articles
  });
}






// let tagUrl = 'https://juejin.im/subscribe/all';
// exports.tags(tagUrl).then(tags => {
//     console.log(tags);
// });

// let articleUrl = 'https://juejin.im/tag/%E5%89%8D%E7%AB%AF';
// exports.articleList(articleUrl).then(articles => {
//   console.log(articles);
// });

// let articleDetailUrl = 'https://juejin.im/post/5c0734fc51882516cd70d1ed';
// exports.articleDetail(articleDetailUrl).then(detail => {
//   console.log(detail)
// });


