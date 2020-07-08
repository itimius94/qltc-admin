import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import HomePage from './pages/HomePage'
import Categories from './pages/Categories'
import Report from './pages/Report'

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.FADE
}

function App() {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <Router>
        <div id="wrapper">
          <ul className="navbar-nav bg-gradient-success sidebar sidebar-dark accordion">
            <a
              className="sidebar-brand d-flex align-items-center justify-content-center"
              href="index.html"
            >
              <div className="sidebar-brand-icon rotate-n-15">
                <i className="fa fa-money" aria-hidden="true"/>
              </div>
              <div className="sidebar-brand-text mx-3">
                Money.<sub>Me</sub>
              </div>
            </a>

            <hr className="sidebar-divider my-0" />
            <li className="nav-item">
              <NavLink to="/" exact activeClassName="active" className="nav-link">
                <i className="fa fa-tachometer" aria-hidden="true" />
                <span>Trang chủ</span>
              </NavLink>
            </li>

            <hr className="sidebar-divider" />
            <li className="nav-item">
              <NavLink to="/categories" activeClassName="active" className="nav-link">
                <i className="fa fa-folder-o" aria-hidden="true" />
                <span>Quản lý danh mục</span>
              </NavLink>
            </li>

            <hr className="sidebar-divider" />
            <li className="nav-item">
              <NavLink to="/report" activeClassName="active" className="nav-link">
                <i className="fa fa-bar-chart" aria-hidden="true" />
                <span>Báo cáo</span>
              </NavLink>
            </li>
          </ul>

          <div id="content-wrapper" className="d-flex flex-column">
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/categories">
                <Categories />
              </Route>
              <Route path="/report">
                <Report />
              </Route>
            </Switch>

            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; Your Website 2020</span>
                </div>
              </div>
            </footer>
          </div>
        </div>

        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>
      </Router>
    </AlertProvider>
  );
}

export default App;
