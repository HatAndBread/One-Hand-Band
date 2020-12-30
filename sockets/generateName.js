const chin = require('chinpunkanpun');

module.exports = () => {
  const num = Math.floor(Math.random() * 2);
  if (num) {
    return `${chin.getWord(chin.adjective)} ${chin.getWord(chin.adjective)} ${chin.getWord(chin.singularNoun)}`;
  }
  return `${chin.getWord(chin.adjective)} ${chin.getWord(chin.singularNoun)} ${chin.getWord(chin.singularNoun)}`;
};
