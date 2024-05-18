export function checkPermission(userPermissions = [], allowPermission = "") {
  return (
    userPermissions?.length > 0 &&
    (typeof allowPermission === "object"
      ? userPermissions.some(p => allowPermission.includes(p))
      : typeof allowPermission === "string" && userPermissions.includes(allowPermission))
  );
}

// Function to generate OTP
export function generateOTP() {
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += Math.floor(Math.random() * 10);
  }
  return OTP;
}

export function generatePass() {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789@#$';
 
    for (let i = 1; i <= 8; i++) {
        let char = Math.floor(Math.random()
            * str.length + 1);
 
        pass += str.charAt(char)
    }
 
    return pass;
}
 