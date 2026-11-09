import { render } from '@testing-library/react'
import App from './app'

describe('App', () => {
    test('renders without crashing', async () => {
        const { baseElement } = render(<App />)

        expect(baseElement).toBeDefined()
    })
})
