import {createWebHashHistory, createRouter} from 'vue-router'
import Home from './views/Home.vue'
import Doc from './views/Doc.vue'
import EditorDemo from './components/Editor/EditorDemo.vue'
import MaterialDemo from './components/Material/Demo.vue'

import {h} from 'vue'
import Markdown from './components/Markdown.vue'
import Intro from './markdown/intro.md'
import Install from './markdown/install.md'
import GetStarted from './markdown/get-started.md'

const md = content => h(Markdown,{content})

const history = createWebHashHistory()
const router = createRouter({
  history: history,
  routes: [
    {path: '/', component: Home},
    {
        path: '/doc', 
        component: Doc,
        children:[
            { path: "", redirect:'/doc/intro' },
            {path:'get-started', component:md(GetStarted)},
            {path:'install', component:md(Install)},
            {path:'intro', component:md(Intro)},
            {path:'editor', component:EditorDemo},
            {path:'material', component:MaterialDemo},
        ]
    }
  ]
})
export default router