const Signup = require('./Signup');
const login = require("./login");
const addlike = require('./addlike');
const post = require('./post');
const comment = require('./addcomment');
const follow=require('./follower')


module.exports = function ({ app, mongoose, upload }) {
    Signup({app,mongoose,upload});
    login({ app, mongoose,upload });
    post({app,mongoose,upload});
    addlike({app,mongoose});
    comment({app,mongoose,upload});
    follow({app,mongoose});
  

};