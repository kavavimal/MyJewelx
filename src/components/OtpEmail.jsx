import React from "react";

const OtpEmail = ({ otp, mode, otpResend }) => {
  return (
    <div style="background-color: #f8f8f8; padding: 30px; font-family: emirates, sans-serif;">
      <div style="background-color: #fff; padding: 30px; border-radius: 5px;">
        <div style="text-align: center;">
          <img
            src="https://i.imgur.com/0QvI7eN.png"
            alt="Jewlex Logo"
            style="width: 100px;"
          />
          <h1 style="font-size: 24px; margin-bottom: 10px;">
            Discover The Beauty
          </h1>
        </div>
        <h2 style="font-size: 18px; margin-bottom: 20px;">
          Your OTP for myJewlex Account Registration
        </h2>
        <p style="font-size: 16px; margin-bottom: 20px;">Dear, John Doe</p>
        <p style="font-size: 16px; margin-bottom: 20px;">
          Thank you for choosing myJewlex, where we bring you exquisite and
          personalized jewelry experiences. To complete your account
          registration, please use the One-Time Password (OTP) provided below.
          This OTP is valid for the next 5 minutes.
        </p>
        <div style="background-color: #ffcc00; padding: 10px; border-radius: 5px; font-size: 16px; margin-bottom: 20px; text-align: center;">
          Your OTP: {otp}
        </div>
        <p style="font-size: 16px; margin-bottom: 20px;">
          Please enter this code on the registration page to verify your email
          address and activate your myJewlex account.
        </p>
        <p style="font-size: 16px; margin-bottom: 20px;">
          If you did not initiate this registration, please disregard this
          email.
        </p>
        <p style="font-size: 16px; margin-bottom: 20px;">Warm Regards:</p>
        <p style="font-size: 16px; margin-bottom: 20px;">The myJewlex Team</p>
        <div style="text-align: center; margin-top: 20px;">
          <p style="font-size: 14px; margin-bottom: 10px;">Do you need help?</p>
          <p style="font-size: 14px;">
            Feel free to reach out to us anytime:{" "}
            <a href="mailto:support@myJewlex.com" style="color: #ffcc00;">
              support@myJewlex.com
            </a>
          </p>
        </div>
        <div style="text-align: center; margin-top: 20px;">
          <a
            href="https://www.facebook.com/"
            style="color: #3b5998; margin-right: 10px;"
          >
            <i className="fab fa-facebook-f" style="font-size: 20px;"></i>
          </a>
          <a
            href="https://www.linkedin.com/"
            style="color: #007bb5; margin-right: 10px;"
          >
            <i className="fab fa-linkedin-in" style="font-size: 20px;"></i>
          </a>
          <a href="https://www.instagram.com/" style="color: #e1306c;">
            <i className="fab fa-instagram" style="font-size: 20px;"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default OtpEmail;
