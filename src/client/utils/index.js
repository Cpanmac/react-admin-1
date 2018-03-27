
// import { androidLastVersion, iosLastVersion } from '../config/proData'

import { compress } from '../utils/ocr'

import 'whatwg-fetch'

const _env = process.env.NODE_ENV;

export const getDefaultSSoTicket = function () {
    //储存app信息
    if (!localStorage.appInfo) {
        YztApp.getDeviceInfo(function (status, res) {
            if (status === 'success') {
                localStorage.appInfo = JSON.stringify(res);
            }
        })
    }
    return new Promise(function (resolve, reject) {
        if (_env === 'dev') {
            let url = "http://JKKIT-FS-OAUTH-stg.paic.com.cn/jkkit-fs-oauth/sso/createssoticket.do?appKey=10000toa&requestId=1c93825e-817b-420b-979e-960a34e42682&clientNo=728681509434719061";
            let params = {
                "accessT": "peipVumdORrx3NLcdKPkUl4Mv4BRrjz/JGPIxVGRdDUHnQ86HnzFqfMU/0b4YkB/3AclZ/fLDxrLKFoz2OBijsc6SvHx5EzSlQJ98c49IQhv94n7fGgZrhpR6/+Yq1bx43oiQale7JWQ2m9zxBc/2o8dqA524h7DT19Zs4C9rl3O5a+0J33n/3DgXp/xqvYXPzOSUG+j0sHRsXyqanugCi9KjqMhbF0s8dVih9tYPZk=",
                "accessK": "SQZVWhBcxK7DkM1VrwRAhEQizak0ZXngQtESD3Gdho8C2nlDlIuGoYRChyjwgdc+BLsI/ZRW9+bkT7XABSGAWPIhn+Af40ki1igmj1J+P99goGZE2hHiqt4ZRy4HZR7qNdJMRfqMAoo6D6Y1JgJIYZJJlbzZP13uzzBVkb1jeHg=",
                "accessSign": "ZmIFXSLHSB31+9flzj3wNWEu9eW52dm5wSvgmZFFZb/SmwYVi2+37B0gfx2kvmF0v14i73/IJQwv2TxYzyZu5iz+dBTBEg+n0BqOlHWipGqKO9NCIdbeSZhBSNAiFSmxhscriSFM/ZtwLR9tOzEYDQxkD40Pt/Sdkz+Fwp9Us8c="
            };
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(req => req.json()).then(res => {
                window.ssoTicket = res.responseData.ssoTicket;
                resolve();
            });
        } else {
            H5App.getDefaultSSoTicket().then(() => {
                resolve();
            });
        }
    })
};

export const fileToImgsrc = (fileinput) => {
    return new Promise((resolve, reject) => {
        let files = fileinput.files,
            img = new Image();
        console.log(files);
        if (window.FileReader) {
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = function (e) {
                img.src = this.result;

                if (img.complete) {
                    resolve(compress(img));
                } else {
                    img.onload = () => {
                        const imgBase64Data = compress(img);
                        resolve(imgBase64Data);
                        img = null;
                    };
                }
                // resolve(this.result);
                reader = null;
            }
        } else if (window.Blob && files[0] instanceof Blob) {
            let mpImg = new MegaPixImage(files[0]);
            mpImg.render(img);
            img.onload = function (e) {
                resolve(this.src);
                img = null;
            };
        }
    });
};

export const fillDate = (str) => {
    let arr = str.split('');
    arr.splice(4, 0, '-');
    arr.splice(-2, 0, '-');
    return arr.join('');
};

export const fillZero = (n) => {
    return n < 10 ? '0' + n : '' + n;
};

export const getToday = (type) => {
    let d = new Date();
    let y = d.getFullYear(), M = d.getMonth() + 1, day = d.getDate();
    if (type) {
        return y + type + fillZero(M) + type + fillZero(day);
    }
    return y + fillZero(M) + fillZero(day);
};

export const getTheDay = (num, type) => {
    let d = new Date();
    let time = d.getTime();
    let D = new Date(time - (num) * (24 * 3600 * 1000));
    let y = D.getFullYear(), M = D.getMonth() + 1, day = D.getDate();
    if (type) {
        return y + type + fillZero(M) + type + fillZero(day);
    }
    return y + fillZero(M) + fillZero(day);
};

export const getNow = (type) => {
    let d = new Date();
    let y = d.getFullYear(), M = d.getMonth() + 1, day = d.getDate(), h = d.getHours(), m = d.getMinutes(),
        s = d.getSeconds();
    if (type) {
        return y + type + fillZero(M) + type + fillZero(day) + ':' + fillZero(h) + type + fillZero(m) + type + fillZero(s);
    }
    return y + fillZero(M) + fillZero(day) + fillZero(h) + fillZero(m) + fillZero(s);
};

