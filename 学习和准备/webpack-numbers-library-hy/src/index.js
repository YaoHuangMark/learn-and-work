/*
 * @Author: 黄遥
 * @Date: 2020-04-07 09:08:24
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-04-07 09:12:35
 * @Description: file content
 */
import _ from 'lodash';
import numRef from './ref.json';

export function numToWord(num) {
  return _.reduce(numRef, (accum, ref) => {
    return ref.num === num ? ref.word : accum
  }, '');
};

export function wordToNum(word) {
  return _.reduce(numRef, (accum, ref) => {
    return ref.word === word && word.toLowerCase() ? ref.num : accum;
  }, -1);
};