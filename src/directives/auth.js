import { isCheck } from '../utils/auth';

/**
 * 可绑定值或事件
 * 缺点：只在第一次刷新有用
 * @param {*} Vue 
 * @param {*} options 
 */
function install(Vue, options = {}) {
  Vue.directive(options.name || "auth", {
    inserted(el, binding) {
      if (!isCheck(binding.value)) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  })
}

export default { install };