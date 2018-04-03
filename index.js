var http = require('http')
var fs = require('fs')
var url = require('url')

http.createServer(function(req,res){
    var pathObj = url.parse(req.url,true)
    console.log(pathObj)
    switch(pathObj.pathname){
        case '/getWorks':
          var ret
          if(pathObj.query.author == 'JayChou'){
             ret = {
                 author: 'Jay Zhou',
                 works: '告白气球'
             }
          }else{
             ret = {
                 author: 'EasonChan',
                 works: '富士山下'
             }
          }
          res.setHeader('Content-Type','text/json;charset=utf-8')
          res.end(JSON.stringify(ret))
          break;
        case '/user/Sage':
          res.end(fs.readFileSync(__dirname + '/sample/test.html'))
          break;
        default:
          res.end(fs.readFileSync(__dirname + '/sample' + pathObj.pathname))
    }
}).listen(8080)