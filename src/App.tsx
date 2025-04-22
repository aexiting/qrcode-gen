import './App.css'
import {useQrCodeGen} from "./components/use-qr-code-gen.ts";
import {QrCodeGen} from "./components/QrCodeGen.tsx";

function App() {
    const ERROR_CORRECTION_LEVEL = 'L';
    const TYPE_NUMBER = 0;
    const MAX_LENGTH = 40;
    const MAX_HISTORY = 7;

    const [qrCodeGenState, qrCodeGenAction] = useQrCodeGen(
        {
            errorCorrectionLevel: ERROR_CORRECTION_LEVEL,
            typeNumber: TYPE_NUMBER,
            maxLength: MAX_LENGTH,
            maxHistory: MAX_HISTORY
        })
    return (
        <QrCodeGen
            qrCodeGenState={qrCodeGenState}
            qrCodeGenActions={qrCodeGenAction}
        />
    )
}

export default App
