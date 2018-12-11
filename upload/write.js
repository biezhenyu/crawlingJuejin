const {query} = require('../db');
exports.tags = async function (tags) {
  for (let tag of tags) {
    // 查询数据库是否有数据
    let oldTag = await query(`SELECT * from tags WHERE name = ? LIMIT 1`, [tag.title]);
    if (Array.isArray(oldTag) && oldTag.length > 0) {
      await query(`UPDATE tags SET name=?, image=?, url=? WHERE id=?`, [tag.title, tag.image, tag.href, oldTag[0].id])
    } else {
      await query(`INSERT INTO tags(name, image, url, subscribe, article) VALUES(?,?,?,?,?)`, [tag.title, tag.image, tag.href, tag.subscribe, tag.article])
    }
  }
}


exports.articleList = async (articleList) => {
  for (let article of articleList) {
    let oldArticle = await query(`SELECT * from articles WHERE id = ? LIMIT 1`, [article.id]);
    if (Array.isArray(oldArticle) && oldArticle.length > 0) {

      await query(`UPDATE articles SET title=?, content=?, href=? WHERE id=?`, [article.title, article.content, article.href, article.id]);
    } else {
      await query(`INSERT INTO articles(id, title, href, content) VALUES(?,?,?,?)`, [article.id, article.title, article.href, article.content]);
    }

    
    // 处理下文章标签关系，先删除，此文章的所有标签
    await query(`DELETE FROM article_tag WHERE article_id=? `,[article.id]);

    // 查询下此文章对应的标签的id数组
    // article.tags = ['title1', 'title2'];
    let tagWhere =  `'${article.tags.join(',')}'`;
    let tagIds = await query(`SELECT id FROM tags WHERE name IN (${tagWhere})`)
    for (let tagId of tagIds) {
      await query(`INSERT INTO article_tag(article_id, tag_id) VALUES(?,?)`, [article.id, tagId.id])
    }


  }
}

// exports.tags([
//   {title: 'name1', image: 'image1', href: 'url1', subscribe: 11, article: 11},
//   {title: 'name2', image: 'image2', href: 'url2', subscribe: 12, article: 12}
// ])

// exports.articleList([
//   {id: '111', title: 'title2', href: 'dsdff', content: '112dsad1', tags: ['title1']}
// ])
