import {describe, expect, it} from "vitest";
import {useQrCodeGen} from "./use-qr-code-gen.ts";

describe('useQrCodeGen', () => {

    it('should return state and actions with default values', () => {
        const [qrCodeGenState, qrCodeGenActions] = useQrCodeGen({
            errorCorrectionLevel: 'L',
            maxHistory: 0,
            maxLength: 0,
            typeNumber: 0
        })
        expect(qrCodeGenActions).not.toBeNull();
        expect(qrCodeGenState).not.toBeNull();
    })
})