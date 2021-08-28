/**
 * Created by shunchen_yang on 16/10/25.
 */

/* eslint-disable */
UE.registerUI('dialog', (editor, uiName) => {
  const btn = new UE.ui.Button({
    name: 'xiumi-connect',
    title: '',
    onclick() {
      const dialog = new UE.ui.Dialog({
        iframeUrl: './UEditor/xiumi-ue-dialog-v5.html',
        editor,
        name: 'xiumi-connect',
        title: '',
        cssRules: `width: ${window.innerWidth - 60}px;` + `height: ${window.innerHeight - 60}px;`,
      });
      dialog.render();
      dialog.open();
    },
  });

  return btn;
});
