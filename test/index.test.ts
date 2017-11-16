import * as Chai from 'chai';
import * as Mocha from 'mocha';
import * as Sinon from 'sinon';
import Facet from '../src/index';
import { default as config } from './dummy-data/settings';

const expect = Chai.expect;

describe('Facet', () => {
  it('test', () => {
    const app = new Facet(config.options);
    app.push([config.pushFilterByGender]);
    app.push([config.pushFilterByHouse]);
    app.push([config.pushFilterByAge]);
    const result = app.exec();
    console.log(result.total.length);
    // console.log(app.selectedItemsMapping);
    console.log(app.data.length);
    // console.log(app.selectedItemsMapping);
  });
});
