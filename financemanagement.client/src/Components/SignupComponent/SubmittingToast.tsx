import { GoDownload } from "react-icons/go";
import './ToastCSS.css';

export default function SubmittingToast() {
    return (
        <>
            <div
                className="toast-container"
                style={{ color: 'green', borderLeft: '10px solid green' }}>
                <div
                    className="toast-content">
                    <div
                        className="toast-icon">
                        <GoDownload />
                    </div>
                    <div
                        className="toast-text">
                        Submitting
                    </div>
                </div>
            </div>
        </>
    );
}
