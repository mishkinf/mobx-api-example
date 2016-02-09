import {observable} from 'mobservable';

const store = observable({
    articles: {
        data: [],
        isFetching: false,
        errors: [],
        lastRequest: null
    },
    isFakeApi: true
});

class StoreAdapter {
    constructor() {
        if(this.create === undefined) { throw new TypeError('Must override create method'); }
        if(this.update === undefined) { throw new TypeError('Must override update method'); }
        if(this.read === undefined) { throw new TypeError('Must override read method'); }
        if(this.read_all === undefined) { throw new TypeError('Must override read method'); }
        if(this.delete === undefined) { throw new TypeError('Must override delete method'); }
    }
}

class RestApiStoreAdapter extends StoreAdapter {
    constructor(noun, url) {
        super();
        this.noun = noun;
        this.url = url;
    }
    
    create(item) {
        console.log('rest adapter create');
        const requestStartTime = (new Date()).getTime();
        this.post(requestStartTime, item);
    }
    
    update(item) {
        console.log('rest adapter update');
        
    }
    
    read(id) {
        console.log('rest adapter read');
    }
    
    read_all() {
        console.log('rest adapter read all');
        if(store[this.noun] == undefined || store[this.noun] == null) {
            store[this.noun] = Object.assign({}, store[this.noun], {
                data: [],
                isFetching: true,
                errors: [],
                lastRequest: null
            });        
        } else {
            store[this.noun] = Object.assign({}, store[this.noun], {
                isFetching: true,
                lastRequest: null                
            });
            // debugger;
            // if(store[this.noun].data == undefined) {
            //     store[this.noun].data = []
            // }
        }
        
        console.log('Fetching: ', this.url);
        const requestStartTime = (new Date()).getTime();
        this.get(requestStartTime);
    }
    
    post(requestStartTime, item) {
        var headers = new Headers({"Content-type": "application/json"});
        const self = this;
        fetch(this.url + '/' + this.noun,
        {
            mode: 'cors', 
            method: "POST",
            headers: headers,
            body: JSON.stringify({ article: item })
        }).then(response => response.json())
        .then(json => {
            self.read_all();
        })
        .catch((error) => {
            debugger;
            
            if(store[this.noun].lastRequest != null && requestStartTime < store[this.noun].lastRequest) {
                console.log('STALE ERROR RESPONSE', 'this response is older than another response! ', requestStartTime, store[this.noun].lastRequest);
                return;
            }
            
            // do something else
        });
    }
    
    put(requestStartTime, item) {
        
    }
    
    delete(requestStartTime, id) {
        
    }
    
    get(requestStartTime) {
        fetch(this.url + '/' + this.noun + '.json')
            .then(response => response.json())
            .then(json => {
                if(store[this.noun].lastRequest != null && requestStartTime < store[this.noun].lastRequest) {
                    console.log('STALE SUCCESS RESPONSE', 'this response is older than another response! ', requestStartTime, store[this.noun].lastRequest);
                    return;
                } 
                console.log('success: ', json[this.noun]);
                
                if(json.error != null || json.error != undefined) {
                    throw new Error('Not Found');
                }
                
                store[this.noun] = {
                    data: json[this.noun],
                    errors: [],
                    isFetching: false,
                    lastRequest: requestStartTime
                };
            })
            .catch((error) => {
                debugger;
                
                if(store[this.noun].lastRequest != null && requestStartTime < store[this.noun].lastRequest) {
                    console.log('STALE ERROR RESPONSE', 'this response is older than another response! ', requestStartTime, store[this.noun].lastRequest);
                    return;
                }
                
                store[this.noun] = {
                    data: [],
                    errors: error,
                    isFetching: false
                };
            });  
    }
    
    delete(id) {
        console.log('rest adapter delete');
    }
}

class LocalStoreAdapter extends StoreAdapter {
    constructor(noun) {
        super();
        this.noun = noun;
        this.global_count = 0
        // store[this.noun] = {
        //     isFetching: false,
        //     data: [],
        //     errors: []
        // }
        
        localStorage.setItem(this.noun, JSON.stringify([]));
    }
    
    create(item) {
        console.log('creating ', this.noun);
        var currentItems = JSON.parse(localStorage.getItem(this.noun));
        var insertItem = Object.assign({}, item, {id: this.global_count++});
        currentItems.push(insertItem);
        localStorage.setItem(this.noun, JSON.stringify(currentItems));
        return insertItem;
    }
    
