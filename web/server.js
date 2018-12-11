const express = require('express');
const path = require('path');
const { query }=require('../db');
const app = new express();

// 设置模板
app.set('view engine','html');
app.set('views',path.resolve('views'));
app.engine('html',require('ejs').__express);

app.get('/', async (req, res) => {
  let {tagId} = req.query;
  let tags = await query(`SELECT * FROM tags`);
  tagId = tagId ? tagId : tags[0].id;
  let articles = await query(`SELECT articles.* FROM articles INNER JOIN article_tag ON articles.id = article_tag.article_id WHERE article_tag.tag_id=?`, [tagId])
  res.header("Content-Type", "application/json; charset=utf-8")
  res.end(JSON.stringify({tags, articles}));

});


app.listen(8085, () => {
  console.log('输入8085')
});