import moment from "moment";

export function checkPermission(userPermissions = [], allowPermission = "") {
  return (
    userPermissions?.length > 0 &&
    (typeof allowPermission === "object"
      ? userPermissions.some((p) => allowPermission.includes(p))
      : typeof allowPermission === "string" &&
        userPermissions.includes(allowPermission))
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
  let pass = "";
  let str =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";

  for (let i = 1; i <= 8; i++) {
    let char = Math.floor(Math.random() * str.length + 1);

    pass += str.charAt(char);
  }

  return pass;
}

export const transformAttributeName = (name) => {
  const karatMatch = name.match(/(Karat\s\d+)/i);
  if (karatMatch) {
    const parts = karatMatch[0].split(" ");
    return `${parts[1]} ${parts[0]}`;
  }
  return name;
};

function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function formatDateString(dateString) {
  const date = moment(dateString);
  const day = date.date();
  const month = date.format("MMMM"); // Get full month name
  const year = date.format("YY"); // Get two-digit year

  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}
