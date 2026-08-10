import {
    LayoutDashboard,
    Users,
    Shield,
    MapPinned,
    Trophy,
    UserRoundSearch
} from "lucide-react"

import { Link, useLocation } from "react-router-dom"

const menus = [

    {
    name:"Overview",

    icon:<LayoutDashboard size={18}/>,

    path:"/overview"

    },

    {

        name:"Team",

        icon:<Users size={18}/>,

        path:"/team"

    },

    {
        name: "Player Analysis",
        icon: <UserRoundSearch size={18}/>,
        path: "/players"
    },


    {

        name:"Batting",

        icon:<Trophy size={18}/>,

        path:"/batting"

    },

    {

        name:"Bowling",

        icon:<Shield size={18}/>,

        path:"/bowling"

    },

    {

        name:"Venue",

        icon:<MapPinned size={18}/>,

        path:"/venue"

    }

]

function Sidebar(){


    const location = useLocation()

    return(

        <div className="sidebar">

            <div className="logo">

                <div className="logo-circle">

                        RV

                </div>

            <div>

                 <h2>Royal Vision</h2>

                 <p>IPL Analytics Platform</p>

            </div>

            </div>

            {

                menus.map(menu=>(

                    <Link

                        key={menu.name}

                        to={menu.path}

                        className={
                            location.pathname === menu.path
                               ? "menu-item active-menu"
                               : "menu-item"
                        }

                    >

                        {menu.icon}

                        <span>{menu.name}</span>

                    </Link>

                ))

            }

        </div>

    )

}

export default Sidebar