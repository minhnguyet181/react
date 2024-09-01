import { Link } from "react-router-dom/cjs/react-router-dom.min";

export const adminMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'

            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'

            },
            {
                name: 'menu.admin.manage-expert', link: '/system/manage-expert'

            },
            {
                name: 'menu.admin.manage-admin', link: '/system/user-admin'

            },

        ]
    },
    {
        name: 'menu.admin.agency',
        menus: [
            {
                name: 'menu.admin.manage-agency', link: '/system/manage-agency'

            },
        ]
    },
    {
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'

            },
        ]
    },
    {
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'

            },
        ]
    },
];