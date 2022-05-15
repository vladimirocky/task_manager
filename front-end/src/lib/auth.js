class Auth {

  constructor() {
    this.token = this.getCookie()
  }

  setCookie(name, value, options = {}) {

    options = {
      path: '/',
      // при необходимости добавьте другие значения по умолчанию
      ...options
    };

    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
    this.token = value
    document.cookie = updatedCookie;
  }

  getCookie(name= 'token') {
    let matches = document.cookie.match(new RegExp(
      // eslint-disable-next-line
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  deleteCookie(name = 'token') {
    this.token = null
    this.setCookie(name, "", {
      'max-age': -1
    })
  }
}

export default new Auth()
