import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import { MdCategory } from 'react-icons/md'
import { AiFillPieChart } from 'react-icons/ai'
import {GiConverseShoe} from 'react-icons/gi'
import { BsFillGridFill } from 'react-icons/bs'
import { ImUser } from 'react-icons/im'
import { useQuery } from '../../lib/graphql'
import { useRouter } from 'next/router'
import Header from '../Header'
const GET_ME = `
  query{
  panelGetMe{
    id
    name
    email
    role
  }
}`
const Layout = ({ children }) => {
  const { data, error, mutate } = useQuery(GET_ME)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const currentPage = router.pathname.split('/')[1]
  return (
    <div>
      <div className={`flex h-screen bg-secondary `}>
        <div className='flex-1 flex flex-col overflow-hidden'>
          <Header
            openMenu={() => setSidebarOpen(true)}
            user={data && data.panelGetMe && data.panelGetMe.name}
          />
          <div className='flex h-full relative'>
            <Sidebar sidebarOpen={ sidebarOpen} setSidebarOpen = {setSidebarOpen}>
              <Sidebar.Nav>
                <Sidebar.NavItem
                  href='/dashboard'
                  Icon={AiFillPieChart}
                  isSelected={currentPage === 'dashboard'}
                >
                  Data
                </Sidebar.NavItem>
                <Sidebar.NavItem
                  href='/products'
                  Icon={GiConverseShoe}
                  isSelected={currentPage === 'products'}
                >
                  Shoes
                </Sidebar.NavItem>
                <Sidebar.NavItem
                  href='/categories'
                  Icon={MdCategory}
                  isSelected={currentPage === 'categories'}
                >
                  Categories
                </Sidebar.NavItem>  
                <Sidebar.NavItem
                  href='/brands'
                  Icon={BsFillGridFill}
                  isSelected={currentPage === 'brands'}
                >
                  Brands
                </Sidebar.NavItem>
                {data && data.panelGetMe && data.panelGetMe.role === 'admin' && (
                  <Sidebar.NavItem
                    href='/users'
                    Icon={ImUser}
                    isSelected={currentPage === 'users'}
                  >
                    Users
                  </Sidebar.NavItem>
                )}
              </Sidebar.Nav>
            </Sidebar>
            <main className='flex-1 overflow-x-hidden  bg-zinc-900'>
              <div className='container mx-auto md:px-6 py-5  h-full'>
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
