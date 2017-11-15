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
  selected: true,
};

const pushFilterByGender = {
  group: 'gender',
  value: 'male',
  selected: true,
};

const cancelSeleted = {
  group: 'gender',
  value: 'male',
  selected: false,
};

export default {
  options,
  pushFilterByHouse,
  pushFilterByGender,
  cancelSeleted,
};
