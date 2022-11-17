import IonIcon from '@sentre/antd-ionicon'
import { Image, Col, Layout, Row, Space, Typography, Button } from 'antd'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import logo from 'static/images/solanaLogo.svg'
import brand from 'static/images/solanaLogoMark.svg'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import './index.less'
import { useState, useCallback, useEffect } from 'react'
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js'

function View() {
  // Get ConnectionProvider => return object
  const { connection } = useConnection()
  // Get Balance of this public key
  const { publicKey, sendTransaction } = useWallet()
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(false)
  const getMyBalance = useCallback(async () => {
    if (!publicKey) return setBalance(0)
    const lamports = await connection.getBalance(publicKey)
    return setBalance(lamports)
  }, [connection, publicKey])

  useEffect(() => {
    getMyBalance()
  }, [getMyBalance])

  const airdrop = useCallback(async () => {
    try {
      setLoading(true)
      if (publicKey) {
        await connection.requestAirdrop(publicKey, 10 ** 8)
        return getMyBalance()
      }
    } catch (err: any) {
      console.log(err.message)
    } finally {
      return setLoading(false)
    }
  }, [connection, publicKey, getMyBalance])
  const transfer = useCallback(async () => {
    try {
      setLoading(true)
      if (publicKey) {
        // Transfer SOL
        const instruction = SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: Keypair.generate().publicKey,
          lamports: 10 ** 8, // 0.1 SOL
        })
        const transaction = new Transaction().add(instruction)
        const {
          context: { slot: minContextSlot },
          value: { blockhash, lastValidBlockHeight },
        } = await connection.getLatestBlockhashAndContext()
        const signature = await sendTransaction(transaction, connection, {
          minContextSlot,
        })
        await connection.confirmTransaction({
          blockhash,
          lastValidBlockHeight,
          signature,
        })
        return getMyBalance()
      }
    } catch (err: any) {
      console.log(err.message)
    } finally {
      return setLoading(false)
    }
  }, [connection, publicKey, getMyBalance, sendTransaction])
  return (
    <Layout className="container">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row gutter={[24, 24]}>
            <Col flex="auto">
              <img src={brand} alt="logo" height={16} />
            </Col>
            <Col>
              <WalletMultiButton />
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Space direction="vertical" size={24}>
            <Image src={logo} preview={false} width={256} />
            <Typography.Title level={1}>React + Solana = DApp</Typography.Title>
            <Typography.Text type="secondary">
              <Space>
                <IonIcon name="logo-react" />
                +
                <IonIcon name="logo-solana" />
                =
                <IonIcon name="rocket" />
              </Space>
            </Typography.Text>
            <Typography.Title>
              My Blance: {balance / 10 ** 9} SOL
            </Typography.Title>
            <Space>
              <Button
                type="primary"
                size="large"
                onClick={airdrop}
                loading={loading}
              >
                Airdrop
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={transfer}
                loading={loading}
              >
                Transfer
              </Button>
            </Space>
          </Space>
        </Col>
      </Row>
    </Layout>
  )
}

export default View
