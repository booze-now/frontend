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
        "component": "Dashboard",
        "roles": ["unauth"]
    },
    {
        "path": "/admin/register",
        "component": "admin/EmployeeRegister",
        "roles": ["admin",'backoffice']
    },
    {
        "path": "/admin/login",
        "component": "Login",
        "roles": ["unauth"]
    },
    {
        "path": "/admin/logout",
        "component": "Dashboard",
        "roles": ["unauth"]
    },
    {
        "path": "/admin/profile",
        "component": "Profile",
        "roles": ["admin",'backoffice']
    },
    {
        "path": "/admin/table",
        "component": "admin/Table",
        "roles": ["admin",'backoffice']
    },
]

export default adminRoutes
