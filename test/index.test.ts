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
    app.pushConditions([config.cancelSeleted]);
    console.log(app.exec().facet);
  });
});
