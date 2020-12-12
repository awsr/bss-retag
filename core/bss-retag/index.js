const path = require('path');
const fs = require('fs');
const posthtml = require('posthtml');
const retag = require('posthtml-retag');

// Recursive file search function
function getAllHtml(dir, files, result) {
  files = files || fs.readdirSync(dir);
  result = result || [];
  const htmlExt = /\.html?$/i;

  for (let i = 0; i < files.length; i++) {
    const filepath = path.join(dir, files[i]);
    if (fs.statSync(filepath).isDirectory()) {
      try {
        result = getAllHtml(filepath, fs.readdirSync(filepath), result);
      } catch (error) {
        continue;
      }
    } else {
      if (htmlExt.test(filepath)) {
        result.push(filepath);
      }
    }
  }
  return result;
}

module.exports = (workingDir) => {
  if (typeof workingDir !== "string") {
    console.log("Working directory is not set");
    return;
  }
  workingDir = path.normalize(workingDir);

  const htmlFiles = getAllHtml(workingDir);

  htmlFiles.map(file => {
    const html = fs.readFileSync(file, "utf8");
    posthtml(
      [
        retag({
          removeDisplayNone: true
        })
      ])
      .process(html)
      .then(output => fs.writeFileSync(file, output.html));
  });
};