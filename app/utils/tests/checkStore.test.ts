/**
 * Test injectors
 */

import checkStore from '../checkStore';
import { InjectedStore } from '../../types';
import { Action, Dispatch } from 'redux';
import { Subject } from 'rxjs';

const action: Action<number> = {
  type: 10,
};
const disp: Dispatch<typeof action> = (param) => param;


describe('checkStore', () => {
  let store: Omit<InjectedStore, 'Symbol[Observable'>;

  beforeEach(() => {
    store = {
      dispatch: disp,
      subscribe: (listener) => () => {},
      getState: () => {},
      replaceReducer: () => {},
      injectedReducers: {},
      injectedEpics: {},
      epic$: new Subject(),
    };
  });

  it('should not throw if passed valid store shape', () => {
    expect(() => checkStore(store)).not.toThrow();
  });

  it('should throw if passed invalid store shape', () => {
    expect(() => checkStore({})).toThrow();
    expect(() => checkStore({ ...store, injectedEpics: null })).toThrow();
    expect(() => checkStore({ ...store, injectedReducers: null })).toThrow();
    expect(() => checkStore({ ...store, epic$: null })).toThrow();
    expect(() => checkStore({ ...store, replaceReducer: null })).toThrow();
  });
});
