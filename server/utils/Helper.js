const convertStringForVnToEnglish = alias => {
    const str = alias;
    // str = str.toLowerCase();
    // str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
    // str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
    // str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
    // str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
    // str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
    // str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
    // str = str.replace(/đ/g,"d");
    // str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    // str = str.replace(/ + /g," ");
    // str = str.trim();
    // return str;

    return new RegExp(str, 'iu');
};

const getUniqueErrorMessage = err => {
    let output = null;

    try {
        const fieldName = err.message.substring(
            err.message.lastIndexOf('.$') + 2,
            err.message.lastIndexOf('_1')
        );

        output =
            fieldName.charAt(0).toUpperCase() +
            fieldName.slice(1) +
            ' already exists';
    } catch (ex) {
        output = 'Unique field already exists';
    }

    return output;
};

const getErrorMessage = err => {
    let message = '';

    if (err.code) {
        switch (err.code) {
        case 11000:
        case 11001:
            message = getUniqueErrorMessage(err);
            break;
        default:
            message = 'Something went wrong';
        }
    } else {
        for (const errName in err.errors) {
            if (err.errors[errName].message) {
                message = err.errors[errName].message;
            }
        }
    }

    return message;
};

const checkArrayElemType = (array, type) => {
    for (let i = 0; i < array.length; i++) {
        if (typeof array[i] !== type) {
            return false;
        }
    }

    return true;
};

const generateRandomString = stringLength => {
    const MIN = 65;
    const MAX = 90;
    let randomString = '';

    let loopTime = stringLength;

    while (loopTime--) {
        randomString += String.fromCharCode(
            Math.floor(Math.random() * (MAX - MIN)) + MIN
        );
    }

    return randomString;
};

const filterEmptyURLs = urls => urls.filter(url => Boolean(url));

module.exports = {
    withCurrency: price => {
        return price + ' VND';
    },
    filterEmptyURLs,
    checkArrayElemType,
    convertStringForVnToEnglish,
    getErrorMessage,
    generateRandomString
};
