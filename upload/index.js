const read = require('./read');
const write = require('./write');

(async () => {
  const tagUrl = 'https://juejin.im/subscribe/all';
  let tags = await read.tags(tagUrl);

  // 把标签写入数据库
  await write.tags(tags);
})();