    update(item) {
        var currentItems = JSON.parse(localStorage.getItem(this.noun));
        var currentItem = currentItems.filter(function(i) { return item.id == i.id })[0];
                
        Object.assign(currentItem, {}, item);
        localStorage.setItem(this.noun, JSON.stringify(currentItems));
        
        return currentItem;
    }
    
    read_all() {
        return JSON.parse(localStorage.getItem(this.noun));
    }
    
    read(id) {
        console.log('reading ', this.noun, ' with id ', id);
        var currentItems = JSON.parse(localStorage.getItem(this.noun));
        var currentItem = currentItems.filter(function(item) { return item.id == id })[0];
        
        if(currentItem == null) throw new Error('Item with id ' + id + ' does not exist!');
        return currentItem;
    }
    
    delete(id) {
        console.log('delete');
        var currentItems = JSON.parse(localStorage.getItem(this.noun));
        var deleteItem = currentItems.filter(function(item) { return id == item.id })[0];
        currentItems.splice(currentItems.indexOf(deleteItem), 1);
        localStorage.setItem(this.noun, JSON.stringify(currentItems));
        
        return currentItems;  
    }
}

store.adapter = new LocalStoreAdapter('articles');

store.setFakeApi = function(useFakeApi) {
    if(useFakeApi) {
        console.log('setting api to localstoreadapter');
        store.adapter = new LocalStoreAdapter('articles');
        store.isFakeApi = true;
    } else {
        console.log('setting api to restapistoreadapter');
        store.adapter = new RestApiStoreAdapter('articles', 'http://localhost:3001/api');
        store.isFakeApi = false;
    }
    store.articles = {
        data: [],
        isFetching: false
    };
}

store.get = function(noun) {
    console.log(store[noun].data);
    // if(store[noun] == undefined || store[noun].data == null || store[noun].data == undefined || !Array.isArray(store[noun].data)) {
    //     store[noun].data = [];
    //     //     data: [],
    //     //     isFetching: false,
    //     //     errors: [],
    //     //     lastRequest: null
    //     // }
    // } 
    
    return store[noun];
};

store.create = function(noun, item) {
    store.adapter.create(item);
    store[noun].data = store.adapter.read_all();
};

store.update = function(noun, item) {
    store.adapter.update(item);
    store[noun].data = store.adapter.read_all();
};

store.read_all = function(noun) {
    store.adapter.read_all();    
}

store.delete = function(noun, id) {
    store.adapter.delete(id);
    store[noun].data = store.adapter.read_all();    
};

store.read = function(noun, id) {
    store.adapter.read(id);
    store[noun].data = store.adapter.read_all();    
};

store.apiRequest = function(noun, url, successFn=null, errorFn=null) {
    var namespace = noun;

    if(store[namespace] == undefined || store[namespace] == null) {
       store[namespace] = {
           data: [],
           isFetching: true,
           errors: [],
           lastRequest: null
       };        
    } else {
        store[namespace].isFetching = true;
    }
    
    console.log('Fetching: ', url);
    const requestStartTime = (new Date()).getTime();
    fetch(url)
        .then(response => response.json())
        .then(json => {
            if(requestStartTime < store[namespace].lastRequest) {
                console.log('STALE SUCCESS RESPONSE', 'this response is older than another response! ', requestStartTime, store[namespace].lastRequest);
                return;
            } 
            console.log('success: ', json);
            
            if(json.error != null || json.error != undefined) {
                throw new Error('Not Found');
            }
            
            if(successFn != null) {
                store[namespace].data = successFn(json);
            } else {
                store[namespace].data = json;    
            }

            store[namespace].errors = [];   
            store[namespace].isFetching = false;
            store[namespace].lastRequest = requestStartTime;
        })
        .catch((error) => {
            if(requestStartTime < store[namespace].lastRequest) {
                console.log('STALE ERROR RESPONSE', 'this response is older than another response! ', requestStartTime, store[namespace].lastRequest);
                return;
            }
            console.log('error: ', error);
            
            if(errorFn != null) {
                store[namespace].errors = errorFn(error);
            } else {
                store[namespace].errors = error;    
            }
            store[namespace].data = [];                
            store[namespace].isFetching = false;            
        }); 
};

export default store;