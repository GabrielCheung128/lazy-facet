import * as Chai from 'chai';
import * as Mocha from 'mocha';
import * as Sinon from 'sinon';
import Facet from '../src/index';
import * as characters from './dummy-data/data';
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
    it('should set and return init panel', () => {
      const init: any = facet.init();
      expect(init.result).to.eqls(config.options.data);
      expect(init.facet).to.eqls(result.initResult);
      expect(facet.initSelectedItemsMapping).to.eqls(result.emptySelectedMapping);
      expect(facet.emptyPanel).to.eqls(result.emptyPanel);
    });

    it('should return number only on facet', () => {
      facet.countOnly = true;
      const init: any = facet.init();
      expect(init.result).to.eqls(config.options.data);
      expect(init.facet).to.eqls(result.initWithCountOnlyResult);
      expect(facet.initSelectedItemsMapping).to.eqls(result.emptySelectedMapping);
      expect(facet.emptyPanel).to.eqls(result.emptyPanel);
    });
  });

  describe('#reset', () => {
    it('should reset conditions', () => {
      facet.init();
      facet.push(config.pushFilterByAge);
      expect(facet.conditions).not.to.be.empty;
      expect(facet.conditionsMapping).not.to.be.empty;
      facet.reset();
      expect(facet.conditions).to.be.empty;
      expect(facet.conditionsMapping).to.be.empty;
    });

    it('should return init panel and data', () => {
      facet.init();
      facet.push(config.pushFilterByAge);
      const output = facet.reset();
      expect(output.facet).to.eqls(result.initResult);
      expect(output.result).to.eqls(config.options.data);
    });
  });

  describe('#push', () => {
    it('should throw error without init', () => {
      try {
        facet.push(config.pushFilterByAge);
      } catch (error) {
        expect(error).to.be.an('error');
        expect(error.message).to.eqls('You need to run init first');
      }
    });

    describe('trigger exec', () => {
      it('should not call exec when execOnChange is false', () => {
        const execSpy = Sinon.spy(facet, 'exec');
        facet.init();
        facet.push(config.pushFilterByAge);
        expect(execSpy.called).to.be.false;
      });

      it('should call exet when execOnChange is true', () => {
        const execSpy = Sinon.spy(facet, 'exec');
        facet.execOnChange = true;
        facet.init();
        facet.push(config.pushFilterByAge);
        expect(execSpy.called).to.be.true;
      });

      it('should call exet when pass trigger as true', () => {
        const execSpy = Sinon.spy(facet, 'exec');
        facet.init();
        facet.push(config.pushFilterByAge, true);
        expect(execSpy.called).to.be.true;
      });

      it('should not call exet when pass trigger as false', () => {
        const execSpy = Sinon.spy(facet, 'exec');
        facet.init();
        facet.push(config.pushFilterByAge, false);
        expect(execSpy.called).to.be.false;
      });
    });

    describe('conditionsMapping', () => {
      it('should set conditionsMapping', () => {
        facet.init();
        facet.push(config.pushFilterByGender);
        expect(facet.conditionsMapping['gender-male'])
          .to.eqls(config.pushFilterByGender);
      });

      it('should unset conditionsMapping when push a selected is false', () => {
        facet.init();
        facet.push(config.pushFilterByGender);
        facet.push(config.cancelSeleted);
        expect(facet.conditionsMapping['gender-male'])
          .to.be.undefined;
      });
    });

    describe('conditions', () => {
      it('should push filter condition to conditions', () => {
        facet.init();
        facet.push(config.pushFilterByGender);
        expect(facet.conditions[0]).to.eqls(config.pushFilterByGender);
      });

      it('should remove filter condition when cancel selecting', () => {
        facet.init();
        facet.push(config.pushFilterByGender);
        facet.push(config.cancelSeleted);
        expect(facet.conditions.length).to.eqls(0);
      });
    });
  });

  describe('#getSelectedItems', () => {
    it('should getselected items when called', () => {
      facet.init();
      facet.push(config.pushFilterByAge);
      const mapping = facet.getSelectedItems();
      expect(mapping).to.eqls(result.selectedItems);
    });
  });

  describe('#exec', () => {
    it('should return result and fecet', () => {
      facet.init();
      facet.push(config.pushFilterByAge);
      const output = facet.exec();
      expect(output.result).to.eqls([characters.daenerys,
        characters.viserys,
        characters.jon,
        characters.sansa]);
      expect(output.facet).to.eqls(result.filterByAge);
    });

    it('should return init state when no item matches', () => {
      facet.init();
      facet.push(config.pushFilterByAgeWithoutMatching);
      const output = facet.exec();
      expect(output.result).to.eqls(characters.default);
      expect(output.facet).to.eqls(result.initResult);
    });

    it('should return number only on facet', () => {
      facet.countOnly = true;
      facet.init();
      facet.push(config.pushFilterByAge);
      const output = facet.exec();
      expect(output.result).to.eqls([characters.daenerys,
        characters.viserys,
        characters.jon,
        characters.sansa]);
      expect(output.facet).to.eqls(result.filterByAgeWithCountOnlyResult);
    });
  });
});
