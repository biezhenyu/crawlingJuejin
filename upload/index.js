const read = require('./read');
const write = require('./write');

(async () => {
  const tagUrl = 'https://juejin.im/subscribe/all';
  let tags = await read.tags(tagUrl);

  // 把标签写入数据库
  await write.tags(tags);

  let allArticles = {};

  // 不同标签下的文章可能重复
  for(tag of tags) {
    let artilces = await read.articleList(tag.href);
    artilces.forEach(article => allArticles[article.id] = article)
  }

  // 写入库
  await write.articleList(Object.values(allArticles))

  // 退出
  process.exit();

})();