import * as Chai from 'chai';
import * as Mocha from 'mocha';
import * as Sinon from 'sinon';
import Facet from '../src/index';
import { default as config } from './dummy-data/settings';

const expect = Chai.expect;

describe('Facet', () => {
  it('test', () => {
    const app = new Facet(config.options);
    app.init();
    console.log(app.initSelectedItemsMapping);
    app.pushConditions([config.pushFilterByGender]);
    app.exec();
    app.reset();
    app.pushConditions([config.pushFilterByHouse]);
    console.log(app.exec().facet);
    console.log(app.initSelectedItemsMapping);
  });
});
