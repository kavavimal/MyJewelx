import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { CURRENCY_SYMBOL } from "./constants";

export function printPrice(price = "") {
  if (price === "") {
    return "";
  } else {
    return `${CURRENCY_SYMBOL} ${Number(price).toFixed(2)}`;
  }
}

export function printFormatPrice(price = "") {
  if (price === "") {
    return "";
  } else {
    const formatter = new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
    return formatter.format(Number(price).toFixed(2));
  }
}

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

export const transformAttributeName = (name, short = false) => {
  const karatMatch = name.match(/(Karat\s\d+)/i);
  if (karatMatch) {
    const parts = karatMatch[0].split(" ");
    if (short) {
      return `${parts[1]}K`;
    }
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

export function showToast(data) {
  enqueueSnackbar(data.message, {
    variant: data.variant ? data.variant : "success",
    preventDuplicates: true,
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
    autoHideDuration: 3000,
    style: {
      background: "white",
      color: "black",
      borderRadius: ".5rem",
      boxShadow:
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      padding: "0 4px",
    },
  });
}

export const truncate = (string, n) => {
  return string?.length > n ? string.substr(0, n - 1) + "..." : string;
};

export const getProductPriceString = (product, variation) => {
  let price = printPrice(variation?.selling_price);
  if (product) {
    let productPrices = product.variations.reduce(
      (arr, item) => [
        ...arr,
        Number(item?.selling_price ? item?.selling_price : item?.regular_price),
      ],
      []
    );
    productPrices = productPrices.filter(
      (value, index, array) => array.indexOf(value) === index
    );
    let ProdPriceText = price;
    if (productPrices?.length > 1)
      ProdPriceText = `${Number(Math.min(...productPrices)).toFixed(
        2
      )} - ${Number(Math.max(...productPrices)).toFixed(2)}`;
    else if (productPrices?.length === 1)
      ProdPriceText = Number(productPrices[0]).toFixed(2);

    price = CURRENCY_SYMBOL + " " + ProdPriceText;
  }
  return price;
};

export const getProductAverageRatings = (reviews) => {
  if (!reviews) return 0;
  const allRating = reviews.reduce((arr, item) => [...arr, item.rating], []);
  const sumRating = allRating.reduce((a, b) => a + b, 0);
  const avgRating = sumRating / allRating.length || 0;
  return avgRating;
};
