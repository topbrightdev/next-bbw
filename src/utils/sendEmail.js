import { emailTemplates } from "./constants";
const sgMail = require("@sendgrid/mail");
const { SENDGRID_EMAIL_SENDER } = process.env;
const sendEmail = async ({ subject, receiver, message = "", templateId = "", dynamicTemplateData = {} }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const content = {
    to: `${receiver}`,
    from: "support@blackbusinesswarehouse.com",
    subject: `${subject}`,
    text: `${message}`,
    html: `<strong>Inquiry from Black Business Warehouse:</strong> ${message}`,
  };
  if (templateId) {
    content.templateId = templateId;
    content.dynamicTemplateData = dynamicTemplateData;
  }

  try {
    await sgMail.send(content);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

const sendInviteEmail = async ({ targetEmail, senderEmail, companyName, senderRole, senderId, companyId }) => {
  return await Promise.all([
    sendEmail({
      sender: SENDGRID_EMAIL_SENDER,
      receiver: targetEmail,
      subject: `Black Business Warehouse - Invitation to join ${companyName}`,
      templateId: emailTemplates.INVITE_USER,
      dynamicTemplateData: {
        invited_by: senderEmail,
        company_name: companyName,
        user_id: senderId,
        business_id: companyId,
      },
      message: `You have been invited by ${senderEmail} - ${senderRole} to join ${companyName} on Black Business Warehouse. Click on the following link to login to your account:\nhttps://dev.blackbusinesswarehouse.com/`,
    }),
    sendEmail({
      sender: SENDGRID_EMAIL_SENDER,
      receiver: senderEmail,
      subject: `Black Business Warehouse - Invitation Sent`,
      message: `An invitation email to join ${companyName} has been sent to ${targetEmail}.`,
    }),
  ]);
};

export { sendEmail, sendInviteEmail };
