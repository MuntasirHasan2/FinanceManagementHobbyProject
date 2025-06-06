import { MdError } from "react-icons/md";
import './ToastCSS.css';

type Props = {
    message: string
}
export default function SubmitErrorToast({ message }: Props) {
    //const [message, setMessage] = useState("Email Already Exist!");


    return (
        <>
            <div
                className="toast-container">
                <div
                    className="toast-content">
                    <div
                        className="toast-icon">
                        <MdError />
                    </div>
                    <div
                        className="toast-text">
                        {message}
                    </div>
                </div>
            </div>
        </>
    );
}