import Toast from './Toast.vue';

const obj = {};

obj.install = function(Vue) {
  // console.log("obj install");
  // 1、创建组件构造器
  const toastContrustor = Vue.extend(Toast);

  // 2、通过new 一个Contrustor获得组件对象
  const toast = new toastContrustor();

  // 3、将组件手动挂载到某个元素上
  toast.$mount(document.createElement('div'));

  // 4、将组件放到body中
  document.body.appendChild(toast.$el);

  Vue.prototype.$toast = toast;

}

export default obj;