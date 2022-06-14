const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

async function main () {
    const ipfsOptions = { 
      repo: './ipfs',
      relay: { enabled: true, hop: { enabled: true, active: true } },
      EXPERIMENTAL: { pubsub: true },
      config: {
        Addresses: {
          Announce: ['/ip4/45.76.179.234/tcp/4002']
        },
        Bootstrap: ['/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ'],
        Discovery: {
          MDNS: {
              Enabled: true,
              Interval: 0
          },
          webRTCStar: {
              Enabled: false
          }
        }
      }
    }
    const ipfs = await IPFS.create(ipfsOptions)
    const peerInfo = await ipfs.id()
    const orbitdb = await OrbitDB.createInstance(ipfs)
    const db = await orbitdb.keyvalue('first-database')
    console.log(db.address.toString())
    await db.put('name', 'hello', { pin: true })
    // console.log(await ipfs.bootstrap.list())
    // console.log(await ipfs.swarm.peers())
    await ipfs.pubsub.subscribe(peerInfo.id, () => { console.log("receive message");})
    console.log(await ipfs.config.getAll())
    console.log(db.all)
    // ipfs.libp2p.connectionManager.on('peer:connect', (ipfsPeer) => {
    //   const ipfsId = ipfsPeer.remotePeer.toB58String()
    //   if (ipfsId == '12D3KooWN55kbab2wpwRZXjpYZXojvEKsgBStLNXr7oZTd8t5u7R') {
    //     console.log('done')
    //   }
    //   setTimeout(async () => {
    //     await ipfs.pubsub.publish(ipfsId, "test")
    //   }, 2000);
    // })
    // await ipfs.pubsub.publish('12D3KooWNDoch6DgnwECK7GNovjUa574hwFEb5fM7morTf6HpMzX', "test")
    // console.log("ok")
    // await ipfs.swarm.connect('/ip4/45.76.179.234/tcp/4002/p2p/12D3KooWN55kbab2wpwRZXjpYZXojvEKsgBStLNXr7oZTd8t5u7R')
  }
main()
