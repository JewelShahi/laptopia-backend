import { Filter } from 'bad-words';

const filter = new Filter();

filter.replaceWord = (word) => {
  if (word.length <= 2) return '*'.repeat(word.length);
  return word[0] + '*'.repeat(word.length - 2) + word[word.length - 1];
};

const filterText = (text) => {
  if (!text || typeof text !== 'string') return '';
  return filter.clean(text);
};

export default filterText;
