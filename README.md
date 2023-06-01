# REACT DOME V2

### 使用create react app创建

* 技术栈:`react` `react-redux^8.0.2`   
* 路由: `react-router-dom^6.3.0`
* 状态管理器: `@reduxjs/toolkit^1.8.2`
* 代码美化: `prettier`
* 国际化: `i18next`
* hooks: `ahooks` 
* UI库: `antd`

### 常用命令
* `yarn`           下载依赖包

* `yarn start:dev` 运行dev环境

* `yarn start:uat` 运行uat环境

* `yarn start:prd` 运行正式(prd)环境

* `yarn build:dev` 编译dev测试包，将用于生产的应用程序构建到 `build` 文件夹

* `yarn build:uat` 编译uat测试包，将用于生产的应用程序构建到 `build` 文件夹

* `yarn build:prd` 编译正式包，将用于生产的应用程序构建到 `build` 文件夹

* `yarn prettier` 格式化代码，用于代码美化、配置文件如下

  ```
  .prettierignore 忽略文件
  .prettierrc 美化基础配置
  ```

* `yarn test`

  在交互式观察模式下启动测试运行器。
  有关更多信息，请参阅有关 [运行测试](https://facebook.github.io/create-react-app/docs/running-tests) 的部分。

* `yarn eject`

  **Note: this is a one-way operation. Once you `eject`, you can’t go back!**

  如果您对构建工具和配置选择不满意，您可以随时“弹出”。 此命令将从您的项目中删除单个构建依赖项。

  相反，它会将所有配置文件和可传递依赖项（webpack、Babel、ESLint 等）复制到您的项目中，以便您可以完全控制它们。 除了“eject”之外的所有命令仍然有效，但它们将指向复制的脚本，以便您可以调整它们。 在这一点上，你是靠自己的。

  你不必使用 `eject`。 精选功能集适用于中小型部署，您不应该觉得有义务使用此功能。 但是我们知道，如果您在准备好时无法对其进行自定义，则此工具将没有用处。

### 配置说明

* 项目目录具体说明参考目录：`Configuration.md`
* web3-react-v8版本介绍说明：`web3-react v8.svg` `web3-react v8.png` `web3-react v8链接.xmind`

### 目录

```bash
react-dome-v2
├─.env                    #env配置
├─.gitignore              #git忽略文件
├─.prettierignore         #prettier忽略文件
├─.prettierrc             #prettier配置
├─craco.config.js
├─package.json
├─paths.json
├─README.md
├─tsconfig.json
├─web3-react v8.svg       #web3-react-v8版本介绍
├─yarn.lock
├─src
|  ├─App.less             #全局css样式入口
|  ├─App.test.tsx
|  ├─App.tsx              #样式入口
|  ├─index.tsx            #App、index样式入口
|  ├─logo.svg
|  ├─react-app-env.d.ts
|  ├─reportWebVitals.ts
|  ├─setupTests.ts
|  ├─utils                #其他配置
|  |   ├─i18n.tsx         #语言包
|  |   ├─index.ts
|  |   ├─requestApi.ts    #api请求
|  |   └requestLimt.ts    #合约api批量请求
|  ├─theme                #theme主题配置
|  |   ├─index.less
|  |   ├─index.tsx
|  |   ├─removeDefault.less
|  |   └styled.d.ts
|  ├─store                #状态管理器
|  |   ├─index.ts
|  |   ├─theme.ts
|  |   ├─user.ts
|  |   └wallet.ts
|  ├─router               #router路由
|  |   └index.tsx
|  ├─pages                #页面目录
|  |   ├─404.tsx
|  |   ├─Home
|  |   ├─Exchange         #兑换
|  ├─locales              #语言包
|  |    ├─en-us.ts
|  |    ├─zh-cn.ts
|  |    ├─zh-cn
|  |    ├─en-us
|  ├─layout               #页面Layout布局
|  |   ├─index.tsx
|  |   └styled.ts
|  ├─hooks
|  |   ├─useChainIdHooks.ts
|  |   ├─useDataHooks.ts
|  |   ├─useErrorHooks.ts
|  |   ├─useWeb3ProviderHooks.ts
|  |   └useWindowSizeHooks.ts
|  ├─contracts             #合约目录
|  |     ├─chains.ts       #chainId配置
|  |     ├─constant.init.ts#data init
|  |     ├─constant.ts     #合约数据配置
|  |     ├─networks.ts     #网络配置
|  |     ├─wallets.ts      #链接方式配置
|  |     ├─abis            #abi文件
|  ├─connectors            #钱包链接器初始化
|  |     ├─metaMask.ts
|  |     ├─network.ts
|  |     └walletConnect.ts
|  ├─components            #公共组件目录
|  |     ├─Web3Provider    #web3实现实例化组件
|  |     ├─TopBar          #TopBar栏
|  |     ├─SwitchLanguage  #Language组件
|  |     ├─SideMenuH5      #H5 Menu
|  |     ├─SideMenu        #Web Menu
|  |     ├─SelectNetWork   #网络切换
|  |     ├─PagesProvider   #全局入口处理web3js实例化后组件
|  |     ├─Footer          #Footer栏
|  |     ├─ConnectWallet   #wallet组件
|  |     |       ├─index.tsx
|  |     |       ├─metaMask.tsx
|  |     |       ├─styled.ts
|  |     |       └walletConnect.tsx
|  ├─common                #公共方法目录
|  |   ├─antd.cus.tsx      #antd自定义
|  |   ├─data.d.ts         #类型声明
|  |   ├─index.ts          #通用方法
|  |   ├─limitPromise.ts   #axios请求分组
|  |   └styled.ts          #公用样式入口
|  ├─assets                #静态目录
|  ├─api                   #api请求文件
├─public
|   ├─favicon.ico          #ico图标
|   └index.html            #index.html
```



### Learn More

