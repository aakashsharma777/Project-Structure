const response = {
  message: {
    success: {
      statusCode: 200,
      status: "success"
      /* profileUpdate: 'User profile has updated successfully.',
			issuejwt: 'JWT Token issued successfully',
			verifyjwt: 'JWT Token verified successfully',
			codeMessage: 'Code has been sent, Please check.',
			loginSucess: 'Login successfully.',
			paycheckSuccess: 'Your Pay check details has been updated.',
			emailnotexist: 'Email not exist',
			useadded: 'User Added Successfully.',
			userBlockedSuccess: 'User Blocked Successfully',
			userUnblockedSuccess: 'User Unblocked Successfully',
			userInvitedSuccess: 'User invited successfully',
			userReportedSuccess: 'User reported successfully' */
    },
    successData: {
      statusCode: 201,
      status: "success"
      /* profileUpdate: 'User profile has updated successfully.',
      	issuejwt: 'JWT Token issued successfully',
      	verifyjwt: 'JWT Token verified successfully',
      	codeMessage: 'Code has been sent, Please check.',
      	loginSucess: 'Login successfully.',
      	paycheckSuccess: 'Your Pay check details has been updated.', */
    },
    error: {
      statusCode: 400,
      notFulFiled: 403,
      status: "error",
      messageError: "Bad Request.",
      WrongOtpError: "Enter Correct OTP.",
      tokenError: "Token has been expired!!!.",
      UserEmptyError: "User does not exist.",
      UserDeactive: "User does not exist."
      /*phoneError: 'Please enter valid phone number.',
			
			
			verifyjwt: 'JWT Token cannot be verified',
			phoneValidError: 'Phone Number is not a valid number, Please check.',
			acoountTokenErr: 'Unable to process account token.',
			nameError: 'Please enter the valid name.',
			twilloError: 'Please check your phone number.',
			dbCreateUpdateFail: 'Unable to process the transaction history.',
			transactionPerIdErr: 'Unable to process your transaction detail.',
			somethingWentWrong: 'Something went wrong !!',
			invalidPaycheck: 'Invalid paycheck. You can proceed, when your paycheck have reach more than one transactions',
			emailexist: 'Email already exist',
			wrongpassword: 'Wrong Password',
			notadduser: 'Not able to add User',
			userBlockedFailure: 'Error in Blocking User',
			userUnBlockedFailure: 'Error in Unblocking User',
			userInvitedFailure: 'Error in inviting user',
			sendingMailFailure: 'Error in sending mail',
			alreadyInvitedError:`Already invited 1 user today.`,
			userReportedFailure: 'Error in reporting user', */
    }
  },
  emails: {
    register: {
      from: "NodeGenerator <support@nodegenerator.com>",
      subject: "Welcome to NodeGenerator",
      content:
        "Hi {username},<br><br>Welcome to the NodeGenerator Community. Your profile is not activated to help secure your account.<br><br>Please use the link to activate your profile : <a href='{link}'>Activate Profile</a><br><br>If the above link does not work please use the link below to complete the activation of your account.<br><br><code><a href='{link}'>{link}</a></code><br><br>With Regards,<br>NodeGenerator Support Team"
    }
  },
  confirmMessage: {
    success: {
      message: "User has activated."
    },
    alreadyActivated: {
      message: "User has already signed up, Please login."
    }
  }
};

module.exports = response;
