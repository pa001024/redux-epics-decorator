import { exhaustMap } from 'rxjs/operators/exhaustMap'
import { map } from 'rxjs/operators/map'
import { mergeMap } from 'rxjs/operators/mergeMap'
import { takeUntil } from 'rxjs/operators/takeUntil'
import { of as just } from 'rxjs/observable/of'
import { Action } from 'redux-actions'
import { Observable } from 'rxjs/Observable'
import { push } from 'react-router-redux'

import { generateMsg, Msg } from '../service'
import { EffectModule, Module, Effect, Reducer, ModuleActionProps, DefineAction } from '../../../src'

export interface Module1StateProps {
  currentMsgId: string | null
  allMsgs: Msg[]
}

@Module('one')
class Module1 extends EffectModule<Module1StateProps> {
  defaultState: Module1StateProps = {
    currentMsgId: null,
    allMsgs: []
  }

  @DefineAction() dispose: Observable<Action<void>>

  @Effect({
    success: (state: Module1StateProps, { payload }: Action<Msg>) => {
      const { allMsgs } = state
      return { ...state, allMsgs: allMsgs.concat([payload!]) }
    }
  })
  getMsg(action$: Observable<void>) {
    return action$
      .pipe(
        exhaustMap(() => generateMsg()
          .pipe(
            takeUntil(this.dispose),
            map(this.createAction('success'))
          )
        )
      )
  }

  @Reducer()
  selectMsg(state: Module1StateProps, { payload }: Action<string>) {
    return { ...state, currentMsgId: payload }
  }

  @Effect()
  getModule3Msg(action$: Observable<void>) {
    return action$
      .pipe(
        map(() => this.markAsGlobal({
          type: 'three_get_msg'
        }))
      )
  }

  @Effect()
  changeRouter(action$: Observable<void>) {
    return action$
      .pipe(
        mergeMap(() => just(push('/hmmm')))
      )
  }
}

export type Module1DispatchProps = ModuleActionProps<Module1StateProps, Module1>

export default Module1
