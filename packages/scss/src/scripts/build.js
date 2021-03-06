/*
 * @Author: your name
 * @Date: 2022-01-31 22:26:10
 * @LastEditTime: 2022-01-31 23:51:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /DS/scss/scripts/build.js
 */

const Fs = require("fs");
const Path = require("path");
const Sass = require("node-sass");
const CleanCSS = require("clean-css");

const getComponents = () => {
  let allComponents = [];

  const types = ["atoms", "molecules", "organisms"];

  types.forEach((type) => {
    const allFiles = Fs.readdirSync(`src/${type}`).map((file) => ({
      input: `src/${type}/${file}`,
      output: `lib/${file.slice(0, -4) + "css"}`,
    }));
    allComponents = [...allComponents, ...allFiles];
  });

  return allComponents;
};
//生成单个scss
const generateGlobalScss = () => {
  const GlobalScss = `@import "foundation/all";
  @import "base/reset";
  @import "base/root";
  `;
  var generateCode = GlobalScss;

  getComponents().map((component) => {
    generateCode += `@import "${component.input}"; \n`;
  });
  Fs.writeFileSync(Path.resolve("src/global.scss"), generateCode);
};
generateGlobalScss();
const compile = (path, filename) => {
  console.log(Path.resolve(path), filename);
  const result = Sass.renderSync({
    data: Fs.readFileSync(Path.resolve(path)).toString(),
    outputStyle: "expanded",
    includePaths: [Path.resolve("src")],
  }).css.toString();
  Fs.writeFileSync(Path.resolve(filename), result);
};
/**
 * des: 复制整个文件夹
 * src: 当前文件夹源路径
 * dest: 当前文件夹目标路径
 */
const cpDir = (src, dest) => {
  const srcPath = Path.resolve(src);
  const destPath = Path.resolve(dest);
  const statDir = Fs.statSync(destPath);
  if (!statDir.isDirectory()) {
    Fs.mkdirSync(`${destPath}`);
  }
  Fs.readdirSync(srcPath).forEach((file) => {
    const stat = Fs.statSync(`${srcPath}/${file}`);
    if (stat.isDirectory()) {
      cpDir(`${src}/${file}`, `${dest}/${file}`);
    }
    if (stat.isFile()) {
      Fs.createReadStream(`${srcPath}/${file}`).pipe(
        Fs.createWriteStream(`${destPath}/${file}`)
      );
    }
  });
};
// 创建压缩完成css
function createBundle() {
  var results = "";
  getComponents().forEach((component) => {
    const result = Sass.renderSync({
      data: Fs.readFileSync(Path.resolve(component.input)).toString(),
      outputStyle: "expanded",
      includePaths: [Path.resolve("src")],
    }).css.toString();
    results += result;
    new CleanCSS({
      returnPromise: true,
      level: {
        2: {
          removeDuplicateRules: true,
        },
      },
    })
      .minify(results)
      .then((output) => {
        Fs.writeFileSync(Path.resolve("lib/global.min.css"), output.styles);
      });
  });
}

// cpDir('src/icon','lib/icon')
compile("src/global.scss", "lib/global.css");
getComponents().forEach((component) => {
  compile(component.input, component.output);
});
createBundle();
