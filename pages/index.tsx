import {useEffect, useState} from 'react'
import styles from '../styles/Home.module.css'
import { JsonViewer } from '@textea/json-viewer'
import { Loading } from '@nextui-org/react';

import {create} from '@tdf-labs/the-data-faucet-sdk'

const dataFaucet = create({url: 'https://graph.tdf-labs.io/latest/graphql'})

export default function Home() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    async function queryData() {
      setData(null);

      const data = await dataFaucet.query.chain.polkadot.balanceTransfers({
        address: '13GgtddFytMGMZApWQbr8y45j1kGM4LAsLEtX1zx4sgmKhZv'
      })

      setData(data);
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
