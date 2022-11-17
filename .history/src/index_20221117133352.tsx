import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import View from 'view'
import configs from 'configs';
import reportWebVitals from 'reportWebVitals'

import 'static/styles/index.less'

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <ConnectionProvider endpoint={}>
      <View />
    </ConnectionProvider> 
  </BrowserRouter>,
)
reportWebVitals()
