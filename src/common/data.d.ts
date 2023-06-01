export interface MenuListType {
  name: string
  enName: string
  url: string
  key: string
  index: number
  childList?: {
    name: string
    enName: string
    url: string
    title: string
    enTitle: string
    childList?: {
      name: string
      enName: string
      url: string
      title?: string
      enTitle?: string
    }[]
  }[]
}
