import data from './data';

const options = {
    data,
    filterOnChange: false,
    grouping: {
        house: [],
        gender: ['male', 'female'],
        age: [
            { from: 1, to: 10 },
            { from: 11, to: 20 },
            { from: 21, to: 30 },
            { from: 31, to: 40 },
            { from: 40, to: Infinity },
        ]
    }
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
}

export default {
    options,
    pushFilterByHouse,
    pushFilterByGender,
    cancelSeleted,
};