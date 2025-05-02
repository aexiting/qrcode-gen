
import {QRCodeProps, QRCodeResult} from "./use-qr-code-gen.ts";

export const updateQRCode = (
    {
        qr,
        data,
        maxLength,
        prevHistory,
        shouldUpdateHistory,
        maxHistory,
    }: QRCodeProps): QRCodeResult => {


    let result: QRCodeResult = {qrcode: '', updatedHistory: [], error: {hasError: false, errorInfo: null}}

    if (!data) {
        result = {...result, error: {hasError: true, errorInfo: 'EMPTY_STRING'}}
    } else if (data.length > maxLength) {
        result = {...result, error: {hasError: true, errorInfo: 'MAX_LENGTH'}}
    } else {
        qr.addData(data);
        qr.make();

        const sliceBy = Math.max(0, prevHistory.length + 1 - maxHistory)
        const updatedHistory = shouldUpdateHistory ?
            [...prevHistory.filter(item => item != data), data].slice(sliceBy) : prevHistory;

        result = {
            qrcode: qr.createImgTag(10),
            error: {
                hasError: false,
                errorInfo: null
            },
            updatedHistory: updatedHistory
        }
    }
    return result
}