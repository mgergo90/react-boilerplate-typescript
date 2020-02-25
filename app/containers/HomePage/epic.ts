/**
 * Gets the repositories of the user from Github
 */

import { reposLoaded, repoLoadingError } from 'containers/App/actions';
import ActionTypes from 'containers/App/constants';

import { makeSelectUsername } from 'containers/HomePage/selectors';
import { withLatestFrom, mergeMap, filter, map, catchError } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { ajax } from 'rxjs/ajax';
import { Observable, of } from 'rxjs';
import { ActionsObservable, StateObservable } from 'redux-observable';

const getRepos = (action$: ActionsObservable<any>, state$: StateObservable<any>): Observable<any> => action$.pipe(
  filter(isOfType(ActionTypes.LOAD_REPOS)),
  withLatestFrom(state$),
  mergeMap(([, state]: [any, any]) => {
    const selector = makeSelectUsername();
    const username = selector(state);
    const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
    return ajax.getJSON(requestURL).pipe(
      map((res: any) => reposLoaded(res, username)),
      catchError((error: any) => of(repoLoadingError(error))),
    );
  }),
);

export default getRepos;
