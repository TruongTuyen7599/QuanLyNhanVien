
document.querySelector("#btnXacNhan").onclick = function (event) {
    // lấy thông tin người dùng
    console.log(axios);
    var nhanVien = new NhanVien();
    var validate = new Validation();
    nhanVien.tenNhanVien = document.getElementById("tenNhanVien").value;
    nhanVien.maNhanVien = document.getElementById("maNhanVien").value;
    nhanVien.loaiNhanVien = document.getElementById("loaiNhanVien").value;
    nhanVien.heSoChucVu = 2;
    nhanVien.luongCoBan = document.getElementById("luongCoBan").value;
    nhanVien.soGioLamTrongThang = document.getElementById("soGioLam").value;

    var valid = false;
    valid &= validate.kiemTraRong('#maNhanVien', 'Mã Nhan vien ', '#kiemTraRong_maNhanVien')
        & validate.kiemTraRong('#tenNhanVien', 'Tên Nhan Vien ', '#kiemTraRong_tenNhanVien');
    valid &= validate.kiemTraChu('#tenNhanVien', 'Ten Nhan vien ', '#kiemTraChu_tenNhanVien');
    if (valid) {


        // hiển thị ra giao diện
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
            method: 'POST',
            data: nhanVien,
            responseType: 'JSON'
        })

        promise.then(function (result) {
            console.log('Xử lý thành công', result.data);
            renderNhanVien();
        });

        promise.catch(function (error) {
            console.log('xử lý thất bại', error);
        })
    } else {

    }
};

//=========================================Thêm nhân viên==============

var renderTable = function (arrNhanVien) {
    console.log(arrNhanVien);
    var content = '';
    for (var i = 0; i < arrNhanVien.length
        ; i++) {

        var nhanVien = arrNhanVien[i];
        var nv = new NhanVien(nhanVien.maNhanVien, nhanVien.tenNhanVien, nhanVien.heSoChucVu,
            nhanVien.loaiNhanVien, nhanVien.luongCoBan, nhanVien.soGioLamTrongThang);

        content += `
        <tr>
          <td>${nv.maNhanVien}</td>
          <td>${nv.tenNhanVien}</td>
          <td>${nv.loaiNhanVien}</td>
          <td>${nv.luongCoBan}</td>
          <td>${nv.tinhTongLuong()}</td>
          <td>${nv.soGioLamTrongThang}</td>
          <td>${nv.xepLoai()}</td>
          <td><button class="btn btn-danger" onclick="xoaNhanVien('${nv.maNhanVien}')">Xóa</button></td>
        </tr>
        `;
    }

    document.querySelector('#tblNhanVien').innerHTML = content;
}
var renderNhanVien = function () {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
        method: 'GET',// backend cung cấp method
        responseType: 'json'// backend cung cấp dữ liệu trả về
    })
    //xử lý thành công
    promise.then(function (result) {
        console.log('1');
        // hiển thị thông tin sinh viên lên table
        renderTable(result.data);
    });

    // xử lý khi request thất bại
    promise.catch(function (err) {
        console.log('2');
    });
}

renderNhanVien();

//=========================================render==============

window.xoaNhanVien = function (maNhanVien) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNhanVien}`,
        method: 'DELETE',
        //  responseType:'JSON'
    })

    promise.then(function (result) {
        console.log('Xử lý thành công', maNhanVien);
        renderNhanVien();
    });

    promise.catch(function (error) {
        console.log('xử lý thất bại', error);
    })
}
