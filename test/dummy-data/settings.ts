import { ICondition, IConfig } from '../../src/index';
import data, * as characters from './data';

const options: IConfig = {
  data,
  execOnChange: false,
  grouping: {
    house: [],
    gender: ['male', 'female'],
    age: ['1-10', '11-20', '21-30', '31-40', '41'],
  },
};

const pushFilterByHouse: ICondition = {
  group: 'house',
  value: 'Stark',
  selected: true,
};

const pushFilterByGender: ICondition = {
  group: 'gender',
  value: 'male',
  selected: true,
};

const pushFilterByAge: ICondition = {
  group: 'age',
  value: '11-20',
  selected: true,
};

const pushFilterByAgeWithoutMatching: ICondition = {
  group: 'age',
  value: '1-10',
  selected: true,
};

const cancelSeleted: ICondition = {
  group: 'gender',
  value: 'male',
  selected: false,
};

export default {
  options,
  pushFilterByHouse,
  pushFilterByGender,
  cancelSeleted,
  pushFilterByAge,
  pushFilterByAgeWithoutMatching,
};
