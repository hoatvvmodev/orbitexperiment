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
    // const db = await orbitdb.keyvalue('/orbitdb/zdpuApcKQg5PbwAYRh67rH6hekutzWymtQQSE5vnTU7w8ekXY/first-database')
    // console.log(db.address.toString())
    
    // setInterval(async () => {
    //   console.log('==========')
    //   console.log((await ipfs.swarm.peers()).length)
    // }, 1000)
    // console.log(await ipfs.bootstrap.list())
    // console.log(await ipfs.swarm.peers())
    // console.log(await ipfs.bootstrap.list())
    console.log(peerInfo)
    console.log(await ipfs.config.getAll())
    await ipfs.pubsub.subscribe(peerInfo.id, () => { console.log("receive message");})
    // setInterval(async () => {
    //     console.log('==========')
    //     console.log((await ipfs.swarm.peers()).length)
    // }, 3000)
  }
main()
