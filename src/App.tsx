import { useState } from 'react'
import './App.css'
import QRFactory from 'qrcode-generator';

function App() {
    const ERROR_CORRECTION_LEVEL = 'M';
    const TYPE_NUMBER = 0;

    const [input, setInput] = useState('')
    const [qrcode, setQRcode] = useState('')

    const qr = QRFactory(TYPE_NUMBER, ERROR_CORRECTION_LEVEL)

    const handleInput = (text: string) => {
        setInput(text)
    }

    const generateQRCode = () => {
        qr.addData(input)
        qr.make()
        setQRcode(qr.createImgTag(10))
    }

    return (
    <>
        <div id="input-container">
            <h1 id="title">Quick Info Exchange App</h1>
            <input
                type="text"
                id="text-input"
                name="text-input"
                onChange={(e) => handleInput(e.target.value)}
                value={input}>
            </input>
            <button id="gen-btn" onClick={() => generateQRCode()}>Generate</button>
            {qrcode && <div className="qr-code" dangerouslySetInnerHTML={{ __html: qrcode }}/>}
        </div>
 </>
    )
}

export default App
