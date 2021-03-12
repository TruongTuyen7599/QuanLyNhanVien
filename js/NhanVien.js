var NhanVien = function (maNV, tenNV,heSoChucVu, loaiNV, luongCoban, soGioLam) {
    this.maNhanVien = maNV;
    this.tenNhanVien = tenNV;
    this.loaiNhanVien = loaiNV;
    this.heSoChucVu = heSoChucVu;
    this.luongCoBan = luongCoban;
    this.soGioLamTrongThang = soGioLam;
    this.tinhTongLuong = function () {
        var tongLuong = (Number(this.soGioLamTrongThang) * Number(this.luongCoBan));
        return tongLuong;
    };
    this.xepLoai = function () {
        if (this.soGioLamTrongThang <= 150 && this.soGioLamTrongThang > 130) {
            return "Tốt";
        } else if (this.soGioLamTrongThang <= 130 && this.soGioLamTrongThang > 110) {
            return "Khá";
        } else if (this.soGioLamTrongThang <= 110 && this.soGioLamTrongThang > 90) {
            return "Trung Bình";
        } else if (this.soGioLamTrongThang <= 90) {
            return "Kém";
        }
    };
};