/* import React from "react"; */
import { NavLink } from "react-router-dom";

import { useTranslation } from "contexts/TranslationContext";
import { useUser } from "contexts/UserContext";
import { useConfig } from "contexts/ConfigContext";

const SideNav = () => {
  const { __ } = useTranslation();
  const { user } = useUser();
  const { getConfig } = useConfig();

 // console.log(user);

  if (getConfig("sidebarOpened", true)) {
    console.log("sidebar opened");
    document.body.classList.remove("sb-sidenav-toggled");
  } else {
    console.log("sidebar closed");
    document.body.classList.add("sb-sidenav-toggled");
  }

  return (
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
          <div className="sb-sidenav-menu-heading">Core</div>
          <NavLink className="nav-link" to="/admin/">
            <div className="sb-nav-link-icon">
              <i className="fas fa-tachometer-alt"></i>
            </div>
            {__("Dashboard")}
          </NavLink>
          <a
            className="nav-link collapsed"
            href="#!"
            data-bs-toggle="collapse"
            data-bs-target="#collapseLayouts"
            aria-expanded="false"
            aria-controls="collapseLayouts"
          >
            <div className="sb-nav-link-icon">
            <i className="fas fa-tachometer-alt"></i>
            </div>
            Base Data
            <div className="sb-sidenav-collapse-arrow">
              <i className="fas fa-angle-down"></i>
            </div>
          </a>
          <div
            className="collapse"
            id="collapseLayouts"
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordion"
          >
            <nav className="sb-sidenav-menu-nested nav">
            {user && (user.role_code === 2 || user.role_code === 3) && (
              <NavLink className="nav-link" to="/admin/register">
                <div className="sb-nav-link-icon">
                <i class="fa-solid fa-user"></i>
                </div>
                Employees
              </NavLink>
            )}
            {user && (user.role_code === 2 || user.role_code === 3) && (
              <NavLink className="nav-link" to="/admin/guests">
                <div className="sb-nav-link-icon">
                <i class="fa-regular fa-user"></i>
                </div>
                Guests
              </NavLink>
            )}
            {user && (user.role_code === 2 || user.role_code === 3) && (
              <NavLink className="nav-link" to="/admin/drinks">
                <div className="sb-nav-link-icon">
                <i class="fa-solid fa-martini-glass-citrus"></i>
                </div>
                Drinks
              </NavLink>
            )}
            {user && (user.role_code === 404 || user.role_code === 404) && (
              <NavLink className="nav-link" to="/admin/receipts">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                Receipts
              </NavLink>
            )}
            {user && (user.role_code === 0 || user.role_code === 1 ) && (
              <NavLink className="nav-link" to="/admin/receipts">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                Orders
              </NavLink>
            )}
            </nav>
          </div>   
          <a
          className="nav-link collapsed"
          href="#!"
          data-bs-toggle="collapse"
          data-bs-target="#collapsPP"
          aria-expanded="false"
          aria-controls="collapsPP"
        >
          <div className="sb-nav-link-icon">
          <i className="fas fa-tachometer-alt"></i>
          </div>
          Prices/Promos
          <div className="sb-sidenav-collapse-arrow">
            <i className="fas fa-angle-down"></i>
          </div>
        </a>
        <div
          className="collapse"
          id="collapsPP"
          aria-labelledby="headingOne"
          data-bs-parent="#sidenavAccordion"
        >
          <nav className="sb-sidenav-menu-nested nav">
          {user && (user.role_code === 2 || user.role_code === 3) && (
            <NavLink className="nav-link" to="/admin/register">
              <div className="sb-nav-link-icon">
              <i class="fa-solid fa-hand-holding-dollar"></i>
              </div>
              Prices
            </NavLink>
          )}
          {user && (user.role_code === 2 || user.role_code === 3) && (
            <NavLink className="nav-link" to="/admin/guests">
              <div className="sb-nav-link-icon">
              <i class="fa-solid fa-percent"></i>
              </div>
              Promotions
            </NavLink>
          )}
          </nav>
        </div>   
          
          <div className="sb-sidenav-menu-heading">Orders</div>

          <NavLink className="nav-link" to="/admin/orders/">
          <div className="sb-nav-link-icon">
            <i className="fas fa-tachometer-alt"></i>
          </div>
          {__("Orders")}
        </NavLink>

          {user && (user.role_code === 3) 
            && (
           <>
            <div className="sb-sidenav-menu-heading">Interface</div>
            <a
              className="nav-link collapsed"
              href="#!"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLayouts"
              aria-expanded="false"
              aria-controls="collapseLayouts"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-columns"></i>
              </div>
              Layouts
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </a>
            <div
              className="collapse"
              id="collapseLayouts"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <NavLink className="nav-link" data-eventkey="layout-static.html">
                  Static Navigation
                </NavLink>
                <NavLink
                  className="nav-link"
                  data-eventkey="layout-sidenav-light.html"
                >
                  Light Sidenav
                </NavLink>
              </nav>
            </div>
            <a
              className="nav-link collapsed"
              href="#!"
              data-bs-toggle="collapse"
              data-bs-target="#collapsePages"
              aria-expanded="false"
              aria-controls="collapsePages"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-book-open"></i>
              </div>
              Pages
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </a>
            <div
              className="collapse"
              id="collapsePages"
              aria-labelledby="headingTwo"
              data-bs-parent="#sidenavAccordion"
            >
              <nav
                className="sb-sidenav-menu-nested nav accordion"
                id="sidenavAccordionPages"
              >
                <a
                  className="nav-link collapsed"
                  href="#!"
                  data-bs-toggle="collapse"
                  data-bs-target="#pagesCollapseAuth"
                  aria-expanded="false"
                  aria-controls="pagesCollapseAuth"
                >
                  Authentication
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                </a>
                <div
                  className="collapse"
                  id="pagesCollapseAuth"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordionPages"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <NavLink className="nav-link" to="/admin/login">
                      {__("Login")}
                    </NavLink>
                    <NavLink className="nav-link" to="/admin/register">
                      {__("Register")}
                    </NavLink>
                    <NavLink className="nav-link" to="/admin/password">
                      {__("Forgot Password")}
                    </NavLink>
                  </nav>
                </div>
                <a
                  className="nav-link collapsed"
                  href="#!"
                  data-bs-toggle="collapse"
                  data-bs-target="#pagesCollapseError"
                  aria-expanded="false"
                  aria-controls="pagesCollapseError"
                >
                  Error
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                </a>
                <div
                  className="collapse"
                  id="pagesCollapseError"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordionPages"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <NavLink className="nav-link" data-eventkey="401.html">
                      401 Page
                    </NavLink>
                    <NavLink className="nav-link" data-eventkey="404.html">
                      404 Page
                    </NavLink>
                    <NavLink className="nav-link" data-eventkey="500.html">
                      500 Page
                    </NavLink>
                  </nav>
                </div>
              </nav>
            </div>
            <div className="sb-sidenav-menu-heading">Addons</div>
            <NavLink className="nav-link" data-eventkey="charts.html">
              <div className="sb-nav-link-icon">
                <i className="fas fa-chart-area"></i>
              </div>
              Charts
            </NavLink>
            <NavLink
              className="nav-link"
              data-eventkey="tables.html"
              to="/admin/table"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-table"></i>
              </div>
              {__("Tables")}
            </NavLink>
            </>
          )  
          }

        </div>
      </div>
      <div className="sb-sidenav-footer">
        {user ? (
          <>
            <div className="small">{__("Logged in as:")}</div>
            {user.name}
          </>
        ) : (
          <div>{__("Not logged in")}</div>
        )}
      </div>
    </nav>
  );
};

export default SideNav;
