import {observable, autorun, isObservable} from 'mobservable';
import {LocalStoreAdapter, RestApiStoreAdapter, RegisterNoun, RegisterApis } from 'mobservable-api';
import mapi from 'mobservable-api';

var api_names_hash = {};
for(let api_name of window.api_names) {
    api_names_hash[api_name] = {};
}
const store = observable(Object.assign({}, {
    isFakeApi: false
}, api_names_hash));

window.store = store;

for(let api of window.apis) {
    api(mapi, store);
}

store.setFakeApi = function(useFakeApi) {
    store.isFakeApi = useFakeApi;
    
    // useFakeApi ? RegisterNoun('articles', store, new LocalStoreAdapter()) :
                    // RegisterNoun('articles', store, new RestApiStoreAdapter(apiHost)); 
};

export default store;