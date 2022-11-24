import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { JsonViewer } from '@textea/json-viewer'
import { Loading } from '@nextui-org/react';

import { create } from '@tdf-labs/the-data-faucet-sdk'

const dataFaucet = create({
  url: 'https://graph.tdf-labs.io/latest/graphql',
  apiKey: 'eb4f0883-c0fc-4d05-b417-3740cf69c8af'
})

export default function Home() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    async function queryData() {
      setData(null);

      const [litmusBalance, litentryBalance, erc20TokenBalance, bep20TokenBalance] = await dataFaucet.utils.compose(
        dataFaucet.query.chain.litmus.balance({ address: 'jcMqptBxZFuXpVKLmxH8wArWGxhVUo29cXNr2MmrDPTdVWfvL' }),
        dataFaucet.query.chain.litentry.balance({ address: '47BHMeKG1Q36gU6WP9ZGiqFhEPF5BhfyTVn9NSaemMd9e9uP' }),
        dataFaucet.query.chain.ethereum.erc20TokenBalance({
          address: '0x81d6823a1d6243bc607f390625ae3970ae86af90',
          contract: '0xb59490aB09A0f526Cc7305822aC65f2Ab12f9723'
        }),
        dataFaucet.query.chain.bsc.bep20TokenBalance({
          address: '0xd03ccfe61e66112472541888485ae67425973b01',
          contract: '0xb59490ab09a0f526cc7305822ac65f2ab12f9723'
        })
      )

      console.log(JSON.stringify({ litmusBalance, litentryBalance, erc20TokenBalance, bep20TokenBalance }))
      setData({ litmusBalance, litentryBalance, erc20TokenBalance, bep20TokenBalance });
    }

    queryData().catch((error) => { console.log('Query error :::: ', error) })
  }, [])

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {Boolean(data) ? <JsonViewer rootName='data' enableClipboard={false} value={data} /> : <Loading />}
      </main>
    </div>
  )
}
