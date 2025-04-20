import { useState } from 'react'
import './App.css'
import QRFactory from 'qrcode-generator';

type Error = {
    hasError: boolean;
    errorInfo: 'EMPTY_STRING' | 'MAX_LENGTH' |  null;
}
const initialError = { hasError: false, errorInfo: null }
function App() {
    const ERROR_CORRECTION_LEVEL = 'L';
    const TYPE_NUMBER = 0;
    const MAX_LENGTH = 20;
    const [input, setInput] = useState('')
    const [qrcode, setQRCode] = useState('')
    const [history, setHistory] = useState<string[]>([])
    const [error, setError] = useState<Error>(initialError)

    const qr = QRFactory(TYPE_NUMBER, ERROR_CORRECTION_LEVEL)

    const updateQRCode = (data: string, updateHistory: boolean = false) => {
        if (!data) {
            setError({hasError: true, errorInfo: 'EMPTY_STRING'})
        }
        else if (data.length > MAX_LENGTH) {
            setError({hasError: true, errorInfo: 'MAX_LENGTH'})
        }
        else {
            setError(initialError)
            qr.addData(data);
            qr.make();
            setQRCode(qr.createImgTag(10))
            if(updateHistory){
                const noDuplicates = history.filter(item => item != input)
                setHistory([...noDuplicates, input])
            }
        }
    }

    const generateQRCode = () => {
        updateQRCode(input, true)
        setInput('')
    }

    const generateFromListItem = (value :string) => {
        updateQRCode(value)
        setInput(value)
    }

    return (
    <>
        <div id="input-container">
            {error.hasError && error.errorInfo == 'EMPTY_STRING' && <span className="error" >QRCode input is empty...</span>}
            {error.hasError && error.errorInfo == 'MAX_LENGTH' && <span className="error" >QRCode input is too long...</span>}
            <h1 id="title">QRCode Generator</h1>
            <input
                type="text"
                id="text-input"
                name="text-input"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder="Enter info here">
            </input>
            <button className="button-64" role="button" onClick={() => generateQRCode()}>
                <span className="text">Generate</span>
            </button>
            {qrcode && <div className="qr-code" dangerouslySetInnerHTML={{__html: qrcode}}/>}
            <h1 id="title">Previous Codes</h1>
            <ul className="history-list">
                {
                    history.map((historyItem, index) =>
                        <li key={index} className="history-item">
                            <button onClick={() => generateFromListItem(historyItem)}>{historyItem}</button>
                        </li>

                    )
                }
            </ul>
        </div>
    </>
    )
}

export default App
