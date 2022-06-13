const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

async function main () {
    const ipfsOptions = { 
      repo: './ipfs',
      // relay: { enabled: true, hop: { enabled: true, active: true } },
      config: {
        Addresses: {
          Announce: ['/ip4/65.20.67.87/tcp/4002']
        }
      }
    }
    const ipfs = await IPFS.create(ipfsOptions)
    const peerInfo = await ipfs.id()
    // const orbitdb = await OrbitDB.createInstance(ipfs)
    // const db = await orbitdb.keyvalue('first-database')
    // console.log(db.address.toString())
    // await db.put('name', 'hello', { pin: true })
    // console.log(await ipfs.bootstrap.list())
    // console.log(await ipfs.swarm.peers())
    // setInterval(async () => {
    //   await ipfs.pubsub.publish('12D3KooWN55kbab2wpwRZXjpYZXojvEKsgBStLNXr7oZTd8t5u7R', "test")
    //   const topics = await ipfs.pubsub.ls()
    //   console.log(topics)
    // }, 1000)
    // console.log(await ipfs.config.getAll())
    ipfs.libp2p.connectionManager.on('peer:connect', (ipfsPeer) => {
      const ipfsId = ipfsPeer.remotePeer.toB58String()
      if (ipfsId == '12D3KooWN55kbab2wpwRZXjpYZXojvEKsgBStLNXr7oZTd8t5u7R') {
        console.log('done')
      }
      setTimeout(async () => {
        await ipfs.pubsub.publish(ipfsId, "test")
      }, 2000);
    })
    // await ipfs.pubsub.publish('12D3KooWNDoch6DgnwECK7GNovjUa574hwFEb5fM7morTf6HpMzX', "test")
    // console.log("ok")
  }
main()
