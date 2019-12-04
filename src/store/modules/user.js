import {getToken,getPermission} from '@/utils/auth'
import store from '../../store'
import router from '../../router'

const user = {
    state: {
        token: getToken(),
        role: ''
    },
    mutations: {
        SET_ROLES: (state, role) => {
            state.role = role
        }
    },
    actions: {
        getInfo({commit}) {
            return new Promise(resolve => {
                var role
                if(process.env.NODE_ENV != 'production'){
                    role = 1
                } else {
                    role = JSON.parse(getPermission()).roleId
                }
                commit('SET_ROLES',role)
                store.dispatch('GenerateRoutes',role).then(() => {
                    router.addRoutes(store.getters.addRouters)
                })
                resolve(role)
            })
        }
    }
}

export default user