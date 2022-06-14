const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

async function main () {
    const ipfsOptions = { 
      repo: './ipfs',
      relay: { enabled: true, hop: { enabled: true, active: true } },
      EXPERIMENTAL: { pubsub: true },
      config: {
        Addresses: {
          Announce: []
        }
      }
    }
    const ipfs = await IPFS.create(ipfsOptions)
    const peerInfo = await ipfs.id()
    const orbitdb = await OrbitDB.createInstance(ipfs)
    const db = await orbitdb.keyvalue('/orbitdb/zdpuB1DR6SNetuV8sDcCeLYNHBhmXveZYgiMgjG2KHccg3Jxg/first-database')
    console.log(db.address.toString())
    db.events.on('replicated', () => {
      console.log(db.all)
    });
    await ipfs.swarm.connect('/ip4/45.76.179.234/tcp/4002/p2p/12D3KooWN55kbab2wpwRZXjpYZXojvEKsgBStLNXr7oZTd8t5u7R')
    // setInterval(async () => {
    //   console.log('==========')
    //   console.log((await ipfs.swarm.peers()).length)
    // }, 1000)
    // console.log(await ipfs.bootstrap.list())
    // console.log(await ipfs.swarm.peers())
    // console.log(await ipfs.bootstrap.list())
    // console.log(peerInfo)
    // console.log(await ipfs.config.getAll())
    // setInterval(async () => {
    //     console.log('==========')
    //     console.log((await ipfs.swarm.peers()).length)
    // }, 3000)
    setInterval(async () => {
      await ipfs.pubsub.publish('12D3KooWN55kbab2wpwRZXjpYZXojvEKsgBStLNXr7oZTd8t5u7R', "test")
    }, 1000)
  }
main()
