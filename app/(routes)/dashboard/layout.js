import React from 'react'
import SideBar from './_components/SideBar'

export default function DashboardLayout({children}) {
  return (
    <div className='flex'>
        {/* sidebar */}
        <div>
            <SideBar />
        </div>
        {/* content */}
        <div>
            {children}
        </div>

    </div>
  )
}

