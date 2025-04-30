import { describe, it, expect } from 'vitest'
import { afterEach } from 'vitest'
import {cleanup, render} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import {QrCodeGen} from "./QrCodeGen.tsx";
import {QRCodeGenActions, QrCodeGenState} from "./use-qr-code-gen.ts";
import {vi} from 'vitest'
afterEach(() => {
    cleanup();
})
describe('QrCodeGen', () => {
    const defaultState: QrCodeGenState = {
        error: {
            hasError: false,
            errorInfo: null
        },
        history: [],
        input: "",
        qrcode: ""

    }
    const defaultActions: QRCodeGenActions = {
        deleteHistoryItem: vi.fn(),
        generateFromListItem: vi.fn(),
        generateQRCode: vi.fn(),
        setInput: vi.fn()
    }
    it('should render', () => {
        const app =
            render(<QrCodeGen
                qrCodeGenState={defaultState}
                qrCodeGenActions={defaultActions}
            />)
        expect(app.container.querySelector('#input-container')).not.toBeNull();
    })
})
