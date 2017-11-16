import data from './data';

const options: any = {
  data,
  execOnChange: false,
  grouping: {
    house: [],
    gender: ['male', 'female'],
    age: ['1-10', '11-20', '21-30', '31-40', '41'],
  },
};

const pushFilterByHouse = {
  group: 'house',
  value: 'Targaryen',
  selected: 1,
};

const pushFilterByGender = {
  group: 'gender',
  value: 'male',
  selected: 1,
};

const pushFilterByAge = {
  group: 'age',
  value: '21-30',
  selected: 1,
};

const cancelSeleted = {
  group: 'gender',
  value: 'male',
  selected: 0,
};

export default {
  options,
  pushFilterByHouse,
  pushFilterByGender,
  cancelSeleted,
  pushFilterByAge,
};
