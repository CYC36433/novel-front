# mis-front-frame

> A front frame for MIS　MIS系统开发前端基础框架　持续更新中...

## VScode settings.json配置推荐
``` bash
{
  "window.zoomLevel": 0,
  "vetur.validation.template": false,
  "editor.suggestSelection": "first",
  "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",
  "files.autoSave":"off",
  "eslint.validate": [
    "javascript",
    {
      "language": "vue",
      "autoFix": true
    },
    "html",
    "vue"
  ],
  "eslint.autoFixOnSave": true,
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "files.exclude": {
    "**/.classpath": true,
    "**/.project": true,
    "**/.settings": true,
    "**/.factorypath": true
  },
  "workbench.sideBar.location": "left",
  "terminal.integrated.rendererType": "dom",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.fontSize": 16,
  "editor.tabSize": 2,
  "diffEditor.ignoreTrimWhitespace": false,
  "workbench.activityBar.visible": true,
  "sonarlint.rules": {
    "Web:BoldAndItalicTagsCheck": {
      "level": "off"
    }
  },
}
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
