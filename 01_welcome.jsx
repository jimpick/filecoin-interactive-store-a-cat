import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Welcome () {
  const history = useHistory()

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h3>Filecoin Interactive Tutorial</h3>

      <h1 style={{ fontSize: '300%' }}>Store a cat</h1>

      <div style={{ fontSize: '500%' }}>
        <span style={{ verticalAlign: 'top' }}>🐈 ⇨</span>{' '}
        <img src='filecoin-logo.svg' style={{ height: '1.3em' }} />
      </div>

      <button style={{ marginTop: '1rem', fontSize: '300%' }} onClick={() => {
        console.log('Click!')
        history.push('/client-import')
      }}>Let's go!</button>
    </div>
  )
}

