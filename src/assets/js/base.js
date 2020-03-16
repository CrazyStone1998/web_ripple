exports.install = function (Vue, options) {

    console.log(options);

    Vue.prototype.mouseOverGlobal = function () {
        alert('this is mouse over global');

    };

    Vue.prototype.mouseOutGlobal = function () {
        alert('this is mouse out global');
    };

};