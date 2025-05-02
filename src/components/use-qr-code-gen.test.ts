import {describe, expect, it, vi} from "vitest";
import {useQrCodeGen} from "./use-qr-code-gen.ts";
import {renderHook} from "@testing-library/react";
import {act} from "react";
import * as QrCodeModule from './update-qr-code'; // Import the module itself

describe('useQrCodeGen', () => {
    it('should return state and actions with default values', () => {
        const [qrCodeGenState, qrCodeGenActions] = renderHook(() => useQrCodeGen({
            errorCorrectionLevel: 'L',
            maxHistory: 0,
            maxLength: 0,
            typeNumber: 0
        })).result.current
        expect(qrCodeGenActions).not.toBeNull();
        expect(qrCodeGenState).not.toBeNull();
    })

    it('should update input state', () => {
        const [qrCodeGenState, qrCodeGenActions] = renderHook(() => useQrCodeGen({
            errorCorrectionLevel: 'L',
            maxHistory: 0,
            maxLength: 0,
            typeNumber: 0
        })).result.current
        qrCodeGenActions.setInput('Test input')
        expect(qrCodeGenState.input).toEqual('Test input')
    })

    it('should update state when using history item', () => {
        const qrCodeGenActions = renderHook(() => useQrCodeGen({
            errorCorrectionLevel: 'L',
            maxHistory: 0,
            maxLength: 0,
            typeNumber: 0
        })).result.current[1]

        const updateQRCodeSpy = vi.spyOn(QrCodeModule, 'updateQRCode');

        act(() => {
            qrCodeGenActions.generateFromListItem('History Item')
        })

        expect(updateQRCodeSpy).toHaveBeenCalledWith(
            expect.objectContaining({
                data: 'History Item', // Check specific argument properties
                shouldUpdateHistory: false
            })
        );
    })

})