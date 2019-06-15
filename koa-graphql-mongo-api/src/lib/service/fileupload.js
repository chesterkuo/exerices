
const formidable = require('formidable');
const fs = require('fs');

async function FileUpload(ctx) {
  //console.log("call file upload");
  var form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.uploadDir = __dirname+"/static/upload";
  form.parse(ctx.req, function(err,fields,files) {
    if (err) {throw err;}
    fs.renameSync(files.file.path, form.uploadDir+files.file.name);
  });
}

module.exports = FileUpload;

