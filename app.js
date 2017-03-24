const {Analyzer, FSUrlLoader} = require('polymer-analyzer');
const dom5 = require('dom5');
const analyzer = new Analyzer({urlLoader: new FSUrlLoader(process.cwd())});
const document = await analyzer.analyzer(process.argv[1]);
const customElementReferences = document.getByKind('element-reference');
const result = [];
for (const reference of customElementReferences) {
  const el = {tagName: reference.tagName, attributes: []};
  result.push(el);
  for (const attr of reference.astNode.attributes) {
    const attribute = {name: attr.name};
    el.attributes.push(attribute);
    if (attr.value) {
      attribute.value = attr.value;
    }
  }
}
console.log(JSON.stringify(result));