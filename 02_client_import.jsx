import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const LazyAnimation = ({ threshold, height, children }) => {
  const [initialWait, setInitialWait] = useState(true)
  const [triggered, setTriggered] = useState()
  const [ref, inView] = useInView({
    triggerOnce: true,
    // rootMargin: '-100px 0px',
    rootMargin: '0px 0px',
    threshold: threshold === undefined ? 0 : threshold
  })
  useEffect(() => {
    setTimeout(() => setInitialWait(false), 100)
  }, [])
  useEffect(() => {
    if (!initialWait && inView) {
      setTimeout(() => setTriggered(true), 500)
    }
  }, [inView, initialWait])

  return (
    <div style={{ border: '0px solid red', minHeight: height }} ref={ref}>
      {inView && !initialWait ? (
        <motion.div
          animate={{ opacity: triggered ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {children}
        </motion.div>
      ) : (
        <div style={{ minHeight: height }}>
          {false && <span>Placeholder {height} {threshold} {JSON.stringify(inView)}</span>}
        </div>
      )}
    </div>
  )
}

function randCat () {
  return Math.floor(Math.random() * 98) + 4001
}

function HandsDown ({ num }) {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.4
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <motion.ul
      className='container'
      variants={container}
      initial='hidden'
      animate='visible'
      style={{ listStyle: 'none', paddingInlineStart: 0 }}
    >
      {Array.from({ length: num }, (_, index) => (
        <motion.li key={index} className='item' variants={item}>
          <div className='spaced' style={{ fontSize: '400%' }}>
            👇
          </div>
        </motion.li>
      ))}
    </motion.ul>
  )
}

export default function ClientImport () {
  const history = useHistory()
  const [catNumber, setCatNumber] = useState(randCat())

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <div style={{ fontSize: '200%' }}>
        Let's store a cat picture on the Filecoin network!
      </div>
      <LazyAnimation height={'50vh'}>
        <HandsDown num={3} />
      </LazyAnimation>
      <LazyAnimation>
        <div>(scroll down)</div>
      </LazyAnimation>
      <LazyAnimation threshold={0.99} height={'50vh'}>
        <HandsDown num={3} />
      </LazyAnimation>
      <LazyAnimation threshold={0.99} height={'30vh'}>
        <div>
          <div>
            First we'll need a cat picture to upload.
            <br />
            <br />
            We've got a random cat for you here: <br />
            <br />
            <img
              style={{ width: '60%', maxHeight: '50vh' }}
              src={'cats/cat.' + catNumber + '.jpg'}
            ></img>
            <br />
            Cat #{catNumber} [
            <a href='https://www.kaggle.com/tongpython/cat-and-dog'>Source</a>]
          </div>
          <button
            style={{ marginTop: '1.5rem', fontSize: '300%' }}
            onClick={() => setCatNumber(randCat())}
          >
            Pick a different cat
          </button>
        </div>
      </LazyAnimation>
      <LazyAnimation threshold={0.99} height={'50vh'}>
        <HandsDown num={3} />
      </LazyAnimation>
      <div style={{minHeight: '20vh'}}></div>

    </div>
  )
}
