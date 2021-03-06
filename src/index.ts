import * as _ from 'lodash';

export interface ICondition {
  group: string;
  value: string;
  selected: boolean;
}

export interface IConfig {
  data: any[];
  execOnChange?: boolean;
  grouping: {
    [key: string]: string[];
  };
  countOnly?: boolean;
}

class Facet {
  data: any[];
  grouping: any;
  execOnChange: boolean;
  panel: any;
  conditions: ICondition[];
  selectedItemsMapping: any;
  conditionsMapping: any;
  initSelectedItemsMapping: any;
  emptyPanel: any;
  countOnly: boolean;
  outPutPanel: any;

  constructor(options: IConfig) {
    this.data = options.data;
    this.grouping = options.grouping;
    this.execOnChange = options.execOnChange || false;
    this.panel = {};
    this.outPutPanel = {};
    this.conditions = [];
    this.selectedItemsMapping = {};
    this.conditionsMapping = {};
    this.initSelectedItemsMapping = {};
    this.countOnly = options.countOnly || false;
    this.emptyPanel = {};
  }

  init(data: any[] = this.data, grouping: any = this.grouping) {
    _.mapKeys(grouping, (values: any[], key: string) => {
      this.initSelectedItemsMapping[key] = [];
      const result = this.getGroup(values, data, key);
      this.emptyPanel[key] = result.empty;
      this.panel[key] = result.group;
      if (this.countOnly) {
        this.outPutPanel[key] = _.mapValues(result.group, (v: any[], k: string) => {
          return v.length;
        });
      } else {
        this.outPutPanel[key] = result.group;
      }
      return values;
    });
    return {
      result: this.data,
      facet: this.outPutPanel,
    };
  }

  reset() {
    this.conditions = [];
    this.conditionsMapping = {};
    return {
      result: this.data,
      facet: this.outPutPanel,
    };
  }

  push(data: ICondition[] | ICondition, trigger: boolean = this.execOnChange) {
    if (_.isEmpty(this.initSelectedItemsMapping)) { throw new Error('You need to run init first'); }
    let conditions: ICondition[];
    this.setConditions(_.isArray(data) ? data : [data]);
    return trigger && this.exec();
  }

  setConditions(conditions: any[]) {
    for (const item of conditions) {
      const key = `${item.group}-${item.value}`;
      if (!this.conditionsMapping[key] && item.selected) {
        this.conditionsMapping[key] = item;
        this.conditions.push(item);
      }
      if (this.conditionsMapping[key] && !item.selected) {
        _.remove(this.conditions, this.conditionsMapping[key]);
        this.conditionsMapping[key] = undefined;
      }
    }
  }

  exec() {
    this.selectedItemsMapping = this.getSelectedItems(this.initSelectedItemsMapping, this.conditions, this.panel);
    let result: any[] = [];
    const facet = _.mapValues(this.selectedItemsMapping, (value: any, key: string) => {
      let items: any[] = [this.data];
      _.mapKeys(this.selectedItemsMapping, (v: any[], k: string) => {
        (k !== key && !_.isEmpty(v)) && items.push(v);
        return v;
      });
      items = _.intersection(...items);
      if (_.isEmpty(result)) {
        if (!_.isEmpty(this.selectedItemsMapping[key])) {
          result = _.intersection(...items, this.selectedItemsMapping[key]);
        } else {
          result = [...items];
        }
      }
      let data = Object.assign({}, this.emptyPanel[key], this.getGroup(this.grouping[key], items, key).group);
      return this.countOnly ? this.getCount(data) : data;
    });
    return { result, facet };
  }

  getCount(data: any[]) {
    return _.mapValues(data, (v: any[], k: string) => {
      return v.length;
    });
  }

  getSelectedItems(
    initSelectedItemsMapping: any = this.initSelectedItemsMapping,
    conditions: ICondition[] = this.conditions,
    panel: any = this.panel) {
    const selectedItemsMapping = _.mapValues(initSelectedItemsMapping, (v: any, k: string) => {
      return [...v];
    });
    for (const item of conditions) {
      const data = panel[item.group][item.value];
      selectedItemsMapping[item.group].push(...data);
    }
    return selectedItemsMapping;
  }

  getGroup(values: any[], data: any[], key: string) {
    let group: any;
    let empty: any;
    if (_.isEmpty(values)) {
      group = _.groupBy(data, key);
      const keys = _.keys(group);
      empty = _.zipObject(keys, Array(keys.length).fill([]));
    } else {
      empty = this.createEmptyMapping(values);
      if (/\-/.test(values[0])) {
        group = Object.assign({}, empty, this.groupByRange(data, values, key));
      } else {
        group = Object.assign({}, empty, _.groupBy(data, key));
      }
    }
    return { group, empty };
  }

  groupByRange(data: any[], ranges: any[], key: string) {
    return _.groupBy(data, (item) => {
      let index: string;
      for (const range of ranges) {
        let [up, down] = range.split('-');
        [up, down] = [parseInt(up, 10), parseInt(down, 10)];
        const value = parseInt(item[key], 10);
        if (up && down) {
          if (value >= up && value <= down) {
            index = range;
          }
        } else if (up && !down) {
          if (value >= up) {
            index = range;
          }
        }
      }
      return index;
    });
  }

  createEmptyMapping(group: any[]): any {
    if (_.isEmpty(group)) { return {}; }
    return _.zipObject(group, Array(group.length).fill([]));
  }
}

export default Facet;
