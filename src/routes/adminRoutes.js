/**
 * path:
 * /admin/-nal kezdődik
 * component:
 * a components mappában megtalálható komponens (kis/nagybetű érzékeny a neve!)
 * saját komponens lehet, ilyenkor az alkönyvtárat is / jellel bele lehet írni
 * roles:
 * "auth" (belépett felhasználó)
 * "unauth" (nem belépett felhasználóknak)
 * "all" (alapértelmezett, nincs jogosultság ellenőrzés, ugyanaz, mint a [])
 */
const adminRoutes = [
    {
        "path": "/admin/",
        "component": "common/Dashboard",
        "roles": ["unauth"]
    },
    {
        "path": "/admin/orders/",
        "component": "admin/Orders",
        "roles": ["admin", 'backoffice']
    },
    {
        "path": "/admin/register",
        "component": "admin/EmployeeRegister",
        "roles": ["admin", 'backoffice']
    },
    {
        "path": "/admin/charts",
        "component": "admin/layout/Chart",
        "roles": ["admin", 'backoffice']
    },
    {
        "path": "/admin/drinks",
        "component": "admin/Drinks",
        "roles": ["admin", 'backoffice']
    },
    {
        "path": "/admin/guests",
        "component": "admin/Guests",
        "roles": ["admin", 'backoffice']
    },
    {
        "path": "/admin/login",
        "component": "common/Login",
        "roles": ["unauth"]
    },
    {
        "path": "/admin/logout",
        "component": "common/Dashboard",
        "roles": ["unauth"]
    },
    { // elfelejtett jelszó form
        "path": "/admin/password",
        "component": "public/Password",
        "roles": ["unauth"]
    },
    { // elfelejtett jelszó megváltoztatása
        "path": "/admin/reset-password/:id/:token",
        "component": "public/ResetPassword",
        "roles": ["unauth"]
    },
    {
        "path": "/admin/profile",
        "component": "common/Profile",
        "roles": ["admin", 'backoffice']
    },
    // {
    //     "path": "/admin/table",
    //     "component": "admin/Table",
    //     "roles": ["admin", 'backoffice']
    // },
]

export default adminRoutes
