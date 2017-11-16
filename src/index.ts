import * as _ from 'lodash';

class Facet {
  data: any[];
  facet: {};
  condition: {};
  grouping: any;
  execOnChange: boolean;
  panel: any;
  conditions: any[];
  selectedItemsMapping: any;
  conditionsMapping: any;
  initSelectedItemsMapping: any;
  matchedItems: any[];
  // facet: any;
  emptyPanel: any;

  constructor(options: any = {}) {
    this.data = options.data;
    this.facet = {};
    this.grouping = options.grouping;
    this.execOnChange = options.execOnChange;
    this.panel = {};
    this.conditions = [];
    this.selectedItemsMapping = {};
    this.conditionsMapping = {};
    this.initSelectedItemsMapping = {};
    this.matchedItems = [];
    // this.facet = {};
    this.emptyPanel = {};
    this.init();
  }

  push(data: any[] | any) {
    let conditions: any[];
    if (!_.isArray(data)) {
      conditions = [data];
    } else {
      conditions = data;
    }
    for (const item of conditions) {
      const key = `${item.group}-${item.value}`;
      if (!this.conditionsMapping[key] && item.selected) {
        this.conditionsMapping[key] = item;
        this.conditions.push(item);
      }
      if (this.conditionsMapping[key] && !item.selected) {
        _.remove(this.conditions, this.conditionsMapping[key]);
        delete this.conditionsMapping[key];
      }
    }
    return;
  }

  exec() {
    this.sortSelected();
    const result = _.mapValues(this.selectedItemsMapping, (value: any, key: string) => {
      let items: any[] = [];
      _.mapKeys(this.selectedItemsMapping, (v: any, k: string) => {
        if (key === k) { return; }
        if (_.isEmpty(items)) {
          items.push(...v);
        } else if (!_.isEmpty(v)) {
          items = _.intersection(items, v);
        }
        return v;
      });
      return Object.assign({}, this.emptyPanel[key], this.getGroup(this.grouping[key], items, key).group);
    });
    return {
      facet: result,
    };
  }

  sortSelected() {
    this.selectedItemsMapping = Object.assign({}, this.initSelectedItemsMapping);
    this.matchedItems = [];
    for (const item of this.conditions) {
      const data = this.panel[item.group][item.value];
      this.selectedItemsMapping[item.group].push(...data);
    }
  }

  init(data: any[] = this.data, grouping: any = this.grouping) {
    _.mapKeys(grouping, (values: any[], key: string) => {
      this.initSelectedItemsMapping[key] = [];
      const result = this.getGroup(values, data, key);
      this.emptyPanel[key] = result.empty;
      this.panel[key] = result.group;
      return values;
    });
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
        group = Object.assign(empty, this.groupByRange(data, values, key));
      } else {
        group = Object.assign(empty, _.groupBy(data, key));
      }
    }
    return { group, empty };
  }

  groupByRange(data: any[], ranges: any[], key: string) {
    return _.groupBy(data, (item) => {
      let index: string;
      for (const range of ranges) {
        const [up, down] = range.split('-');
        if (up && down) {
          if (item[key] >= up && item[key] <= down) {
            index = range;
          }
        } else if (up && !down) {
          if (item[key] >= up) {
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
