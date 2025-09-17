import SubmitErrorToast from "../SignupComponent/SubmitErrorToast";
import SubmittingToast from "../SignupComponent/SubmittingToast";

export default function SignupError() {
    return (
        <div
            className="Errors-list"
            >
            <div className="mail-exist" id="submitted_toast">
                <SubmittingToast />
            </div>
            <div className="mail-exist" id="mail_exist">
                <SubmitErrorToast message={"Email already exists!!!!"} />
            </div>
            <div className="mail-exist" id="Field_empty_error">
                <SubmitErrorToast message={"Fill in all fields"} />
            </div>
            <div className="mail-exist" id="invalid_mail_format_toast">
                <SubmitErrorToast message={"Invalid email format!"} />
            </div>
            <div className="mail-exist" id="invalid_mail_credential">
                <SubmitErrorToast message={"Email and password does not match"} />
            </div>
        </div>
    );
}