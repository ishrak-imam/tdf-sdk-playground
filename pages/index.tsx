import {useEffect, useState} from 'react'
import styles from '../styles/Home.module.css'
import { JsonViewer } from '@textea/json-viewer'
import { Loading } from '@nextui-org/react';

import {create} from '@tdf-labs/the-data-faucet-sdk'

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
        dataFaucet.query.chain.litmus.balance({address: 'jcMqptBxZFuXpVKLmxH8wArWGxhVUo29cXNr2MmrDPTdVWfvL'}),
        dataFaucet.query.chain.litentry.balance({address: '47BHMeKG1Q36gU6WP9ZGiqFhEPF5BhfyTVn9NSaemMd9e9uP'}),
        dataFaucet.query.chain.ethereum.erc20TokenBalance({
          address: '0x4cfbf1cc25344ee50516cc9d2fadfe363d47e26e',
          contract: '0xdAC17F958D2ee523a2206206994597C13D831ec7'
        }),
        dataFaucet.query.chain.bsc.bep20TokenBalance({
          address: '0xe1e450dc0149699b0ec7b394c655866ce632a7e2',
          contract: '0xB76da28fCCf7FeD45482954df796988E53B6169f'
        })
      )

      setData({litmusBalance, litentryBalance, erc20TokenBalance, bep20TokenBalance});
    }

    queryData().catch((error) => {console.log('Query error :::: ', error)})
  }, [])

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {Boolean(data) ? <JsonViewer rootName='data' enableClipboard={false} value={data}/> : <Loading />}
      </main>
    </div>
  )
}
