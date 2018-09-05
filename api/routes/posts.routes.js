const Posts = require('../models/Posts');
const request = require('request');
const CronJob = require('cron').CronJob;

//Run every hour
new CronJob('00 59 * * * *', () => {
  updateUserPosts({});
}, null, true);

module.exports.run = (app) => {

  //Send posts without the excluded ones by the user
  //This will allow us to keep all the posts so other users can get them and exclude (remove) the ones they want
  app.post('/api/posts/', (req, res) => {
    Posts.find({objectID: { $nin: req.body.toExclude }}, (err, posts) => {
      if (err) { throw err };
      res.json(posts);
    });
  });

}

//Refreshes the posts
updateUserPosts = () => {
  Posts.remove((err, result)=>{
    if(err) return err;
    request.get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs', (err, res, body) => {
      const posts = JSON.parse(body).hits;
      posts.forEach(post => {
        Posts.create(post, (err, created) => {
          console.log(created._id);
        });
      }); 
    })
  })
}

updateUserPosts();

