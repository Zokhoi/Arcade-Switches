const fs = require("fs");
const path = require("path");

const sexp = require("s-expression");

let excludeFootprint = JSON.stringify(fs.readFileSync(`${__dirname}/excludeFootprint.json`, "utf-8"));

function sexpDump(src, lvl = 0) {
  let content = [];
  let newLine = 0;
  for (let i = 0; i < src.length; i++) {
    if (src[i] instanceof Array) {
      newLine = 1;
      content.push(`\n${"  ".repeat(lvl+1)}${sexpDump(src[i], lvl+1)}`);
    } else if (src[i] instanceof String) {
      content.push(`\"${src[i]}\"`);
    } else content.push(src[i]);
  }
  return `(${content.join(" ")}${newLine ? "\n"+"  ".repeat(lvl) : ""})`
}

let swfp = fs.readdirSync(`${__dirname}/Arcade_Switch.pretty`, {withFileTypes: true});
let spacingSrc = fs.readdirSync(`${__dirname}/spacing`, {withFileTypes: true});
let spacing = [];
for (let j = 0; j < spacing.length; j++) {
  if (!spacing[j].isFile()) continue;
  let space = spacing[j].name.split(".");
  space.pop();
  space = space.join(".");
  spacing.push({
    filename: spacingSrc[j].name,
    name: space,
  });
}
for (let i = 0; i < swfp.length; i++) {
  if (!swfp[i].isFile()) continue;
  if (excludeFootprint.includes(swfp[i].name)) continue;
  let src = fs.readFileSync(`${__dirname}/Arcade_Switch.pretty/${swfp[i].name}`, "utf-8");
  let edit;
  for (let j = 0; j < spacing.length; j++) {
    edit = sexp(src).concat(sexp(fs.readFileSync(`${__dirname}/spacing/${spacing[j].filename}`, "utf-8")));
    edit[1] = new String(edit[1]+"_"+spacing[j].name);
    let sub = edit.filter(v=>v instanceof Array);
    let temp = sub.find(v=>v[0]=="descr");
    temp[1] = new String(`${temp[1]} with ${spacing[j].name} spacing`);
    temp = sub.find(v=>v[0]=="tags");
    temp[1] = new String(`${temp[1]},keyboard`);
    let genFileName = swfp[i].name.split(".")
    let ext = genFileName.pop();
    genFileName = `${genFileName.join(".")}_${spacing[j].name}.${ext}`
    fs.writeFileSync(`${__dirname}/Arcade_Switch_Keyboard.pretty/${genFileName}`, sexpDump(edit), "utf-8");
  }
} 