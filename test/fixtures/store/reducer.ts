import { combineReducers } from 'redux'
import { RouterState, connectRouter } from 'connected-react-router'

import { combineModuleReducers } from '../../../src'
import { reducer as module3, Module3StateProps } from '../module3'
import Module1, { Module1StateProps } from '../module1'
import Module2, { Module2StateProps } from '../module2'
import Module4, { Module4StateProps } from '../module4'
import DepModule4, { DepModule4StateProps } from '../module4/depModule'
import { Module5, Module5StateProps } from '../module5'
import { history } from './history'

export interface GlobalState {
  module1: Module1StateProps
  module2: Module2StateProps
  module3: Module3StateProps
  module4: Module4StateProps
  depModule4: DepModule4StateProps
  module5: Module5StateProps
  router: RouterState
}

export default combineReducers<GlobalState>({
  ...combineModuleReducers({
    module1: Module1,
    module2: Module2,
    module4: Module4,
    depModule4: DepModule4,
    module5: Module5,
  }),
  module3,
  router: connectRouter(history),
})
