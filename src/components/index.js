import Vue from 'vue'

const componentsContext = require.context('../components', false, /\.vue$/)

componentsContext.keys().forEach(component => {
  const componentConfig = componentsContext(component)
  const ctrl = componentConfig.default || componentConfig
  if (ctrl.name) {
    Vue.component(ctrl.name, ctrl)
  }
})
