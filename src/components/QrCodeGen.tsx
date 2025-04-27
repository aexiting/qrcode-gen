import {QRCodeGenActions, QrCodeGenState} from "./use-qr-code-gen.ts";


export const QrCodeGen = (
    {
        qrCodeGenState,
        qrCodeGenActions: qrCodeGenActions
    }: {
        qrCodeGenState: QrCodeGenState,
        qrCodeGenActions: QRCodeGenActions
    }) => {

    return (
        <>
        <div id="input-container">
            {qrCodeGenState.error.hasError && qrCodeGenState.error.errorInfo == 'EMPTY_STRING' &&
                <span className="error">QRCode input is empty...</span>}
            {qrCodeGenState.error.hasError && qrCodeGenState.error.errorInfo == 'MAX_LENGTH' &&
                <span className="error">QRCode input is too long...</span>}
            <h1 className="title">QRCode Generator</h1>
            <input
                type="text"
                id="text-input"
                name="text-input"
                onChange={(e) => qrCodeGenActions.setInput(e.target.value)}
                value={qrCodeGenState.input}
                placeholder="Enter info here">
            </input>
            <button className="button-64" role="button" onClick={() => qrCodeGenActions.generateQRCode()}>
                <span className="text">Generate</span>
            </button>
            {qrCodeGenState.qrcode &&
                <div className="qr-code" dangerouslySetInnerHTML={{__html: qrCodeGenState.qrcode}}/>}
                <h1 className="title">Previous Codes</h1>
                <ul className="history-list">
            {
                qrCodeGenState.history.map((historyItem: string, index: number) =>
                <li key={index} className="history-item" draggable>
                <button
                    onClick={() => qrCodeGenActions.generateFromListItem(historyItem)}>{historyItem}</button>
                <button className="delete-button"
                        onClick={() => qrCodeGenActions.deleteHistoryItem(historyItem)}>Delete
                </button>
            </li>
                )
            }
        </ul>
        </div>
        </>
)
}