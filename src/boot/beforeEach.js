export default ({ router, store, Vue }) => {
    router.beforeEach((to, from, next) => {
        //现在您需要在这里添加验证逻辑，比如调用一个API
        if (store.state.userId) {
            // Router.addRoutes(powerRouter)
            next()
        } else {
            next()
            // console.log(to, from)
            // if (to.path == '/' || to.path == '/Signup') {
            //   next()
            // } else { // 在根目錄 / 時或沒認證的網頁，強迫導到login
            //   next('/')
            // }
        }
    })
}