import { createRoot } from 'react-dom/client'

import App from './components/App/App'
const body = document.querySelector('body')

const root = createRoot(body)

root.render(<App />)
