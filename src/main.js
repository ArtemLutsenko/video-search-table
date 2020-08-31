import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.filter('striphtml', function (value) {
  let div = document.createElement("div");
  div.innerHTML = value;
  let text = div.textContent || div.innerText || "";
  return text;
});

new Vue({
  render: h => h(App),
}).$mount('#app')
