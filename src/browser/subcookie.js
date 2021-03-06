
//#require cookie.js
//#require ../text/queryString.js
	
/**
 * 获取一个子 Cookie 值。
 * @param {String} name 名字。
 * @param {String} name 子名字。
 * @returns {String} 值。
 */
function getSubCookie(name, subname) {
    var cookie = getCookie(name);
    if (!cookie) {
        return null;
    }

    cookie = QueryString.parse(cookie);
    return subname === undefined ? cookie : subname in cookie ? cookie[subname] : null;
}

/**
 * 设置一个子 Cookie 值。
 * @param {String} name 名字。
 * @param {String} value 值。
 * @param {Object} expires 过期的分钟数。
 * @param {Object} path 路径。
 * @param {Object} domain 域名。
 * @param {Object} secure 安全限制。
 * @returns {String} 返回 value。
 */
function setSubCookie(name, subname, value, expires, path, domain, secure) {
    var all = getSubCookie(name);
    if (value === null) {
        if (!all) {
            return null;
        }
        delete all[subname];
        for (subname in all) {
            subname = null;
            break;
        }
        subname && setCookie(name, null);
    } else {
        all = all || {};
        all[subname] = value;
    }
    setCookie(name, QueryString.stringify(all), expires, path, domain, secure);
    return value;
}
