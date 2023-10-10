export const Validators = {
  name: {
    regExp: /^(([а-я]+-)*[a-я]+) +(([а-я]+-)*[a-я]+)( +(([а-я]+-)*[a-я]+))?$/i,
    validate: (str) => this.regExp.test(str),
    prettifyResult: (str) => str.replaceAll(/ {2,}/g, ' '),
  },
  group: {
    regExp: /(^(иу|ибм|мт|см|бмт|рл|э|рк|фн|л|сгн|вуц|гуимц|уц|фмоп|фоф|исот|ркт|ак|пс|рт|лт|оэ|оэп)\d\d?и?-1\d[АМБамб]?$)|(^юр-1\d$)/i,
    validate: (str) => this.regExp.test(str),
    prettifyResult: (str) => str.toUpperCase(),
  },
  tg: {
    regExp: /^((https:\/\/)?(t\.me\/)|@)?\w{5,}$/,
    validate: (str) => this.regExp.test(str),
    prettifyResult:  (str) => str.replace('https://', '').replace('t.me/', '').replace('@', ''),
  },
  vk: {
    regExp: /^(https:\/\/)?(vk\.com\/|@)?(\w+\.)*\w$/,
    validate: (str) => this.regExp.test(str),
    prettifyResult: (str) => str.replace('https://', '').replace('vk.com/', '').replace('@', ''),
  },
  email: {
    regExp: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    validate: (str) => this.regExp.test(str),
    prettifyResult: (str) => str.toLowerCase(),
  },
  phone: {
    regExp: /^((\+7)|8)[-\s.]?((\(\d\d\d\))|(\d\d\d))[-\s.]?\d\d\d[-\s.]?\d\d[-\s.]?\d\d$/,
    validate: (str) => this.regExp.test(str),
    prettifyResult: (str) => str.replace('+7', '8').replace('-', '').replace('(', '').replace(')', ''),
  },
  password: {
    regExp: /^.{6,}$/,
    validate: (str) => this.regExp.test(str),
  },
}

export function getValidatedAndPrettified(field, str) {
  if (!field.validate || field.validate(str)) {
    return field.prettifyResult ? field.prettifyResult(str) : str;
  }
  return null;
}
