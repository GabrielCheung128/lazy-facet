import * as _ from 'lodash';

class Facet {
    data: any[];
    facet: {};
    condition: {};
    grouping: {};

    constructor(options: any = {}) {
        this.data = options.data;
        this.facet = {};
        this.grouping = options.grouping;
    }

    push(data: {} | any[]) {
        
    }

    exec() {

    }

    
}

export default Facet;