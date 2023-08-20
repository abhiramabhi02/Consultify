export const environment = {
    production:false,
    User:{
        BASE_URL: 'http://localhost:3000/',
        USER_BASE_URL: 'http://localhost:3000/users/',
        USER_REGISTRATION: 'userregistration',
        USER_LOGIN:'userlogin',
        PROFESSIONAL_LISTING:'prolisting',
        PROFESSIONAL_PROFILE:'professionalprofile',
        USER_EMAIL_VERIFY:'mailverify',
        USER_OTP_VERIFY:'otpverify',
        SCHEDULE_APPOINTMENT:'schedule',
        GET_PROFESSIONAL_PREFERENCES:'getpreferences',
        GET_PRO_USER_DATA:'getalldata',
        GET_USER_DATA:'getuserdata',
        GET_ALL_APPOINTMENT:'getallappointment',
        APPOINTMENT_CONFIRM:'confirmappointment',
        GET_CONFERENCE_APPOINTMENT: 'getconferenceappointment'
    },
    Professional:{
        BASE_URL: 'http://localhost:3000/',
        PROFESSIONAL_BASE_URL: 'http://localhost:3000/professionals/',
        PROFESSIONAL_REGISTRATION: 'professionalregistration',
        PROFESSIONAL_LOGIN:'professionallogin',
        PROFESSIONAL_MAIL_VERIFICATION:'verifyMail',
        PROFESSIONAL_VERIFY_OTP:'verifyotp',
        PROFESSIONAL_DASHBOARD:'professionaldashboard',
        PROFESSIONAL_PREFERENCES:'professionalpreferences',
        PROFESSIONAL_APPOINTMENTS:'professionalappointments',
        PROFESSIONAL_CONFIRM:'confirmappointment',
        APPOINTMENT_CANCEL:'cancelappointment',
        GET_CONFERENCE_APPOINTMENT: 'getconferenceappointment'
    },
    Admin:{
        BASE_URL: 'http://localhost:3000/',
        ADMIN_BASE_URL: 'http://localhost:3000/admins/',
        ADMIN_LOGIN: 'adminlogin',
        GET_ALL_USERS:'adminusers',
        GET_ALL_PROFESSIONALS: 'adminprofessionals',
        BLOCK_USER:'adminblockuser',
        UNBLOCK_USER:'adminunblockuser',
        BLOCK_PROFESSIONAL:'adminblockprofessional',
        UNBLOCK_PROFESSIONAL:'adminunblockuserprofessional',
        GET_APPOINTMENTS:'getappointments'
    },
    Razorpay:{
        CREATE_ORDER:'api/createorder',
        PAYMENT_VERIFY:'api/paymentverify'
    }
}