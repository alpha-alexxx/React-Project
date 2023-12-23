import { Link, NavLink, Outlet, RouterProvider, ScrollRestoration, useNavigation } from "react-router-dom";
import router from "../router";
const routes = [
  { navTitle: 'Posts', path: '/' },
  { navTitle: 'Users', path: '/users' },
  { navTitle: 'Todos', path: '/todos' }
];
function App() {
  const { state } = useNavigation()
  const isLoading = state === 'loading'

  const getNavLinkClass = ({ isActive, isPending, isTransitioning }) => {
    return [
      isPending ? 'pending' : '',
      isActive ? 'active' : '',
      isTransitioning ? 'transitioning' : ''
    ].join(' ').trim();
  };
  return (
    <>
      <nav className="top-nav">
        <div className="nav-text-large">My App</div>
        <ul className="nav-list">
          {routes.map((route) => (
            <li key={route.navTitle}>
              <NavLink
                to={route.path}
                exact={route.exact}
                className={getNavLinkClass}
              >
                {route.navTitle}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <ScrollRestoration />
      {isLoading && <div className="loading-spinner" />}
      <div className={`container ${isLoading ? 'loading' : ''}`}>
        <Outlet />
      </div>
    </>
  );
}

export default App;
