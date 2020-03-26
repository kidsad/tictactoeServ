const { Given, Then } = require('cucumber');

const request = require('supertest');

const assert = require('assert');
const app = require('../src/server');

const controller = require('../src/game');

let lastResult = {};

function convertPlaingFieldToStr(plaingField) {
  let result = '';
  for (let i = 0; i < plaingField.length; i++) {
    for ( let j = 0; j < plaingField[i].length; j++) {
      result = result + plaingField[i][j].toString(10);
    }
    if (i < plaingField.length - 1) {
      result = result + '|';
    }
  }
  return result;

}

function convertStrToPlaingField(str) {
  let plaingField = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  let i = 0;
  for (i = 0; i <= 2; i++) {
    plaingField[0][i] = Number(str[i]);
    plaingField[1][i] = Number(str[i + 4]);
    plaingField[2][i] = Number(str[i + 8]);
  }
  return plaingField;
}

Given('пустое поле', () => {
  controller.clearPlaingField();
});

Given('ходит игрок {int}', (int) => {
  controller.setCurrentPlayer(int);
});

Given('игрок ходит в клетку {int}, {int}', (x, y) => {
  return request(app)
    .post('/move')
    .send({x, y})
    .then((res) => {
      lastResult = res;
    });
});

Then('поле становится {string}', (string) => {
  return request(app)
    .get('/getField')
    .then((res) => {
      lastResult = res;
      assert.equal(convertPlaingFieldToStr(lastResult.body), string);
    })
});

Given('поле {string}', (input) => {
  controller.presetPlaingField(convertStrToPlaingField(input));
});

Then('победил игрок {int}', (int) => {
  assert.equal(controller.getWinnerPlayer(), int);
});
