import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import AllBlogs from '../../components/Shop/AllBlogs'

const ShopAllOrders = () => {
  return (
        <div>
            <DashboardHeader />
            <div className="flex justify-between w-full">
                <div className="w-[80px] 800px:w-[330px]">
                  <DashboardSideBar active={7} />
                </div>
                <div className="w-full justify-center flex">
                   <AllBlogs />
                </div>
              </div>
        </div>
  )
}

export default ShopAllOrders