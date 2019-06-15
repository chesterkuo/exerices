
const formidable = require('formidable');
const fs = require('fs');

async function FileUpload(ctx) {

  if(ctx.method == "POST" && ctx.path == "/upload"){
    var form = new formidable.IncomingForm();//创建Formidable.IncomingForm对象
    // form.keepExtensions = true;//保持原有的扩展名
    //form.uploadDir = __dirname+"/static/blogs";//设置文件存放目录
    form.parse(ctx.req, async function(err,fields,files){
      if(err){throw err; return;}
      console.log(files.file);
      fs.renameSync(files.file.path,__dirname+"/static/blogs/"+files.file.name);

      console.log("Id is",value);
    });
    form.on('progress', function (bytesReceived, bytesExpected) {
      if(bytesExpected > 100 *1024){
        console.log("File too big");
        form.emit('error', new Error('File upload canceled by the server.'));
            //TODO 取消用户上传
      }
    });
    form.on("error",function(){
      ctx.body = "File too big"
    })
  }else{
    await next();
  }
}
module.exports = FileUpload;
