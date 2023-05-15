import { legacy_createStore as createStore} from 'redux';
import reducers from './reducers';
import middleware from './middleware';

export default createStore(reducers, middleware);