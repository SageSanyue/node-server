# node-server
##实现了一个能处理路由、支持静态目录的server
###目录结构如下：  
   node-server  
      |——index.js  
      |——sample  
           |——test.html  
           |——another.thml  
      |README.md    
###服务器代码如下：  
\```  
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
\```  
###使用方法：  
在git bash中定位到当前node-server文件夹路径，输入"node index.js"开启静态服务器;  
在浏览器输入localhost:8080/getWorks可以看到页面显示：{"author":"EasonChan","works":"富士山下"}；  
在浏览器输入localhost:8080/getWorks?author=JayChou可以看到页面显示：{"author":"Jay Chou","works":"告白气球"}； 
在浏览器输入localhost:8080/getWorks?author=Joly可以看到页面显示：{"author":"Eason Chan","works":"富士山下"}；  
在浏览器输入localhost:8080/user/Sage可以看到页面显示一个html页面([])；  
在浏览器输入localhost:8080/another.html可以看到页面显示另一个html页面“Hello World”；
