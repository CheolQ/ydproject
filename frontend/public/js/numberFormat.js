Number.prototype.numberFormat = function() {
    if (this == 0)
       return 0;
    let regex = /(^[+-]?\d+)(\d{3})/;
    let nstr = (this + '');
    while (regex.test(nstr)) {
       nstr = nstr.replace(regex, '$1' + ',' + '$2');
    }
    return nstr;
 };