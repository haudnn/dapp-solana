import IonIcon from '@sentre/antd-ionicon'
import { Image, Col, Layout, Row, Space, Typography} from 'antd'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import logo from 'static/images/solanaLogo.svg'
import brand from 'static/images/solanaLogoMark.svg'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import './index.less'
import { useState, useCallback, useEffect } from 'react'

function View() {
  // Get ConnectionProvider => return object
  const { connection } = useConnection()
  // Get Balance of this publicKey
  const { publicKey } = useWallet() 
  const [balance, setBalance] = useState(0)
  const getMyBalance = useCallback(async () => {
    if (!publicKey) return setBalance(0)
    const lamports = await connection.getBalance(publicKey)
    return setBalance(lamports)
  }, [connection, publicKey])
  useEffect(() => {
    getMyBalance()
  }, [getMyBalance])
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
          </Space>
        </Col>
      </Row>
    </Layout>
  )
}

export default View
