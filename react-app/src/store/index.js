import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import tiers from './tiers';
import session from './session';
import tutorials from './tutorials';
import danceStyles from './danceStyles';
import tutorialLevels from './tutorialLevels';

const rootReducer = combineReducers({
  tiers,
  session,
  tutorials,
  danceStyles,
  tutorialLevels,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
