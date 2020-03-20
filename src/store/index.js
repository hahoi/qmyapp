import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
Vue.use(Vuex)




const state = {
  device: "",
  loading: true,  // this.$store.getters.loading
  // userId: sessionStorage.getItem('uid')=== "undefined" ? "" : sessionStorage.getItem('uid') ,
  userId: '',
  user:null,

  ApplicationText : "",
  footerText : "",
  admTelephone : "",
  projectEndDate: "", //專案結束日期
  LevelOneID: "",  // this.$store.getters.LevelOneID 
  //權限控管
  // role: null,
  newRouter: [],
  workItemData:{},
  mustUpdate: false,
}
const getters = {
  device: state => state.device,
  loading: state => state.loading,
  userId: state => state.userId,
  user: state => state.user,
  ApplicationText: state => state.ApplicationText,
  footerText: state => state.footerText,
  admTelephone: state => state.admTelephone,
  LevelOneID: state => state.LevelOneID,
  projectEndDate: state => state.projectEndDate, 
  // role: state => state.user.role,
  newRouter: state => state.newRouter,
  workItemData: state => state.workItemData,
  mustUpdate: state => state.mustUpdate,
}
const mutations = {
  setLoading(state,loading){
    state.loading = loading
  },
  setDevice(state,device){
    state.device = device
  },
  setUserId(state, userId) {
    state.userId = userId;
  },
  setUser(state, user) {
    state.user = user;
  },
  clearUserId(state) {
    state.userId = null;
  },
  setNewRouter(state, newRouter) {
    state.newRouter = newRouter
  },
  setWorkItemData(state, data) {
    state.workItemData = data
  },
  setmustUpdate(state, data) {
    state.mustUpdate = data
  },

 
  setApplicationTexte(state, data) {
    state.ApplicationText = data
  },
  setfooterText(state, data) {
    state.footerText = data
  },
  setadmTelephone(state, data) {
    state.admTelephone = data
  },
  setprojectEndDate(state, data) {
    state.projectEndDate = data
  },
  setLevelOneID(state, data) {
    state.LevelOneID = data
  },


}
const actions = {
  // saveRoles({ commit }, newRouter) {
  //     commit('setNewRouter', newRouter) //更新可使用的路由
  // },


    // ===依據角色role，儲存可使用的路由=====
  async saveRoles({ commit }, newRouter) {
    return new Promise((resolve) => {
      commit('setNewRouter', newRouter) //更新可使用的路由
      resolve(newRouter);
    }).catch((error)=> {
      console.log('catch:', error);
    });
  },
  async loginSet({ commit }, user) {
    try {
      return new Promise((resolve) => {
        // console.log(user.authId)
        commit('setUserId', user.authId);
        commit('setUser', user);
        sessionStorage.setItem('uid', user.authId) //存入 session 
        resolve(user);
      });
    }
    catch (error) {
      throw new Error(error)
    }

  },  // ======== 登出 ============
  async logout({ commit }) {
    try {
      return new Promise((resolve) => {
        commit('setUserId', '')
        commit('setUser', null)
        location.reload()
        sessionStorage.removeItem('uid');
        resolve();
      });
    }
    catch (error) {
      throw new Error(error)
    }
  },

}



/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
  
    modules: {
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
