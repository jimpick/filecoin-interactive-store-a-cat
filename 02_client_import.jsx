import React from 'react'
import { useHistory } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const LazyAnimation = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-100px 0px'
  })

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  )
}

export default function ClientImport () {
  const history = useHistory()

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <div style={{fontSize: '200%'}}>
        Let's store a cat picture on the Filecoin network!
      </div>
      <div className="spaced">⌄</div>
      <div className="spaced">⌄</div>
      <div className="spaced">⌄</div>
      <div>(scroll down)</div>
      <div className="spaced">⌄</div>
      <div className="spaced">⌄</div>
      <div className="spaced">⌄</div>
      <div style={{ fontSize: '700%' }}>
        <LazyAnimation>
          <span aria-label='Wave'>👋</span>
        </LazyAnimation>
        <LazyAnimation>
          <span aria-label='Wave'>👋</span>
        </LazyAnimation>
        <LazyAnimation>
          <span aria-label='Wave'>👋</span>
        </LazyAnimation>
        <LazyAnimation>
          <span aria-label='Wave'>👋</span>
        </LazyAnimation>
        <LazyAnimation>
          <span aria-label='Wave'>👋</span>
        </LazyAnimation>
      </div>

      <button
        style={{ marginTop: '1rem', fontSize: '300%' }}
        onClick={() => {
          console.log('Click!')
          history.push('/client-import')
        }}
      >
        About
      </button>
    </div>
  )
}
