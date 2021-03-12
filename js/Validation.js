var Validation = function () {
    this.kiemTraRong = function (selector, name, errorSelector) {
        if (document.querySelector(selector).value.trim() === '') {
            document.querySelector(errorSelector).innerHTML = name;
            return false;
        }
        document.querySelector(error_selector).innerHTML = '';
        return true;
    }
    this.kiemTraSo = function (selector, name, error_selector) {
        var regex = /^[0-9]+$/;
        // Kiểm tra định dạng return true;

        if (regex.test(document.querySelector(selector).value)) {
            document.querySelector(error_selector).innerHTML = '';
            return true;
        }
        document.querySelector(error_selector).innerHTML = name + 'phải là số';
        return false;
    }
    this.kiemTraSoNhapVao = function (selector, name, error_selector) {
        if (document.querySelector(selector).value.trim() < 1000000 || document.querySelector(selector).value.trim() > 20000000) {
            document.querySelector(error_selector).innerHTML = name + ' nhỏ hơn 20 000 000 và lớn hơn 1 000 000';
            return false;
        }
        document.querySelector(error_selector).innerHTML = '';
        return true;
    }
    this.kiemTraChu = function (selector, name, error_selector) {
        var regex =/^[A-Za-z ]++,[A-Za-z ]++$/;
        if (regex.test(document.querySelector(selector).value)) {
            document.querySelector(error_selector).innerHTML = '';
            return true;
        }
        document.querySelector(error_selector).innerHTML = name + 'phải là chữ';
        return false;
    }
    this.soGioLam = function (selector, name, error_selector) {
        if (document.querySelector(selector).value.trim() < 50 || document.querySelector(selector).value.trim() > 150) {
            document.querySelector(error_selector).innerHTML = name + ' nhỏ hơn 150 và lớn hơn 50';
            return false;
        }
        document.querySelector(error_selector).innerHTML = '';
        return true;
    }
}