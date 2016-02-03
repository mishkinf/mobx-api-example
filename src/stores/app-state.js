import {observable} from 'mobservable';

const store = observable({
    articles: {
        data: '',
        isFetching: false,
        errors: [],
        lastRequest: null
    }
});

class StoreAdapter {
    constructor() {
        if(this.create === undefined) { throw new TypeError('Must override create method'); }
        if(this.update === undefined) { throw new TypeError('Must override update method'); }
        if(this.read === undefined) { throw new TypeError('Must override read method'); }
        if(this.delete === undefined) { throw new TypeError('Must override delete method'); }
    }
}

class RestApiStoreAdapter extends StoreAdapter {
    constructor(noun, url) {
        super();
        this.noun = noun;
        this.url = url;
    }
    
    create() {
        
    }
    
    update() {
        
    }
    
    read() {
        
    }
    
    delete() {
        
    }
}
// extends StoreAdapter
class LocalStoreAdapter extends StoreAdapter {
    constructor(noun) {
        super();
        this.noun = noun;
        
        localStorage.setItem(this.noun, JSON.stringify([]));
    }
    
    create(item) {
        console.log('creating ', this.noun);
        var currentItems = JSON.parse(localStorage.getItem(this.noun));
        var insertItem = Object.assign({}, item, {id: currentItems.length});
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
        var deleteItem = currentItems.filter(function(i) { return item.id == i.id })[0];
        currentItems = currentItems.splice(currentItems.indexOf(deleteItem), 1);
        localStorage.setItem(this.noun, JSON.stringify(currentItems));
        
        return currentItems;  
    }
}

const storeAdapter = new LocalStoreAdapter();

store.create = function() {
    storeAdapter.create();
};

store.update = function() {
    storeAdapter.update();
};

store.delete = function() {
    storeAdapter.delete();
};

store.read = function() {
    storeAdapter.read();
};

store.apiRequest = function(noun, url, successFn=null, errorFn=null) {
    var namespace = noun;

    if(store[namespace] == undefined || store[namespace] == null) {
       store[namespace] = {
           data: '',
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
            store[namespace].data = '';                
            store[namespace].isFetching = false;            
        }); 
};

export default store;