import * as characters from './data';

const initResult: any = {
  age: {
    '41': [characters.eddard],
    '1-10': [],
    '11-20': [
      characters.daenerys,
      characters.viserys,
      characters.jon,
      characters.sansa,
    ],
    '21-30': [
      characters.jamie,
    ],
    '31-40': [
      characters.robert,
    ],
  },
  gender: {
    female: [
      characters.daenerys,
      characters.sansa,
    ],
    male: [
      characters.eddard,
      characters.robert,
      characters.jamie,
      characters.viserys,
      characters.jon,
    ],
  },
  house: {
    Stark: [
      characters.eddard,
      characters.jon,
      characters.sansa,
    ],
    Baratheon: [
      characters.robert,
    ],
    Lannister: [
      characters.jamie,
    ],
    Targaryen: [
      characters.daenerys,
      characters.viserys,
    ],
  },
};

const emptyPanel: any = {
  age: {
    '41': [],
    '1-10': [],
    '11-20': [],
    '21-30': [],
    '31-40': [],
  },
  gender: {
    female: [],
    male: [],
  },
  house: {
    Stark: [],
    Baratheon: [],
    Lannister: [],
    Targaryen: [],
  },
};

const emptySelectedMapping: any = {
  age: [],
  gender: [],
  house: [],
};

const selectedItems: any = {
  age: [
    characters.daenerys,
    characters.viserys,
    characters.jon,
    characters.sansa,
  ],
  gender: [],
  house: [],
};

const filterByAge: any = {
  age: {
    '41': [characters.eddard],
    '1-10': [],
    '11-20': [
      characters.daenerys,
      characters.viserys,
      characters.jon,
      characters.sansa,
    ],
    '21-30': [
      characters.jamie,
    ],
    '31-40': [
      characters.robert,
    ],
  },
  gender: {
    female: [
      characters.daenerys,
      characters.sansa,
    ],
    male: [
      characters.viserys,
      characters.jon,
    ],
  },
  house: {
    Stark: [
      characters.jon,
      characters.sansa,
    ],
    Baratheon: [],
    Lannister: [],
    Targaryen: [
      characters.daenerys,
      characters.viserys,
    ],
  },
};

const initWithCountOnlyResult: any = {
  age: {
    '41': 1,
    '1-10': 0,
    '11-20': 4,
    '21-30': 1,
    '31-40': 1,
  },
  gender: {
    female: 2,
    male: 5,
  },
  house: {
    Stark: 3,
    Baratheon: 1,
    Lannister: 1,
    Targaryen: 2,
  },
};

const filterByAgeWithCountOnlyResult: any = {
  age: {
    '41': 1,
    '1-10': 0,
    '11-20': 4,
    '21-30': 1,
    '31-40': 1,
  },
  gender: {
    female: 2,
    male: 2,
  },
  house: {
    Stark: 2,
    Baratheon: 0,
    Lannister: 0,
    Targaryen: 2,
  },
};

export default {
  initResult,
  emptyPanel,
  emptySelectedMapping,
  selectedItems,
  filterByAge,
  initWithCountOnlyResult,
  filterByAgeWithCountOnlyResult,
};
