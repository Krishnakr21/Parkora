import { addNotification, removeNotification } from '@parkora-org/store/utils'

import { useAppDispatch } from '@parkora-org/store'

import { makeId } from '@parkora-org/util'
import { notification$ } from '@parkora-org/util/subjects'
import { useEffect } from 'react'
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  map,
  tap,
  timer,
} from 'rxjs'
import { delayWhen } from 'rxjs/operators'

export const useNotification = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const subscription = notification$
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        map((v) => ({ ...v, id: makeId(12) })),
        tap((v) => {
          dispatch(addNotification(v))
        }),
        delayWhen((v) => timer(v.duration || 4000)),
        tap((v) => {
          dispatch(removeNotification(v.id))
        }),
        catchError((e) => {
          return EMPTY
        }),
      )
      .subscribe()
    return () => {
      subscription.unsubscribe()
    }
  }, [addNotification, removeNotification])
}
