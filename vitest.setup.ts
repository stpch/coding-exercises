import '@testing-library/jest-dom/vitest'

window.matchMedia = query => ({
    addEventListener: () => {},
    addListener: () => {},
    dispatchEvent: () => false,
    matches: false,
    media: query,
    onchange: null,
    removeEventListener: () => {},
    removeListener: () => {},
})

window.IntersectionObserver = class {
    root = null
    rootMargin = ''
    scrollMargin = ''
    thresholds = []
    disconnect() {}
    observe() {}
    takeRecords() {
        return []
    }
    unobserve() {}
}

window.ResizeObserver = class {
    disconnect() {}
    observe() {}
    unobserve() {}
}

afterEach(() => {
    window.localStorage.clear()
    document.title = ''
})
