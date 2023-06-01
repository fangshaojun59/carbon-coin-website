# REACT DOME V2 配置文档



## 1.Connectors配置

* 目前配置如：`metaMask` `walletConnect` `network`

* 作用于初始化不同的链接器的变量以及对应的hooks方法

## 2.Contract配置

### (1)环境变量(prd、uat、dev)

* 目录：`src\contracts\constant.ts`

```tsx
/** 配置不同环境下的默认链接chainId */
export const DEFAULT_CHAINID_ENV: { [env: string]: number } = {
  dev: 97,
  uat: 97,
  prd: 56,
}
/** 
*  配置不同环境下的合约参数以及支持的chainId
*  参数如下：
*  ..._ADDRESS: ... 合约地址
*  apiUrl： 只是针对类似于bnb
*  apiKey： 只是针对类似于bnb
*  ...
*/
export const useConstant: { [env: string]: UseConstantType } = {
  dev: {
    42: {
      Swap_ADDRESS: '0x80e6DBd53Fc53fE22Eb30Ef864f1071fC6BDe9c1',
      apiKey: '',
      apiUrl: '',
    },
    97: {
      Swap_ADDRESS: '0xBf9b757FA138A17DcD2789C9b2fe32B77115A521',
      apiKey: 'https://api-testnet.bscscan.com/api',
      apiUrl: '366TDMB1M11NCFABM78212QFUM81INYK1C',
    },
  },
  uat: {
    ...
  },
  prd: {
    ...
  },
}
/** 合约abi文件 */
export const Market_ABI: any = Market
/** 对应环境下的默认chainid */
export const DEFAULT_CHAINID: number = DEFAULT_CHAINID_ENV[REACT_APP_ENV]
/** 对应环境下的合约数据 */
export const USECONSTANT: UseConstantType = useConstant[REACT_APP_ENV]
/** 判断chainId是否存在对应环境下的chainIds数组 */
export const getActiveChainId = (arr: string[], network: number) => {
  if (network === null) return false
  return arr.some((item) => Number(item) === Number(network))
}
```

### (2)入口文件DATA INIT

* 目录：`src\contracts\constant.init.ts`

  ```tsx
  web3: 更具不同模式下对web3进行初始化，可用它作用于对合约的初始化、以及pages页面的使用
  ContractAuction: 不同合约的初始化
  ...
  toWeiFromWei: 将得到的参数去掉18个0,并保留6位小数返回
  ```
###  (3)ChainId配置

* 目录：`src\contracts\chains.ts`

  ```tsx
  getAddChainParameters: 作用于Metamask链接器需要的参数变量，`若插件存在则连接并切换；若不存在连接并添加`需要的参数
  REACT_APP_ENV: 全局的环境变量获取，默认`uat`
  CHAINS_ENV: 配置多环境下的需求的chainId
  /** 获取不同环境下的chainId数组列表 */
  export const CHAINS: any = CHAINS_ENV[REACT_APP_ENV]
  /** 获取CHAINS数组中的urls */
  export const URLS: { [chainId: number]: string[] } = Object.keys(CHAINS).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
    const validURLs: string[] = CHAINS[Number(chainId)].urls
  
    if (validURLs.length) accumulator[Number(chainId)] = validURLs
  
    return accumulator
  }, {})
  ```

###  (4)NetWork配置

* 目录：`src\contracts\networks.ts`

  ```tsx
  NTTWORK_ENV：配置多环境下的ChainId的图标、图片、名称、全称、chainId、背景色
  /** 获取对应环境下的network列表 */
  export const NTTWORKS: listTypes[] = NTTWORK_ENV[REACT_APP_ENV]
  ```

###  (5)钱包链接器配置

* 目录：`src\contracts\wallets.ts`

  ```tsx
  /** 连接钱包的链接器选择数组 */
  export const WALLETS: Type[] = [
    {
      name: 'Metamask',
      link: 'Injected',
      icon: METAMASK_ICON,
    },
    {
      name: 'WalletConnect',
      link: 'WalletConnect',
      icon: WALLET_CONNECT_ICON,
    },
  ]
  ```
## 3.Common配置

### (1)Antd自定义配置

* 目录：`src\common\antd.cus.tsx`
* 作用于不同的UI组件的通用变量的配置

