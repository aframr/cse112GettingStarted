function isValidDate(t){if("string"!=typeof t)return!1;var e=t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);if(null==e&&null==(e=t.match(/^(\d{1,2})\-(\d{1,2})\-(\d{4})$/)))return!1;var a=[31,28,31,30,31,30,31,31,30,31,30,31],r=(t.split("/"),e[3]),i=e[1],n=e[2];return console.log(i+"/"+n+"/"+r),!(r<0||n<=0||i<=0||i>12)&&(r%4==0&&(r%100!=0?a[1]=29:r%100==0&&r%400==0&&(a[1]=29)),n<=a[i-1])}function formatDate(t){if("string"!=typeof t)return"Invalid Date";if(!isValidDate(t))return"Invalid Date";var e=t.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/),a=e[3],r=e[1];return e[2]+"/"+r+"/"+a}"undefined"!=typeof module&&null!=module.exports&&(exports.isValidDate=isValidDate,exports.formatDate=formatDate);