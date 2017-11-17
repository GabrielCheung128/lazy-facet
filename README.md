# Introduction
This is a Javascript facet filtering based on Typescript. Easily integrated with modern Javacript Framework or any Nodejs backend project. 

## Get started

### Install

With npm:

```shell
  npm install -S lazy-facet
```

### Example usage

Execute on every push:

```typescript
import Facet from 'lazy-facet';

const data = [{
    firstName: 'Eddard',
    lastName: 'Stark',
    gender: 'male',
    age: 45,
    house: 'Stark',
  }...];

const facet = new Facet({
  data: data,
  execOnChange: true,
    // when true, it will return result every time you push a condition.
    // when false, it will not trigger the exec only when you call it. 
  grouping: {
    house: [], // when the grouping depends on the values of the data
    gender: ['male', 'female'], // when the grouping not depending on the given data.
    age: ['1-10', '11-20', '21-30', '31-40', '41'], // when the grouping is range.
  }
});

const initResult = facet.init(); //initialize the app and return the init facet panel and result data.
const initFacet = initResult.facet;
const initResult = initResult.result;

let filterResult = facet.push({
  group: 'house',
  value: 'Stark',
  selected: true,
});

console.log(filterResult.facet);
console.log(filterResult.result);

// cancel a selection
filterResult = facet.push({
  group: 'house',
  value: 'Stark',
  selected: false,
});

console.log(filterResult.facet);
console.log(filterResult.result);

// reset to init state
filterResult = facet.reset();
console.log(filterResult.facet);
console.log(filterResult.result);
```

Execute only when called: 

```typescript
import Facet from 'lazy-facet';

const data = [{
    firstName: 'Eddard',
    lastName: 'Stark',
    gender: 'male',
    age: 45,
    house: 'Stark',
  }...];

const facet = new Facet({
  data: data,
  execOnChange: false,
  grouping: {
    house: [],
    gender: ['male', 'female'],
    age: ['1-10', '11-20', '21-30', '31-40', '41'],
  }
});


const initResult = facet.init(); //initialize the app and return the init facet panel and result data.
const initFacet = initResult.facet;
const initResult = initResult.result;

facet.push([{
  group: 'house',
  value: 'Stark',
  selected: true,
}, {
  group: 'gender',
  value: 'male',
  selected: true,
}]); // You could push serval conditions in one time.
facet.push({
  group: 'gender',
  value: 'male',
  selected: false,
})
const filterResult = facet.exec();
console.log(filterResult.facet);
console.log(filterResult.result);
```

Passing a boolean as the second variable as push to overide the `exceOnChange` setting

```typescript
const filterResult = facet.push({
  group: 'gender',
  value: 'male',
  selected: false,
}, true);
```
