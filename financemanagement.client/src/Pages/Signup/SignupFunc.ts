import { validateHeaderValue } from "node:http";

export function Verification(email : string, username : string, password : string) : boolean
{
        if (email == "" || password == "" || username == "") {
            const empty_field_error = document.getElementById("Field_empty_error");
            if (empty_field_error) {
                empty_field_error.classList.add("error-active");

                setTimeout(() => {
                    empty_field_error.classList.remove("error-active");
                }, 3000)
            }
            return false;
        }
                const signup_email_format_error = document.getElementById("signup_email_format_error");
        if (signup_email_format_error) {
            if (!email.includes("@")) {
                signup_email_format_error.classList.add('show');

                const invalid_mail_format_toast = document.getElementById("invalid_mail_format_toast");
                if (invalid_mail_format_toast) {
                    invalid_mail_format_toast.classList.add("error-active");

                    setTimeout(() => {
                        invalid_mail_format_toast.classList.remove("error-active");
                    }, 3000)
                }
                return false;


            } else {
                signup_email_format_error.classList.remove('show');

            }
        }
        return true;


}

export function LogInVerification(email : string, password : string) : boolean
{
            if (email == "" || password == "") {
            const empty_field_error = document.getElementById("Field_empty_error");
            if (empty_field_error) {
                empty_field_error.classList.add("error-active");

                setTimeout(() => {
                    empty_field_error.classList.remove("error-active");
                }, 3000)
            }
            return false;
        }
    
      const submitted_toast = document.getElementById("submitted_toast");
        if (submitted_toast) {
            submitted_toast.classList.add("error-active");

            setTimeout(() => {
                submitted_toast.classList.remove("error-active");
            }, 3000)
        }
        const signup_email_format_error = document.getElementById("email_format_error");
        if (signup_email_format_error) {
            if (!email.includes("@")) {
                signup_email_format_error.classList.add('show');

                const invalid_mail_format_toast = document.getElementById("invalid_mail_format_toast");
                if (invalid_mail_format_toast) {
                    invalid_mail_format_toast.classList.add("error-active");

                    setTimeout(() => {
                        invalid_mail_format_toast.classList.remove("error-active");
                    }, 3000)
                }
                return false;


            } else {
                signup_email_format_error.classList.remove('show');

            }
        }
        return true;
}