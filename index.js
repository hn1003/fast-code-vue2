
import hnAnyInput from './components/hnAnyInput'
import hnFormPage from './components/hnFormPage'
import DynamicInput from './components/DynamicInput'
import hnTablePage from './components/hnTablePage'
import hnGroupInput from './components/hnGroupInput'
import hnUploadImage from './components/fcUploadImage'
import paramsTemplateBuilder from './templateBuilder/views/paramsTemplateBuilder'
import plugParamsTemplateBuilder from './templateBuilder/views/plugParamsTemplateBuilder'
const MyEle = {
  install(Vue) {
    // 在此处添加自定义的全局组件
    Vue.component('hnAnyInput', hnAnyInput)
    Vue.component('hnFormPage', hnFormPage)
    Vue.component('DynamicInput', DynamicInput)
    Vue.component('hnTablePage', hnTablePage)
    Vue.component('hnGroupInput', hnGroupInput)
    Vue.component('hnUploadImage',hnUploadImage)
  }
}

export {
  paramsTemplateBuilder,
  plugParamsTemplateBuilder,
  hnAnyInput,
  hnFormPage,
  DynamicInput,
  hnTablePage,
  hnGroupInput,
  hnUploadImage
}

export default MyEle
