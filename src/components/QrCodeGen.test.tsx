import {afterEach, describe, expect, it, vi} from 'vitest'
import {cleanup, fireEvent, queryByTestId, render} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import {QrCodeGen} from "./QrCodeGen.tsx";
import {QRCodeGenActions, QrCodeGenState} from "./use-qr-code-gen.ts";

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
    const mockGenerateQRCode = vi.fn()
    const defaultActions: QRCodeGenActions = {
        deleteHistoryItem: vi.fn(),
        generateFromListItem: vi.fn(),
        generateQRCode: mockGenerateQRCode,
        setInput: vi.fn()
    }
    it('should render', () => {
        const {getByTestId} =
            render(<QrCodeGen
                qrCodeGenState={defaultState}
                qrCodeGenActions={defaultActions}
            />)
        expect(getByTestId('QrCodeContainer')).not.toBeNull();
    })

    it('should call generateQRCode function when button is pressed', () => {
        const {getByTestId} =
            render(<QrCodeGen
                qrCodeGenState={{...defaultState, input: "validInput"}}
                qrCodeGenActions={defaultActions}
            />)
        expect(getByTestId('QrCodeContainer')).not.toBeNull();
        fireEvent.click(getByTestId('generateButton'))
        expect(mockGenerateQRCode).toHaveBeenCalled()
    })

    it('should display input properly', () => {
        const {getByTestId} =
            render(<QrCodeGen
                qrCodeGenState={{...defaultState, input: 'validInput'}}
                qrCodeGenActions={defaultActions}
            />)
        expect(getByTestId('textInput')).toHaveValue('validInput');
    })

    it('should display empty input error properly', () => {
        const {getByTestId} =
            render(<QrCodeGen
            qrCodeGenState={{...defaultState, error: {hasError: true, errorInfo: "EMPTY_STRING"}}}
            qrCodeGenActions={defaultActions}
        />)
        expect(getByTestId('emptyInputError')).not.toBeNull();
    })

    it('should display input too long error properly', () => {
        const {getByTestId} =
            render(<QrCodeGen
                qrCodeGenState={{...defaultState, error: {hasError: true, errorInfo: "MAX_LENGTH"}}}
                qrCodeGenActions={defaultActions}
            />)
        expect(getByTestId('tooLongInputError')).not.toBeNull();
    })

    it('should display qrcode properly', () => {
        const {getByTestId} =
            render(<QrCodeGen
                qrCodeGenState={{...defaultState, qrcode: "<div> qrcode html </div>"}}
                qrCodeGenActions={defaultActions}
            />)
        expect(getByTestId('qrcode')).not.toBeNull();
    })

    it('should not show qrcode wrapper if there is no qrcode yet', () => {
        const {queryByTestId} =
            render(<QrCodeGen
                qrCodeGenState={{...defaultState, qrcode: ""}}
                qrCodeGenActions={defaultActions}
            />)
        expect(queryByTestId('qrcode')).toBeNull();
    })
})
