import {observable, autorun, isObservable} from 'mobx';
import {LocalStoreAdapter, RestApiStoreAdapter, RegisterNoun } from 'mobx-api';

const apiHost = 'http://localhost:3001/api';
const store = observable({
    isFakeApi: true,
    articles: { },
    randomstuff: { }
});

RegisterNoun('articles', store, new LocalStoreAdapter());
RegisterNoun('randomstuff', store, new LocalStoreAdapter());

store.setFakeApi = function(useFakeApi) {
    store.isFakeApi = useFakeApi;
    
    useFakeApi ? RegisterNoun('articles', store, new LocalStoreAdapter()) :
                    RegisterNoun('articles', store, new RestApiStoreAdapter(apiHost)); 
};

export default store;