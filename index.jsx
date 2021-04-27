import React from 'react'
import ReactDOM from 'react-dom'
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from 'react-router-dom'

import Welcome from './01_welcome.jsx'
import ClientImport from './02_client_import.jsx'

function Nav () {
  const location = useLocation()
  if (location.pathname === '/') {
    return null
  }
  return (
    <nav style={{ marginTop: '0.5rem' }}>
      <Link
        to='/'
        alt='Back to start'
        style={{
          textDecoration: 'none',
          marginLeft: '-1.5rem',
          fontSize: '200%'
        }}
      >
        ◁
      </Link>
      {false && <pre>{JSON.stringify(location)}</pre>}
    </nav>
  )
}

export default function App () {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path='/client-import'>
          <ClientImport />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <Welcome />
        </Route>
      </Switch>
    </Router>
  )
}

function About () {
  return <h2>About</h2>
}

function Users () {
  return <h2>Users</h2>
}

ReactDOM.render(<App />, document.getElementById('root'))
