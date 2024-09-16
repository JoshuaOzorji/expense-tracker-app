"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetSuccessEmail = exports.sendPasswordResetEmail = exports.sendWelcomeEmail = exports.sendVerificationEmail = void 0;
const emailTemplates_1 = require("./emailTemplates");
const mailtrap_config_1 = require("./mailtrap.config");
const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrap_config_1.mailtrapClient.send({
            from: mailtrap_config_1.sender,
            to: recipient,
            subject: "Verify your email",
            html: emailTemplates_1.VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        });
        console.log("Email sent successfully", response);
    }
    catch (error) {
        console.error(`Error sending verification`, error);
        throw new Error(`Error sending verification email: ${error}`);
    }
};
exports.sendVerificationEmail = sendVerificationEmail;
const sendWelcomeEmail = async (email, firstName) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrap_config_1.mailtrapClient.send({
            from: mailtrap_config_1.sender,
            to: recipient,
            template_uuid: "63fa69f5-2e6e-4776-931e-a1a4cd150213",
            template_variables: {
                company_info_name: "Diz & Dat",
                name: firstName,
            },
        });
        console.log("Welcome email sent successfully", response);
    }
    catch (error) {
        console.error(`Error sending welcome email`, error);
        throw new Error(`Error sending welcome email: ${error}`);
    }
};
exports.sendWelcomeEmail = sendWelcomeEmail;
const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrap_config_1.mailtrapClient.send({
            from: mailtrap_config_1.sender,
            to: recipient,
            subject: "Reset your password",
            html: emailTemplates_1.PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
        });
    }
    catch (error) {
        console.error(`Error sending welcome email`, error);
        throw new Error(`Error sending welcome email: ${error}`);
    }
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrap_config_1.mailtrapClient.send({
            from: mailtrap_config_1.sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: emailTemplates_1.PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        });
        console.log("Password reset email sent successfully", response);
    }
    catch (error) {
        console.error(`Error sending password reset success email`, error);
        throw new Error(`Error sending password reset success email: ${error}`);
    }
};
exports.sendResetSuccessEmail = sendResetSuccessEmail;
