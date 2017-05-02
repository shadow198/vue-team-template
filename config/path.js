export const root_path = './';
export const back_root = (function () {
    var i = root_path.match(/\//g).length;
    var j=i,t='';
    while (j>0){
        t+='../';
        j--;
    }
    return t
})();
