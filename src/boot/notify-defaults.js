// import something here
import { Notify } from 'quasar'

// "async" is optional
export default async ({ /* app, router, Vue, ... */ }) => {
  // something to do

  Notify.setDefaults({
    position: 'top-right',
    timeout: 2500,
    textColor: 'white',
    actions: [{ icon: 'close', color: 'white' }]
  })
}