const encode = encodeURIComponent;

export const toQS = (params) => {
    let paramsList = [];
    for (let key in params) {
        paramsList.push(encode(key) + "=" + encode(params[key]));
    }
    return paramsList.join("&");
};

export const addQS = (host, url, params) => {
    if (!/^(:?https?:\/)?\//.test(url)) {
        url = host + url;
    }
    const query = toQS(params);
    return query ? url + (url.indexOf("?") ? "?" : "&") + toQS(params) : url;
};

export const formatMoney = (money, n) => {
    if (!money || !(money = parseFloat(money))) {
        money = 0;
    }
    n = n > 0 && n <= 3 ? n : 2;
    money = money.toFixed(n);
    let l = money.split(".")[0].split("").reverse();
    let r = money.split(".")[1];
    let t = "";
    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
};

// 数据校验
export const verify = (data, type) => {
    let reg;
    let cData = data;
    switch (type) {
        case 'phone': // 手机号
            reg = /^1[0-9]{10}$/;
            cData = cData.replace(/[\s | -]/g,"");
            break;
        case 'verifyCode': // 六位数验证码
            reg = /^\d{6}$/;
            break;
        case 'name': // 用户名只有中英文
            reg = /^[\u4e00-\u9fa5a-zA-Z]{0,20}$/;
            break;
        default:
            return false;
    }
    return reg.test(cData);
};

/**
 * 全屏蒙版，用于阻止用户点击页面
 * @param type 'show' or 'hide'
 * 'show' 显示蒙版，用户不能点击
 * 'hide' 隐藏蒙版，用户可以点击
 */
export const preventMask = (type) => {
    let createMask = () => {
        let div = document.createElement('div');
        div.className = 'prevent-click-mask';
        document.getElementById('app').appendChild(div);
    };
    if(type === 'new') {
        createMask();
        return;
    }

    // let mask = document.querySelector('.prevent-click-mask');
    // if (!mask) {
    //     createMask();
    //     mask = document.querySelector('.prevent-click-mask');
    // }

    let appContainer = document.querySelector('.app-container');
    try {
        if(type === 'show') {
            appContainer && appContainer.classList.add('prevent-click');
            // mask.style.display = 'none';
        }
        if(type === 'hide') {
            appContainer && appContainer.classList.remove('prevent-click');
            // mask.style.display = 'show';
        }
    } catch (e) {
        console.log(e);
    }

};

/**
 * 计算产品的分期价格
 * @param productPrice 商品价格
 * @param periods 分期期数，6期，9期 12期
 */
let rule = {
    6: 0.9/100,
    9: 0.8/100,
    12: 0.7/100,
};
export const calcInstallmentPrice = (productPrice, periods = 12) => {
    productPrice = Number(productPrice);
    periods = Number(periods);
    if(isNaN(productPrice) || isNaN(periods)) return;
    return parseInt(productPrice/periods + productPrice * rule[periods]);
};

/**
 * 检查app版本信息是否符合配置
 * @returns {Promise.<TResult>}
 * true app版本是在最低版本后面的，
 * false app版本是在最低版本前面的
 */
// export const checkAppVersion = (version) => {
//
//     let app = window.YztApp,
//         _androidLastVersion = '1' + (version || androidLastVersion).replace(/\./g,''),
//         _iosLastVersion = '1' + (version || iosLastVersion).replace(/\./g,''),
//         appVersion;
//
//     return new Promise((resolve, reject) => {
//         app.getGPParams((status, data) => {
//             if (!data.appVersion) {
//                 reject('getGPParams err');
//             } else if (status === 'success') {
//                 appVersion = '1' + data.appVersion.replace(/\./g,'');
//                 resolve();
//             } else {
//                 app.showToast('获取版本信息失败！');
//                 reject('get_version_error');
//             }
//         });
//     }).then(() => {
//         let lastVersion = app.isAndroid ? _androidLastVersion : _iosLastVersion;
//         // 补齐到相同长度
//         while (appVersion.length !== lastVersion.length) {
//             if (appVersion.length > lastVersion.length)
//                 lastVersion += '0';
//             else
//                 appVersion += '0';
//         }
//         if (parseInt(appVersion) < parseInt(lastVersion)){
//             return Promise.resolve(-1);
//         } else if(parseInt(appVersion) === parseInt(lastVersion)){
//             return Promise.resolve(0);
//         } else {
//             return Promise.resolve(1);
//         }
//     })
// };
