var moment = require('moment');

export const CARD_TYPES = {
    DISCOVER: 'discover',
    MASTERCARD: 'mastercard',
    VISA: 'visa',
    AMERICAN_EXPRESS: 'americanexpress'
};

const CARDS_RANGES = {
    discover: [[6011], [622126, 622925], [644, 649], [65]],
    mastercard: [[50, 55]],
    visa: [[4]],
    americanexpress: [[34], [37]]
};

const cardChecker = (card, value) => {
    if(CARD_TYPES[card] == undefined) return false;
    var num, v2;
    var ranges = CARDS_RANGES[card];
    var state = false;

    // 
    for(var i = 0; i < ranges.length; i++){
        var range = ranges[i];
        if(range.length == 1){
            v2 = value.substr(0, range[0].toString().length);
            if(v2 == range[0]){
                state = true;
                break;
            }
        }else if(range.length == 2){
            v2 = value.substr(0, range[1].toString().length);
            if(v2 >= range[0] && v2 <= range[1]){
                state = true;
                break;
            }
        }else{

        }
    }
    
    // 
    return state;
}

export const isMastercard = (value) => {
    return cardChecker(CARD_TYPES.MASTERCARD, value);
}

export const isVisacard = (value) => {
    return cardChecker(CARD_TYPES.VISA, value);
}

export const isAmericanExpress = (value) => {
    return cardChecker(CARD_TYPES.AMERICAN_EXPRESS, value);
}

export const isDiscoverCard = (value) => {
    return cardChecker(CARD_TYPES.DISCOVER, value);
}

export const isEmail = (value) => {
    if(typeof value == 'string' && value.length < 1) return true;
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
}

export const isUsername = (value) => {
    var regex = /^[A-Za-z0-9]+(?:[\_\-][A-Za-z0-9]+)*$/;
    return regex.test(value);
}

export const isPhone = (value) => {
    var re = /^[\+]?[(]?[0-9]{6,14}[)]?$/im;
    return re.test(value);
}

export const isPhoneNational = (value) => {
    var re = /^[0]?[0-9]{6,12}$/im;
    return re.test(value);
}

export const isNGMobile = (value) => {
    var re = /^[0-9]{11}?$/im;
    return re.test(value);
}

export const isNumber = (value) => {
    var regex = /^[0-9]*$/im;
    return regex.test(value);
}

export const isNumeric = (value) => {
    var re = /^[0-9\b]+$/im;
    return re.test(value);
}

export const url = (value) => {
    var re = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    return re.test(value);
}

export const required = (value) => {
    if(value == undefined) return false;
    if(value == null) return false;
    value = value+'';
    return value.length > 0;
}

export const requiredWith = (parent, value) => {
    if(!required(parent))
    {
        return true;
    }
    return required(value);
}

export const maxLength = (length, value) => {
    if(typeof value != 'string') return false;
    return value && value.length <= length;
}

export const minLength = (length, value) => {
    if(typeof value != 'string') return false;
    return value && value.length >= length;
}

export const between = (min, max, value) => {
    if(typeof value != 'string') return false;
    return value && (value.length >= min && value.length <= max );
}

export const match = (first, value) => {
    return value == first;
}

export const notMatch = (first, value) => {
    return value != first;
}

export const accept = (value) => {
    return value ? true : false;
}

export const max = (limit, value) => {
    return value <= limit;
}

export const min = (limit, value) => {
    return value >= limit;
}

export const isIn = (list, value) => {
    return list.indexOf(value) != -1 ? true : false;
}

export const afterDate = (start, value) => {
    var s_unix = moment(new Date(start)).unix();
    var n_unix = moment(new Date(value)).unix();

    return n_unix > s_unix;
}

export const beforeDate = (start, value) => {
    var s_unix = moment(new Date(start)).unix();
    var n_unix = moment(new Date(value)).unix();

    return n_unix < s_unix;
}

export const base64Image = (formats, value) => {
    var regex = new RegExp('\"data:image\/('+formats+');base64,([^\"]*)\"', 'i');
    return regex.test(value);
}

export const sometimes = (rule, value) => {
    if( value !== undefined && value !== null && (typeof value == 'string' && value.length > 1))
    {
        return rule(value);
    }
    return true;
}