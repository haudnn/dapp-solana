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
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
const {
  rpc: { endpoint },
} = configs
createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
  {/* ConnectionProvider: Create connection of my app to Solana Application  */}
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider
        wallets={[new PhantomWalletAdapter(), new Coin98WalletAdapter()]}
        autoConnect
      >
        <WalletModalProvider>
          <View />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  </BrowserRouter>,
)
reportWebVitals()