### (2)变量申明

* 目录：`src\common\data.d.ts`
* 作用于全局通用多用的变量申明

### (3)通用配置

* 目录：`src\common\index.ts`

  ```tsx
  fallbackImage: 图片错误默认样式
  MenuListInit: 菜单数组
  /** 路由选中时的作用，防止类似于/home和/home#about同时选中 */
  export const oddEvent = (isActive: boolean, location: any, item: MenuListType) => {
    if (item.url === '' || !isActive) return false
    const url = !location.hash ? location.pathname : `${location.pathname}${location.hash}`
    return url === item.url
  }
  ```

### (4)批量请求配置

* 目录：`src\common\limitPromise.ts`

* 作用于合约api请求事件中每秒多次请求被限制问题，主要针对于`BSC`

  ```tsx
  /** 变量说明 */
  this._max = max || 6 #默认6次
  this._count = 0      
  this._taskQueue = [] #等待数组
  this._waitingTime = waitingTime || 5000  #每次批量等待5s时间后进行下一批次请求`包含五次请求完成的时间以及剩余后的时间`
  ```

### (5)styled通用css配置

* 目录：`src\common\styled.ts`

  ```tsx
  ModalContentRow：作用于ConnectWallet组件中使用
  /** 
  * 不懂尺寸下页面显示内容部分宽度
  * webLayoutAdaptationMax: width>=1920
  * webLayoutAdaptation: width>1334 && width<1920
  * flatLayoutAdaptation: width>750 && width<=1334
  * h5LayoutAdaptation: width<=750
  */
  export const webLayoutAdaptationMax = css`
    max-width: min(75rem, 120rem - 45rem);
    margin: 0 auto;
  `
  export const webLayoutAdaptation = css`
    max-width: min(62.5%, 100% - 37.5%);
    margin: 0 auto;
  `
  export const flatLayoutAdaptation = css`
    max-width: min(82.01%, 100% - 17.99%);
    margin: 0 auto;
  `
  export const h5LayoutAdaptation = css`
    max-width: min(96.3%, 100% - 6.4%);
    margin: 0 auto;
  `
  ```


## 4.Store配置

目录：`src\store`

* theme
  目录：`src\store\theme.ts`
  作用于css样式、主题颜色等信息

* user

  目录：`src\store\user.ts`

  用于存储 账号地址

* wallt

  目录：`src\store\wallet.ts`

  用于存储 链接 钱包 的 状态、网络id、是否链接

## 5.router配置

* 目录：`src\router\index.tsx`

* 默认访问页面自动陪重定向到/home

## 6.其他配置

### (1)语言配置入口

* 目录：`src\utils\i18n.tsx`

```tsx
localStorage.getItem('i18nextLng') || (navigator.language === 'zh-CN' ? 'zh' : navigator.language === 'zh' ? 'zh' : 'en')
默认获取缓存是否存在的数据否者获取当前浏览器默认语言
```

### (2)其他配置

* 目录：`src\utils\index.ts`

```tsx
Adapth5：区分web端还是手机端,默认值是768px。 >768px 表示web端 <=768px 表示H5端
formatStrAddress: 用户地址的截取
```

### (3)主题配置

* 目录：`src\theme`

* 配置系统的主题颜色，现在配置的是`themeColor`为主题颜色：`#96A48D`

  ```tsx
  /** 配置不同尺寸下的显示样式，主要结合ant的Row、Col布局方式 */
  const MEDIA_WIDTHS: MediaWidthTypes = {
    xs: 576,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    mxl: 1334,
    xxl: 1600,
    maxl: 1920,
  }
  /** xs尺寸才用最大宽度、取余尺寸才用最小宽度：这种方式采用与antd Grid栅格 */
  const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
    size === 'xs'
      ? ((accumulator as any)[size] = (a: any, b: any, c: any) => css`
          @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
            ${css(a, b, c)}
          }
        `)
      : ((accumulator as any)[size] = (a: any, b: any, c: any) => css`
          @media (min-width: ${(MEDIA_WIDTHS as any)[size]}px) {
            ${css(a, b, c)}
          }
        `)
    return accumulator
  }, {}) as any
  ```






### Learn More

