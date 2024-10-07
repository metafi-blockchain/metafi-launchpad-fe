import moment from "moment";
const exactMath = require("exact-math");
const AVATARS = [
    "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
    "https://uploads.republic.co/p/users/avatars/small/000/495/921/495921-1603918306-631c3134317c6b89d945800117b7001813302445.JPG",
    "https://assets.republic.co/assets/default/user/small-9619dc1066bbd4d6507d72cb757a4dedd53b72fde52f7e402ecc8535824609c3.svg",
];

const validatePwd = (pwd) => {
    const regexPassword = new RegExp(
        /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$/
    );
    // const regexPassword = new RegExp(/^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/);
    return regexPassword.test(pwd);
};

const validateUrl = (url) => {
    const regexUrl = new RegExp(/(^http[s]?:\/{2})|(^www)|(^\/{1,2})/gim);
    return regexUrl.test(url);
};

const validateConversionRatio = (conversionRatio) => {
    const regexConversionRatio = new RegExp(/\d+:\d+/g);
    return regexConversionRatio.test(conversionRatio);
};

const convertPhone = (callingCode, phone) => {
    const temp = typeof callingCode === "object" ? callingCode[0] : callingCode;
    return "+".concat(temp.concat(phone.replace(/^0+/, "").trim()));
};
const emailValidate = (e) => {
    const regexEmail = new RegExp(
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return regexEmail.test(e);
};

const hidePhone = (phone) => {
    if (phone.length > 3) {
        return phone.substring(0, phone.length - 3) + "***";
    }
    return "***";
};

const convertTime = (time) => {
    return moment(time)
        .format("LTS")
        .concat(", " + moment(time).format("L"));
};

const phoneNumberValidate = (p) => {
    // const regexPhone = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
    const regexPhone = new RegExp(/((09|03|07|08|05)+([0-9]{8})\b)/g);
    return regexPhone.test(p);
};

const formatNumber = (num) => {
    if (num) return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return num;
};

const capitalizeFirstLetter = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
};

const hideWalletAddress = (s) => {
    if (typeof s !== "string") return "";
    if (s.length < 20) return s;
    return s.substring(0, 5) + "..." + s.substring(s.length - 8, s.length);
};

const convertTimeStampToDate = (t) => {
    if (t) return new Date(t).toLocaleString();
    return;
};
const roundUNWPrice = (num, e) => {
    if (typeof num === "string") return num;
    if (num)
        return Math.round(num * Math.pow(10, e)) / Math.pow(10, e).toString();
    return num;
};
const formatUnw = (amount) => {
    return Number(amount) / 10 ** 6;
};
const formatNumberWithPrecision = (amount, precision) => {
    return Number(amount) / 10 ** precision;
};

const getRatioUNW = (str) => {
    if (typeof str === "string") {
        str = str.trim();
        let arr = str.split(":");
        return {
            tokenRatio: parseInt(arr[0]),
            unxRatio: parseInt(arr[1]),
        };
    }
    return null;
};
const formatAmount = (amount, pow = 2) => {
    let amount1 = Number(amount).toFixed(pow);
    amount1 = Math.round(amount1 * Math.pow(10, pow)) / Math.pow(10, pow);
    amount1 = String(amount1);
    if (amount1.indexOf(".") < 0) {
        amount1 = amount1 + ".";
        return String(amount1)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
            .replace(".", "");
    } else {
        return String(amount1).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    }
};

const formatTransactionHash = (str, start, end) => {
    if (!str) return;
    return (
        str.substring(0, start) +
        "..." +
        str.substring(str.length, str.length - end)
    );
};

const getDateDiff = (val) => {
    const now = new Date();
    const date1 = new Date(
        now.getMonth() + 1 + "/" + now.getDay() + "/" + now.getFullYear()
    );
    const date2 = new Date(val);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
};

const randomAvatar = () => {
    const idx = Math.floor(Math.random() * (AVATARS.length + 1));
    return AVATARS[idx];
};

