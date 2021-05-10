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
          {false && (
            <span>
              Placeholder {height} {threshold} {JSON.stringify(inView)}
            </span>
          )}
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
  const [catNumber, setCatNumber] = useState()

  function getRandomCat (evt) {
    setCatNumber(randCat())
    evt.preventDefault()
  }

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
          First we'll need a cat picture to upload.
          <br />
          <br />
          {catNumber ? (
            <div>
              <div>
                We've got a random cat for you here: <br />
                <br />
                <img
                  style={{
                    width: '70%',
                    maxHeight: '50vh',
                    objectFit: 'contain'
                  }}
                  src={'cats/cat.' + catNumber + '.jpg'}
                  onClick={getRandomCat}
                ></img>
                <br />
                Cat #{catNumber} [
                <a
                  href='https://www.kaggle.com/tongpython/cat-and-dog'
                  target='_blank'
                >
                  Source
                </a>
                ]
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                <a href='#' onClick={getRandomCat}>
                  Don't like your cat? Pick a different cat.
                </a>
              </div>
            </div>
          ) : (
            <div>
              <button
                style={{ marginTop: '1.5rem', fontSize: '200%' }}
                onClick={getRandomCat}
              >
                Pick a random cat
              </button>
            </div>
          )}
        </div>
      </LazyAnimation>
      {catNumber && (
        <>
          <LazyAnimation threshold={0}>
            <HandsDown num={1} />
          </LazyAnimation>
          <LazyAnimation threshold={0}>
            ... now, let's get that picture onto Filecoin!
          </LazyAnimation>
          <LazyAnimation threshold={0.3} height={'50vh'}>
            <HandsDown num={3} />
          </LazyAnimation>
          <LazyAnimation threshold={0}>
            For this simple demo, we're not going to store on the "mainnet"
            Filecoin network, as that requires a three things we don't currently
            have...
          </LazyAnimation>
          <LazyAnimation threshold={0.3} height={'10vh'}>
            <div className='spaced' style={{ fontSize: '800%' }}>
              🥇
            </div>
          </LazyAnimation>
          <LazyAnimation>
            <p>
              First, in order to talk to the network from a web page, we need to
              connect to a machine that is participating in the Filecoin
              blockchain.
            </p>
          </LazyAnimation>
          <LazyAnimation>
            <img
              alt='Lotus Logo'
              src='./lotus_logo_h.svg'
              style={{
                background: 'white',
                padding: '1rem',
                width: '50%'
              }}
            ></img>
            <p>
              The best supported and most complete solution is to run your own
              node on the Filecoin network using open source software such as{' '}
              <a
                href='https://github.com/filecoin-project/lotus'
                target='_blank'
              >
                Lotus
              </a>{' '}
              (the reference Filecoin node implementation). Typically you would
              run this on a capable Linux server as it needs a lot of memory and
              disk to continuously sync and validate all of the live blockchain
              transactions that are happening on the Filecoin network. Lotus
              also includes software for a "storage client" to enable you to
              create deals and upload files to the network, and a "retrieval
              client" for getting the files back later.
            </p>
          </LazyAnimation>
          <LazyAnimation>
            <p>
              Most applications would prefer to connect to an API endpoint from
              a hosted service provider. There are options available, but they
              all have limitations:
            </p>
            <p>
              <img
                src='glif.svg'
                width='15%'
                style={{
                  float: 'left',
                  padding: '0.5rem',
                  margin: '0.5rem'
                }}
              ></img>
              There are "public" API endpoints available (eg. "
              <a
                href='https://docs.filecoin.io/build/hosted-lotus/'
                target='_blank'
              >
                Glif Nodes
              </a>
              " that have limited functionality that applications can use
              without authentication. These services are ideal for applications
              that only need to query balances and transfer funds between
              accounts. Typically public API endpoints do not support "storage
              client" and "retrieval client" functions, as Filecoin is commonly
              used to store huge amounts of data, and the bandwidth costs would
              be astronomical for a free service.
            </p>
            <p style={{ clear: 'both' }}>
              <img
                src='infura.svg'
                width='15%'
                style={{
                  background: 'rgb(255,107,74)',
                  float: 'left',
                  padding: '0.5rem',
                  margin: '0.5rem'
                }}
              ></img>
              Private hosted API endpoints are also available from providers
              such as{' '}
              <a
                href='https://blog.infura.io/introducing-infura-support-for-filecoin-developers/'
                target='_blank'
              >
                Infura
              </a>
              . Currently, the{' '}
              <a
                href='https://infura.io/docs/filecoin#tag/Client'
                target='_blank'
              >
                Infura Filecoin API
              </a>{' '}
              does not yet support "storage client" or "retrieval client"
              functionality.
            </p>
            <p style={{ clear: 'both' }}>
              <img
                src='textile.svg'
                width='15%'
                style={{
                  float: 'left',
                  padding: '0.5rem',
                  margin: '0.5rem'
                }}
              ></img>
              Some hosting providers provide non-raw access to the Filecoin
              network via their own value-added APIs which add additional layers
              of software and functionality. A good example of this model would
              be{' '}
              <a
                href='https://docs.filecoin.io/build/hosted-powergate/'
                target='_blank'
              >
                Hosted Powergate
              </a>{' '}
              (from Textile).
            </p>
            <p>
              There is active development to unbundle the "storage client" and
              "retrieval client" code from Lotus so it can be run separately
              attached to a hosted gateway service (aka. "Lotus Lite" mode) or
              be used with other Filecoin node implementations. This work is
              ongoing and you can ask about it in developer channels.
            </p>
          </LazyAnimation>
          <LazyAnimation threshold={0.3} height={'1vh'}>
            ...
          </LazyAnimation>
          <LazyAnimation threshold={0.3} height={'10vh'}>
            <p>
              So, for now, we're going to connect to a "simulated" version of
              the Filecoin network ... more on that later!
            </p>
          </LazyAnimation>
          <LazyAnimation threshold={0.3} height={'50vh'}>
            <HandsDown num={3} />
          </LazyAnimation>
          <LazyAnimation threshold={0.3} height={'10vh'}>
            <div className='spaced' style={{ fontSize: '800%' }}>
              🥈
            </div>
          </LazyAnimation>
          <LazyAnimation>
            <p>
              Second, in order to demonstrate file storage on the live "mainnet"
              Filecoin network, we need funds!
            </p>
          </LazyAnimation>
          <LazyAnimation threshold={0.3} height={'50vh'}>
            <HandsDown num={3} />
          </LazyAnimation>
          <LazyAnimation threshold={0.3} height={'10vh'}>
            <div className='spaced' style={{ fontSize: '800%' }}>
              🥉
            </div>
          </LazyAnimation>
          <LazyAnimation>
            <p>
              Third, in order to demonstrate file storage on the live "mainnet"
              Filecoin network, we need to pick a miner to make a deal with to
              store our cat picture.
            </p>
          </LazyAnimation>
        </>
      )}
      <div style={{ minHeight: '20vh' }}></div>
    </div>
  )
}
