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
        "component": "common/Dashboard",
        "roles": []
    },
    {
        "path": "/login",
        "component": "common/Login",
        "roles": ["unauth"]
    },
    {
        "path": "/logout",
        "component": "common/Logout",
        "roles": ["auth"]
    },
    {
        "path": "/drinks",
        "component": "public/Drinks",
        "roles": ["auth","unauth"]
    },
    {
        "path": "/drink/:id",
        "component": "public/Drink",
        "roles": ["auth", "unauth"]
    },
    {
        "path": "/profile",
        "component": "common/Profile",
        "roles": ["auth"],
    },
    {
        "path": "/register",
        "component": "public/Register",
        "roles": ["unauth"]
    },
    {
        "path": "/shopping-cart",
        "component": "public/ShoppingCart",
        "roles": ["auth","unauth"]
    },
    {
        "path": "/orders",
        "component": "public/Orders",
        "roles": ["auth"]
    },
    {
        "path": "/order/:id",
        "component": "public/Order",
        "roles": ["auth"]
    },
    {
        "path": "/about-us",
        "component": "public/AboutUs",
        "roles": ["auth","unauth"]
    },
]



export default publicRoutes