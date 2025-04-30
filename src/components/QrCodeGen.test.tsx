import { describe, it, expect } from 'vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

afterEach(() => {
    cleanup();
})
describe('A truthy statement', () => {
    it('should be equal to 2', () => {
        expect(1+1).toEqual(2)
    })
})
