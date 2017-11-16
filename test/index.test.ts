import * as Chai from 'chai';
import * as Mocha from 'mocha';
import * as Sinon from 'sinon';
import Facet from '../src/index';
import { default as result  } from './dummy-data/result';
import { default as config } from './dummy-data/settings';

const expect = Chai.expect;

describe('Facet', () => {
  let facet: Facet;
  beforeEach(() => {
    facet = new Facet(config.options);
  });

  describe('#constructor', () => {
    it('should set variables', () => {
      expect(facet.data).to.eqls(config.options.data);
      expect(facet.grouping).to.eqls(config.options.grouping);
      expect(facet.execOnChange).to.eqls(config.options.execOnChange);
      expect(facet.panel).to.eqls({});
      expect(facet.conditions).to.eqls([]);
      expect(facet.selectedItemsMapping).to.eqls({});
      expect(facet.conditionsMapping).to.eqls({});
      expect(facet.initSelectedItemsMapping).to.eqls({});
      expect(facet.emptyPanel).to.eqls({});
    });
  });

  describe('#init', () => {
    it('should set init panel', () => {
      const init: any = facet.init();
      expect(init.result).to.eqls(config.options.data);
      expect(init.facet).to.eqls(result.initResult);
    });
  });
});
