import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates";
import { mailtrapClient, sender } from "./mailtrap.config";

export const sendVerificationEmail = async (
	email: string,
	verificationToken: string,
) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Verify your email",
			html: VERIFICATION_EMAIL_TEMPLATE.replace(
				"{verificationCode}",
				verificationToken,
			),
			category: "Email Verification",
		});
		console.log("Email sent successfully", response);
	} catch (error: any) {
		console.error(`Error sending verification`, error);
		throw new Error(`Error sending verification email: ${error}`);
	}
};

export const sendWelcomeEmail = async (email: string, firstName: string) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			template_uuid: "63fa69f5-2e6e-4776-931e-a1a4cd150213",
			template_variables: {
				company_info_name: "Diz & Dat",
				name: firstName,
			},
		});

		console.log("Welcome email sent successfully", response);
	} catch (error) {
		console.error(`Error sending welcome email`, error);

		throw new Error(`Error sending welcome email: ${error}`);
	}
};
