import Home from '@/pages/Home'
import No404 from '@/pages/404'
import Layout from '@/layout'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import Exchange from '@/pages/Exchange'

const Router: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/home" />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/exchange',
        element: <Exchange />,
      },

      {
        path: '/404',
        element: <No404 />,
      },
      {
        path: '*',
        element: <No404 />,
      },
    ],
  },
  {
    path: '/404',
    element: <No404 />,
  },
  {
    path: '*',
    element: <No404 />,
  },
]

export default Router
