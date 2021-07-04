import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key} from './store'
import installElementPlus from './plugins/element'
import 'element-plus/lib/theme-chalk/display.css';
import animated from  "animate.css"
const app = createApp(App)
installElementPlus(app)
app.use(store, key, animated).use(router).mount('#app')