const formatNumberDownRound = (number, decimal) => {
    if (number === null || number === undefined) return 0;

    if (typeof number === "string") {
        number = Number(number);
    }

    const sub = number.toString().split(".");

    if (sub.length >= 2) {
        if (sub[1].length > decimal) {
            const precision = sub[1].substring(0, decimal);
            return `${sub[0]}.${precision}`;
            // const srt = number.toString();
        }
        return number.toFixed(decimal);
    }

    return number.toFixed(decimal);
};

const formatNumberDownRoundWithExtractMax = (number, decimal) => {
    try {
        return exactMath
        .div(
            exactMath.floor(exactMath.mul(number, exactMath.pow(10, decimal))),
            exactMath.pow(10, decimal)
        )
        .toFixed(decimal);   
    } catch (error) {
       return 0; 
    }
   
};

function isFloatFormatted(str, decimal) {
    const sub = str.toString().split(".");

    return !(sub.length >= 2 && sub[1].length > decimal);
}

const convertSecondsToReadableString = (seconds) => {
    seconds = seconds || 0;
    seconds = Number(seconds);
    seconds = Math.abs(seconds);

    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    // const s = Math.floor(seconds % 60);
    const parts = [];

    parts.push(d + "d");
    parts.push(h + "h");
    parts.push(m + "m");
    // parts.push(s + 's');

    return parts.join(" ");
};

export const helpers = {
    convertTimeStampToDate,
    validatePwd,
    validateUrl,
    validateConversionRatio,
    convertPhone,
    hidePhone,
    convertTime,
    phoneNumberValidate,
    formatNumber,
    emailValidate,
    capitalizeFirstLetter,
    hideWalletAddress,
    roundUNWPrice,
    formatUnw,
    formatNumberWithPrecision,
    getRatioUNW,
    formatAmount,
    formatTransactionHash,
    getDateDiff,
    randomAvatar,
    formatNumberDownRound,
    formatNumberDownRoundWithExtractMax,
    isFloatFormatted,
    convertSecondsToReadableString
};

export const formatTokenAllocation = (number, decimals, decimalDisplay) => {
    if (typeof number === "number") {
        return `${formatNumberDownRoundWithExtractMax(number / 10 ** decimals , decimalDisplay )}`;
    }
    if (typeof number === "string") {
        if (number.includes("-")) {
            const tempArr = number.split("-");
            if (tempArr.length >= 2) {
                const item1 = formatNumberDownRoundWithExtractMax(
                    tempArr[0] / 10 ** decimals || 0,
                    decimalDisplay
                );
                const item2 = formatNumberDownRoundWithExtractMax(
                    tempArr[1] / 10 ** decimals || 0,
                    decimalDisplay
                );
                return `${item1} / ${item2}`;
            }
        } else {
            return `${formatNumberDownRoundWithExtractMax(number / 10 ** decimals ,decimalDisplay )}`;
        }
    }
};

export const formatTimeStampAllocation = (timeStamp) => {
    if (typeof timeStamp == "number")
        return (
            moment(timeStamp * 1000 || 0)
            .utc()
            .format("YY-MM-DD HH:mm")
        );
    if (typeof timeStamp == "string") {
        if (timeStamp.includes("-")) {
            const tempArr = timeStamp.split("-");
            if (tempArr.length >= 2) {
                const item1 = moment(tempArr[0] * 1000 || 0)
                    .utc()
                    .format("YY-MM-DD HH:mm");
                const item2 =
                    moment(tempArr[1] * 1000 || 0)
                    .utc()
                    .format("YY-MM-DD HH:mm");
                return `${item1} <span class='mx-1 text-secondary'>to</span> ${item2}`;
            }
        } else {
            return (
                moment(timeStamp * 1000 || 0)
                .utc()
                .format("YY-MM-DD HH:mm")
            );
        }
    }
};