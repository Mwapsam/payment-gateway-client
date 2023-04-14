import React from 'react'
import { SideNav, Block }from '../../components'

type Props = {}

const ApiDocs = (props: Props) => {
    const [openNav, setOpenNav] = React.useState(false)
  return (
    <>
        <div className="flex overflow-hidden bg-white pt-8">
            <SideNav openNav={openNav} />
            <div className={openNav ? "bg-gray-900 opacity-50 fixed inset-0 z-10" : "bg-gray-900 opacity-50 hidden fixed inset-0 z-10"} id="sidebarBackdrop" />
                <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
                    <main>
                        <div className="pt-6 pb-32 px-4">
                            <Block />
                        </div>
                    </main>
            </div>
        </div>
    </>
  )
}

export default ApiDocs