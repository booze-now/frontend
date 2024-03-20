/**
 * path:
 * / jellel kezdődik
 * component:
 * a components mappában megtalálható komponens (kis/nagybetű érzékeny a neve!)
 * saját komponens lehet, ilyenkor az alkönyvtárat is bele lehet írni
 * pl: public/pages/Drinks
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
        "roles": []
    },
    {
        "path": "/logout",
        "component": "Logout",
        "roles": ["auth"]
    },
    {
        "path": "/drinks",
        "component": "public/pages/Drinks",
        "roles": ["auth"]
    },
    {
        "path": "/drink/:id",
        "component": "public/pages/Drink",
        "roles": ["auth"]
    },
    {
        "path": "/profile",
        "component": "Profile",
        "roles": ["auth"],
    },
    {
        "path": "/register",
        "component": "public/pages/Register",
        "roles": ["noauth"]
    },
]



export default publicRoutes