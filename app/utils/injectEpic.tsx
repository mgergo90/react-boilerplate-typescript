import * as React from 'react';
import { useStore } from 'react-redux';
import { InjectedEpicParams, InjectedStore } from 'types';

const useInjectEpic = ({ key, epic }: InjectedEpicParams): InjectedStore => {
  const store = useStore() as InjectedStore;
  React.useEffect(() => {
    if (store.injectedEpics[key]) {
      return;
    }
    store.injectedEpics[key] = epic;
    if (store.epic$.next) {
      store.epic$.next(epic);
    }
  }, []);
  return store;
};

export default useInjectEpic;
