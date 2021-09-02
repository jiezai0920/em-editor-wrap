
/* @remove-on-es-build-end */
import Editor from './Editor/Editor.vue';
import Material from './Material/Material.vue';

const components = [
  Editor,
  Material,
];

const install = function(app) {
    components.forEach((component) => {
      app.component(component.name, component);
    });
    return app;
};
export {
  install,
  Editor,
  Material,
};

export default {
  version: '1.0.1',
  install,
};
