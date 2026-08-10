import Sidebar from "./Sidebar"

import {
    Bell,

    CircleUserRound

} from "lucide-react"

function Layout({ children }) {

    return (

        <div className="app-layout">

            <Sidebar />

            <div className="main-content">

                <header className="topbar">
                    <div>
                        <h1>Royal Vision</h1>
                        <p>IPL Cricket Analytics Platform</p>
                    </div>
                    <div className="top-actions">
                            <Bell size={22} className="top-icon"/>

                    <CircleUserRound
                        size={30}
                        className="top-profile"/>
                        </div>
                </header>


                <main className="page-content">

                    {children}

                </main>

            </div>

        </div>

    )

}

export default Layout