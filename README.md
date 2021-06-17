# vue2-screen-template

### 目录结构

├── README.md
├── babel.config.js
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets
│   │   └── logo.png
│   ├── components
│   ├── main.js
│   ├── router
│   │   └── index.js
│   ├── store
│   │   └── index.js
│   └── views
│   └── Home.vue
├── tree.text
└── vue.config.js

### 代码规范

#### 组件命名

- [单文件组件](https://vue3js.cn/docs/zh/guide/single-file-component.html)的文件名应该要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)

```js
components/
|- MyComponent.vue
// 或者
components/
|- my-component.vue
```

#### 组件引入

```js
<!-- 在所有地方 -->
<my-component></my-component>
或者
<!-- 在单文件组件和字符串模板中 -->
<MyComponent/>
```

#### name 命名

```js
name: 'MyComponent',
```

#### props 命名

- 在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板和 [JSX](https://vue3js.cn/docs/zh/guide/render-function.html#jsx) 中应该始终使用 kebab-case。

- 我们单纯的遵循每个语言的约定。在 JavaScript 中更自然的是 camelCase。而在 HTML 中则是 kebab-case。

```js
props: {
  greetingText: String
}
组件使用时: <WelcomeMessage greeting-text="hi" />
```

### 书写顺序

[书写顺序](https://vue3js.cn/docs/zh/style-guide/#%E4%BC%98%E5%85%88%E7%BA%A7-c-%E7%9A%84%E8%A7%84%E5%88%99-%E6%8E%A8%E8%8D%90-%E5%B0%86%E9%80%89%E6%8B%A9%E5%92%8C%E8%AE%A4%E7%9F%A5%E6%88%90%E6%9C%AC%E6%9C%80%E5%B0%8F%E5%8C%96)

### rem 自适应方案

设计稿是基于 1920\*1080 的,将设计稿分成了 24 等分。项目中宽度可直接写 px 单位,但是高度需要用%或者是 vh

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
