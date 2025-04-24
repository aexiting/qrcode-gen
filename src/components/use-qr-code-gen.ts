import {useEffect, useState} from "react";
import QRFactory from "qrcode-generator";


interface QrCodeGenProps {
    errorCorrectionLevel: 'L' | 'M' | 'H';
    typeNumber: TypeNumber;
    maxLength: number;
    maxHistory: number;
}

export interface QrCodeGenState {
    input: string;
    qrcode: string;
    history: string[];
    error: Error
}

export interface QRCodeGenActions {
    setInput: (input: string) => void;
    generateFromListItem: (historyItem: string) => void;
    generateQRCode: () => void;
    deleteHistoryItem: (item: string) => void;
}

interface QRCodeResult {
    qrcode: string;
    updatedHistory: string[];
    error: Error
}

interface QRCodeProps {
    qr: QRCode,
    data: string,
    maxLength: number,
    prevHistory: string[],
    shouldUpdateHistory: boolean,
    maxHistory: number
}

export interface Error {
    hasError: boolean;
    errorInfo: 'EMPTY_STRING' | 'MAX_LENGTH' | null;
}

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

export const useQrCodeGen = (
    {
        errorCorrectionLevel,
        typeNumber,
        maxLength,
        maxHistory
    }: QrCodeGenProps): [QrCodeGenState, QRCodeGenActions] => {

    const initialState: QrCodeGenState = {
        input: '',
        qrcode: '',
        history: [],
        error: {hasError: false, errorInfo: null}
    }

    const [state, setState] = useState(initialState)

    useEffect(() => {
        const saved = localStorage.getItem('history')
        const savedHistory: string[] = saved ? JSON.parse(saved) as string[] : []
        setState(prevState => {
            return {...prevState, history: [...prevState.history, ...savedHistory]}
        })
    }, [])

    useEffect(() => {
        if (state.history) {
            localStorage.setItem('history', JSON.stringify(state.history))
        }
    }, [state.history])

    const commonQRCodeConfig = {
        qr: null,
        maxLength,
        data: state.input,
        shouldUpdateHistory: false,
        prevHistory: state.history,
        maxHistory
    };

    return [state, {
        deleteHistoryItem: (item: string) => setState({
            ...state,
            history: state.history.filter(historyItem => historyItem != item)
        }),
        generateQRCode:
            () => {
                const {qrcode, updatedHistory, error} =
                    updateQRCode({
                        ...commonQRCodeConfig,
                        qr: QRFactory(typeNumber, errorCorrectionLevel),
                        shouldUpdateHistory: true
                    })

                setState({...state, qrcode, history: updatedHistory, error})
            }
        ,
        generateFromListItem:
            (historyItem: string) => {
                const {qrcode, error} =
                    updateQRCode({
                        ...commonQRCodeConfig,
                        data: historyItem,
                        qr: QRFactory(typeNumber, errorCorrectionLevel),
                        shouldUpdateHistory: false
                    })

                setState({...state, qrcode, error})
            }
        ,
        setInput: (input: string) =>
            setState(prevState => ({...prevState, input: input}))
    }]
}