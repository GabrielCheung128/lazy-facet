import * as Chai from 'chai';
import * as Mocha from 'mocha';
import * as Sinon from 'sinon';
import Facet from '../src/index';
import { default as config } from './dummy-data/settings';

const expect = Chai.expect;

describe('Facet', () => {
  it('test', () => {
    const app = new Facet(config.options);
    // console.log(app.createEmptyMapping(config.options.grouping.age));
    // app.initGroups(config.options.data, config.options.grouping);
    app.init();
  });
});
