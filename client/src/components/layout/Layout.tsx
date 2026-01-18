import { Fragment } from 'react';

import MainNavigation from './MainNavigation';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <Fragment>
      <MainNavigation />
      <main><Outlet /></main>
    </Fragment>
  );
};

export default Layout;
