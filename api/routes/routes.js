module.exports.all = (app) => { 

    //Content route
    const PostsRoute = require('./posts.routes.js');
    PostsRoute.run(app); 
    
}
