import { memo } from 'react'
import routers from '@/router'
import Web3Provider from '@/components/Web3Provider'
import { useRoutes } from 'react-router-dom'

export default memo(() => <Web3Provider>{useRoutes(routers)}</Web3Provider>)
