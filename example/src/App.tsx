import * as React from 'react';
import { Home } from './Home';

function App(props: any) {
  return <Home {...props} />;
}

export default React.memo(App);
