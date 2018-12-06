const {query} = require('../db');
exports.tags = async function (tags) {
  for (let tag of tags) {
    // 查询数据库是否有数据
    let oldTag = await query(`SELECT * from tags WHERE name = ? LIMIT 1`, [tag.title]);
    if (Array.isArray(oldTag) && oldTag.length > 0) {
      await query('UPDATE tags SET name=?, image=?, url=?, url=? WHERE id=?', [tag.title, tag.image, tag.href, oldTag[0].id])
    } else {
      await query(`INSERT INTO tags(name, image, url, subscribe, article) VALUES(?,?,?,?,?)`, [tag.title, tag.image, tag.href, tag.subscribe, tag.article])
    }
  }
}

// exports.tags([
//   {title: 'name1', image: 'image1', href: 'url1', subscribe: 11, article: 11},
//   {title: 'name2', image: 'image2', href: 'url2', subscribe: 12, article: 12}
// ])

