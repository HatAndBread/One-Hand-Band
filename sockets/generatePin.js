module.exports = function () {
  let num = '';
  for (let i = 0; i < 5; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
};
