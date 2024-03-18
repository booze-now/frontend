/**
 * path:
 * / jellel kezdődik
 * component:
 * a components mappában megtalálható komponens (kis/nagybetű érzékeny a neve!)
 * saját komponens lehet, ilyenkor az alkönyvtárat is bele lehet írni
 * pl: public/Drinks
 * roles:
 * "waiter"
 * "bartender"
 * "backoffice"
 * "unauth" (nem belépett felhasználóknak)
 * "all" (alapértelmezett, nincs jogosultság ellenőrzés, ugyanaz, mint a [])
 */
const publicRoutes = [
    {
        "path": "/",
        "component": "Dashboard",
        "roles": ["unauth"]
    },
    {
        "path": "/logout",
        "component": "Logout",
        "roles": ["unauth"]
    },
    {
        "path": "/drinks",
        "component": "public/Drinks",
        "roles": ["unauth"]
    },
    {
        "path": "/drink/:id",
        "component": "public/Drink",
        "roles": ["unauth"]
    },
    {
        "path": "/profile",
        "component": "Profile",
        "roles": ["admin"]
    },
    {
        "path": "/register",
        "component": "public/Register",
        "roles": ["admin"]
    },
]



export default publicRoutes