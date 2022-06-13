const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

async function main () {
    const ipfsOptions = { 
      repo: './ipfs',
      // relay: { enabled: true, hop: { enabled: true, active: true } },
      // config: {
      //   "Bootstrap": ["/dns4/node3.preload.ipfs.io/tcp/443/wss/p2p/QmY7JB6MQXhxHvq7dBDh4HpbH29v4yE9JRadAVpndvzySN"]
      // }
    }
    const ipfs = await IPFS.create(ipfsOptions)
    const peerInfo = await ipfs.id()
    // const orbitdb = await OrbitDB.createInstance(ipfs)
    // const db = await orbitdb.keyvalue('first-database')
    // console.log(db.address.toString())
    // await db.put('name', 'hello', { pin: true })
    // console.log(await ipfs.bootstrap.list())
    // console.log(await ipfs.swarm.peers())
    setInterval(async () => {
      await ipfs.pubsub.publish('12D3KooWMdJdH2qrjaK5dLARsf13qMZxafdfmWDtD8SGTJZXdYGa', "test")
    }, 1000)
    console.log(await ipfs.config.getAll())
    // ipfs.libp2p.connectionManager.on('peer:connect', (ipfsPeer) => {
    //   console.log(peerInfo.id == ipfsPeer.localPeer.toB58String())
    //   const ipfsId = ipfsPeer.remotePeer.toB58String()
    //   console.log(ipfsId)
    //   setTimeout(async () => {
    //     await ipfs.pubsub.publish(ipfsId, "test")
    //   }, 2000);
    // })
    // await ipfs.pubsub.publish('12D3KooWNDoch6DgnwECK7GNovjUa574hwFEb5fM7morTf6HpMzX', "test")
    // console.log("ok")
  }
main()
