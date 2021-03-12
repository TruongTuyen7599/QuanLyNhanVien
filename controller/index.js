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
  valid &=
    validate.kiemTraRong(
      "#maNhanVien",
      "Mã Nhan vien ",
      "#kiemTraRong_maNhanVien"
    ) &
    validate.kiemTraRong(
      "#tenNhanVien",
      "Tên Nhan Vien ",
      "#kiemTraRong_tenNhanVien"
    );
  valid &= validate.kiemTraChu(
    "#tenNhanVien",
    "Ten Nhan vien ",
    "#kiemTraChu_tenNhanVien"
  );
  valid = validate.kiemTraSoNhapVao(
    "#luongCoBan",
    "luong co ban",
    "#kiemTraSoNhapVao_luongCoBan"
  );
  valid = validate.soGioLam("#soGioLam", "so gio lam", "#kiemTraSoGioLam");
  if (valid) {
    // hiển thị ra giao diện
    var promise = axios({
      url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien",
      method: "POST",
      data: nhanVien,
      responseType: "JSON",
    });

    promise.then(function (result) {
      console.log("Xử lý thành công", result.data);
      renderNhanVien();
    });

    promise.catch(function (error) {
      console.log("xử lý thất bại", error);
    });
  } else {
    return;
  }
};

//=========================================Thêm nhân viên==============

var renderTable = function (arrNhanVien) {
  console.log(arrNhanVien);
  var content = "";
  for (var i = 0; i < arrNhanVien.length; i++) {
    var nhanVien = arrNhanVien[i];
    var nv = new NhanVien(
      nhanVien.maNhanVien,
      nhanVien.tenNhanVien,
      nhanVien.heSoChucVu,
      nhanVien.loaiNhanVien,
      nhanVien.luongCoBan,
      nhanVien.soGioLamTrongThang
    );

    content += `
        <tr>
          <td>${nv.maNhanVien}</td>
          <td>${nv.tenNhanVien}</td>
          <td>${nv.loaiNhanVien}</td>
          <td>${nv.luongCoBan}</td>
          <td>${nv.tinhTongLuong()}</td>
          <td>${nv.soGioLamTrongThang}</td>
          <td>${nv.xepLoai()}</td>
          <td>
            <button class="btn btn-danger" onclick="xoaNhanVien('${
              nv.maNhanVien
            }')">Xóa</button>
            <button class="btn btn-danger" id="updateNhanVien" onclick="capNhatNhanVien('${
              nv.maNhanVien
            }')">Cập nhật</button>
          </td>
        </tr>
        `;
  }

  document.querySelector("#tblNhanVien").innerHTML = content;
};
var renderNhanVien = function () {
  var promise = axios({
    url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien",
    method: "GET", // backend cung cấp method
    responseType: "json", // backend cung cấp dữ liệu trả về
  });
  //xử lý thành công
  promise.then(function (result) {
    console.log("1");
    // hiển thị thông tin sinh viên lên table
    renderTable(result.data);
  });

  // xử lý khi request thất bại
  promise.catch(function (err) {
    console.log("2");
  });
};

renderNhanVien();

//=========================================render==============

window.xoaNhanVien = function (maNhanVien) {
  var promise = axios({
    url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNhanVien}`,
    method: "DELETE",
    //  responseType:'JSON'
  });

  promise.then(function (result) {
    console.log("Xử lý thành công", maNhanVien);
    renderNhanVien();
  });

  promise.catch(function (error) {
    console.log("xử lý thất bại", error);
  });
};

window.capNhatNhanVien = function (maNhanVien) {
  var promise = axios({
    url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNhanVien}`,
    method: "GET",
  });

  promise.then(function (result) {
    console.log("Xử lý thành công", result.data);

    var arrOption = document.querySelector("#loaiNhanVien").options;
    var slChucVu = document.querySelector("#loaiNhanVien");
    var nv = result.data;

    document.querySelector("#maNhanVien").value = nv.maNhanVien;
    document.querySelector("#tenNhanVien").value = nv.tenNhanVien;
    arrOption[slChucVu.selectedIndex].innerHTML = nv.chucVu;
    document.querySelector("#luongCoBan").value = nv.luongCoBan;
    document.querySelector("#soGioLam").value = nv.soGioLamTrongThang;
    renderNhanVien();
  });

  promise.catch(function (error) {
    console.log(error);
  });
};

document.querySelector("#updateNhanVien").onclick = function () {
  var nhanVien = new NhanVien();
  var arrOption = document.querySelector("#loaiNhanVien").options;
  var slChucVu = document.querySelector("#loaiNhanVien");

  nhanVien.maNhanVien = document.querySelector("#maNhanVien").value;
  nhanVien.tenNhanVien = document.querySelector("#tenNhanVien").value;
  nhanVien.chucVu = arrOption[slChucVu.selectedIndex].innerHTML;
  nhanVien.heSoChucVu = document.querySelector("#loaiNhanVien").value;
  nhanVien.luongCoBan = document.querySelector("#luongCoBan").value;
  nhanVien.tinhTongLuong();
  nhanVien.soGioLamTrongThang = document.querySelector("#soGioLam").value;
  nhanVien.xepLoai();

  var promise = axios({
    url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${nhanVien.maNhanVien}`,
    method: "PUT",
    data: nhanVien,
  });

  promise.then(function (result) {
    renderNhanVien();
  });
  // Xử lý thất bại
  promise.catch(function (error) {
    console.log(error.reponse.data);
  });
};
