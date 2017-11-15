import * as _ from 'lodash';

class Facet {
  data: any[];
  facet: {};
  condition: {};
  grouping: {};
  execOnChange: boolean;
  initGrouping: any;
  panel: any;

  constructor(options: any = {}) {
    this.data = options.data;
    this.facet = {};
    this.grouping = options.grouping;
    this.execOnChange = options.execOnChange;
    this.initGrouping = {};
    this.panel = {};
  }

  initGroups(data: any[], grouping: any) {
    _.mapKeys(grouping, (value: any[], key: string) => {
      if (!_.isEmpty(value)) {
        const mappings = (() => {
          const result: any = {};
          for (let i: number = 0; i < value.length; i++) {
            result[i] = [];
          }
          return result;
        })();
        this.initGrouping[key] = Object.assign(mappings, _.groupBy(data, (item) => {
          let index: number;
          for (let i: number = 0; i < value.length; i++) {
            const range = value[i];
            if (range.from <= item[key] && range.to >= item[key]) {
              index = i;
            }
          }
          return index;
        }));
      } else {
        this.initGrouping[key] = _.groupBy(data, key);
      }
      return value;
    });
  }

  push(data: {} | any[]) {
    return;
  }

  exec() {
    return;
  }

  // cal(cri: any) {
  // }

  // normalGroupBy(key: string, value: any[], data: any[]) {
  //   this.initGrouping[key] = _.groupBy(data, key);
  //   this.panel[key] = _.mapKeys(this.initGrouping[key], (v: any[], k: string) => {

  //   });
  // }

  init(data: any[] = this.data, grouping: any = this.grouping) {
    _.mapKeys(grouping, (values: any[], key: string) => {
      if (_.isEmpty(values)) {
        this.initGrouping[key] = _.groupBy(data, key);
        this.panel[key] = {};
        this.count(key);
      } else {
        const emptyMapping = this.createEmptyMapping(values);
        const emptyPanel = emptyMapping.panel;
        const emptyGrouping = emptyMapping.grouping;
        this.initGrouping[key] = emptyGrouping;
        this.panel[key] = emptyPanel;
        let temp: any;
        if (/\-/.test(values[0])) {
            temp = _.groupBy(data, (item) => {
                let index: string;
                for (const range of values) {
                    const [up, down] = range.split('-');
                    if(up && down) {
                        if (item[key] >= up && item[key] <= down) {
                            index = range;
                        };
                    } else if (up && !down) {
                        if (item[key] >= up) {
                            index = range;
                        };
                    }
                }
                return index;
            });
        } else {
            temp = _.groupBy(data, key);
        }
        Object.assign(this.initGrouping[key], temp);
        this.count(key);
      }
      return values;
    });
    console.log(this.initGrouping);
    console.log(this.panel);
  }

  count(key: string){
    _.mapKeys(this.initGrouping[key], (items: any[], itemKey: string) => {
        this.panel[key][itemKey] = items.length;
        return items;
      });
  }

  groupBy(value: string, key: string, data: any[]) {
    // if (!/\-/.test(key))
    return;
  }

  createEmptyMapping(group: any[]): any {
    if (_.isEmpty(group)) { return {}; }
    return {
      panel: _.zipObject(group, Array(group.length).fill(0)),
      grouping: _.zipObject(group, Array(group.length).fill([])),
    };
  }
}

export default Facet;
