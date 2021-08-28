
/* @remove-on-es-build-end */
import { App } from 'vue';
import { default as Editor } from './Editor/Editor.vue';
import { default as Material } from './Material/Material.vue';

const components = [
  Editor,
  Material,
];
 // Material,

const install = function(app: App) {
    components.forEach((component:any) => {
      app.use(component);
    });
    return app;
};
export { install, Editor, Material };

export default {
  version: '1.0.1',
  install,
};
