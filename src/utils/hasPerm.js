import store from '../store'
import { isArrayHasSame } from '@/utils'

export function hasPerm(roles) {
  var myRoles = store.getters.roles
  return isArrayHasSame(myRoles, roles)
}
