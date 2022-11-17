import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import View from 'view'
import configs from 'configs'
import reportWebVitals from 'reportWebVitals'
import 'static/styles/index.less'
import {
  PhantomWalletAdapter,
  Coin98WalletAdapter,
} from '@solana/wallet-adapter-wallets'
const {
  rpc: { endpoint },
} = configs
createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <ConnectionProvider endpoint={endpoint}>
      {/* wallets dApp support = wallets[] */}
      <WalletProvider
        wallets={[new PhantomWalletAdapter(), new Coin98WalletAdapter()]}
        autoConnect
      >
        <View />
      </WalletProvider>
    </ConnectionProvider>
  </BrowserRouter>,
)
reportWebVitals()
