﻿using System;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading;
using docsoft;
using docsoft.entities;
using linh.json;


public partial class lib_ajax_Xe_Default : basePage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var loggedIn = Security.IsAuthenticated();

        var Id = Request["Id"];
        var BienSo_Chu = Request["BienSo_Chu"];
        var BienSo_So = Request["BienSo_So"];
        var LOAIXE_ID = Request["LOAIXE_ID"];
        var TUYEN_ID = Request["TUYEN_ID"];
        var DONVI_ID = Request["DONVI_ID"];

        var LOAIXE_Ten = Request["LOAIXE_Ten"];
        var TUYEN_Ten = Request["TUYEN_Ten"];
        var DONVI_Ten = Request["DONVI_Ten"];
        var NamSanXuat = Request["NamSanXuat"];
        var NgayXuatBen = Request["NgayXuatBen"];
        var TuyenCoDinh = Request["TuyenCoDinh"];
        var LuuHanh = Request["LuuHanh"];
        var Ghe = Request["Ghe"];
        var SoKhach = Request["SoKhach"];
        var MucPhi = Request["MucPhi"];
        var GiaVe = Request["GiaVe"];
        var GioXuatBen = Request["GioXuatBen"];
        var XeVangLai = Request["XeVangLai"];
        var XeTai = Request["XeTai"];
        var BaoHiem = Request["BaoHiem"];
        var BIEUDO_ID = Request["BIEUDO_ID"];
        var ChuaDangKy = Request["ChuaDangKy"];
        var Khoa = Request["Khoa"];
        var XVB_ID = Request["XVB_ID"];

        var NgayKyGuiBanVe = Request["NgayKyGuiBanVe"];
        var KyGuiBanVe = Request["KyGuiBanVe"];
        var ChapThuanTuyen_SoChuyen = Request["ChapThuanTuyen_SoChuyen"];


        var SODO_ID = Request["SODO_ID"];
        var DI_GioXuatBen = Request["DI_GioXuatBen"];
        var DI_GioDen = Request["DI_GioDen"];
        var DEN_GioXuatBen = Request["DEN_GioXuatBen"];
        var DEN_GioDen = Request["DEN_GioDen"];

        var DanhGia_Luot = Request["DanhGia_Luot"];
        var DanhGia_Diem = Request["DanhGia_Diem"];

        var q = Request["q"];
        var ChonGhe = Request["ChonGhe"];
        //For search
        var VangLai = Request["XeVangLai"];

        var TIENICH_Wifi = Request["TIENICH_Wifi"];
        var TIENICH_Chan = Request["TIENICH_Chan"];
        var TIENICH_Wc = Request["TIENICH_Wc"];
        var TIENICH_Tivi = Request["TIENICH_Tivi"];
        var TIENICH_AnNhe = Request["TIENICH_AnNhe"];
        var TIENICH_Nuoc = Request["TIENICH_Nuoc"];


        TIENICH_Wifi = !string.IsNullOrEmpty(TIENICH_Wifi)
                      ? "true"
                      : "false";
        TIENICH_Chan = !string.IsNullOrEmpty(TIENICH_Chan)
                      ? "true"
                      : "false";
        TIENICH_Wc = !string.IsNullOrEmpty(TIENICH_Wc)
                      ? "true"
                      : "false";
        TIENICH_Tivi = !string.IsNullOrEmpty(TIENICH_Tivi)
                      ? "true"
                      : "false";
        TIENICH_AnNhe = !string.IsNullOrEmpty(TIENICH_AnNhe)
                      ? "true"
                      : "false";
        TIENICH_Nuoc = !string.IsNullOrEmpty(TIENICH_Nuoc)
                      ? "true"
                      : "false";


        KyGuiBanVe = !string.IsNullOrEmpty(KyGuiBanVe)
                      ? "true"
                      : "false";
        ChonGhe = !string.IsNullOrEmpty(ChonGhe)
                      ? "true"
                      : "false";

        XeVangLai = !string.IsNullOrEmpty(XeVangLai)
                      ? "true"
                      : "false";

        XeTai = !string.IsNullOrEmpty(XeTai)
                      ? "true"
                      : "false";

        Khoa = !string.IsNullOrEmpty(Khoa)
                      ? "true"
                      : "false";

        ChuaDangKy = !string.IsNullOrEmpty(ChuaDangKy)
                      ? "true"
                      : "false";

        var Inserted = string.IsNullOrEmpty(Id);

        var Anh = Request["Anh"];
        var Anh1 = Request["Anh1"];
        var Anh2 = Request["Anh2"];
        var Anh3 = Request["Anh3"];
        var Anh4 = Request["Anh4"];
        var Anh5 = Request["Anh5"];

        switch (subAct)
        {
            case "save":
                #region save

                if (!loggedIn || !string.IsNullOrEmpty(BienSo_Chu) || !string.IsNullOrEmpty(BienSo_So))
                {
                    var Item = Inserted ? new Xe() : XeDal.SelectById(Convert.ToInt32(Id));

                    Item.BienSo_Chu = BienSo_Chu;
                    Item.BienSo_So = BienSo_So;
                    Item.LOAIXE_ID = Convert.ToInt32(LOAIXE_ID);
                    Item.TUYEN_ID = Convert.ToInt32(TUYEN_ID);
                    Item.DONVI_ID = Convert.ToInt32(DONVI_ID);
                    if (!string.IsNullOrEmpty(TuyenCoDinh))
                    {
                        Item.TuyenCoDinh = Convert.ToDateTime(TuyenCoDinh, new CultureInfo("vi-vn"));                        
                    }
                    if (!string.IsNullOrEmpty(LuuHanh))
                    {
                        Item.LuuHanh = Convert.ToDateTime(LuuHanh, new CultureInfo("vi-vn"));
                    }
                    if (!string.IsNullOrEmpty(BaoHiem))
                    {
                        Item.BaoHiem = Convert.ToDateTime(BaoHiem, new CultureInfo("vi-vn"));
                    }
                    if (!string.IsNullOrEmpty(NgayKyGuiBanVe))
                    {
                        Item.NgayKyGuiBanVe = Convert.ToDateTime(NgayKyGuiBanVe, new CultureInfo("vi-vn"));
                    }
                    if (!string.IsNullOrEmpty(ChapThuanTuyen_SoChuyen))
                    {
                        Item.ChapThuanTuyen_SoChuyen = Convert.ToInt16(ChapThuanTuyen_SoChuyen);
                    }
                    Item.Anh = Anh;
                    Item.Anh1 = Anh1;
                    Item.Anh2 = Anh2;
                    Item.Anh3 = Anh3;
                    Item.Anh4 = Anh4;
                    Item.Anh5 = Anh5;
                    Item.Ghe = Convert.ToInt16(Ghe);
                    Item.SoKhach = Convert.ToInt16(SoKhach);
                    Item.MucPhi = Convert.ToDouble(MucPhi);
                    Item.GiaVe = Convert.ToDouble(GiaVe.Replace(",", ""));
                    Item.NamSanXuat = Convert.ToInt16(NamSanXuat);
                    Item.GioXuatBen = GioXuatBen;
                    Item.BIEUDO_ID = Convert.ToInt32(BIEUDO_ID);

                    Item.DI_GioXuatBen = DI_GioXuatBen;
                    Item.DI_GioDen = DI_GioDen;
                    Item.DEN_GioXuatBen = DEN_GioXuatBen;
                    Item.DEN_GioDen = DEN_GioDen;

                    if (!string.IsNullOrEmpty(SODO_ID))
                    {
                        Item.SODO_ID = Convert.ToInt32(SODO_ID);
                    }

                    if (!string.IsNullOrEmpty(DanhGia_Diem))
                    {
                        Item.DanhGia_Diem = Convert.ToInt32(DanhGia_Diem);
                    }
                    if (!string.IsNullOrEmpty(DanhGia_Luot))
                    {
                        Item.DanhGia_Luot = Convert.ToInt32(DanhGia_Luot);
                    }

                    Item.XeTai = Convert.ToBoolean(XeTai);
                    Item.XeVangLai = Convert.ToBoolean(XeVangLai);
                    Item.Khoa = Convert.ToBoolean(Khoa);
                    Item.KyGuiBanVe = Convert.ToBoolean(KyGuiBanVe);
                    Item.ChonGhe = Convert.ToBoolean(ChonGhe);


                    Item.TIENICH_AnNhe = Convert.ToBoolean(TIENICH_AnNhe);
                    Item.TIENICH_Chan = Convert.ToBoolean(TIENICH_Chan);
                    Item.TIENICH_Nuoc = Convert.ToBoolean(TIENICH_Nuoc);
                    Item.TIENICH_Tivi = Convert.ToBoolean(TIENICH_Tivi);
                    Item.TIENICH_Wc = Convert.ToBoolean(TIENICH_Wc);
                    Item.TIENICH_Wifi = Convert.ToBoolean(TIENICH_Wifi);

                    if(Item.ID != 0 && Item.ChuaDangKy && Convert.ToBoolean(ChuaDangKy)) // Đăng ký mới lần đầu
                    {
                        XeVaoBenDal.UpdateXeChuaDangKy(Item.ID);
                    }

                    Item.ChuaDangKy = !Convert.ToBoolean(ChuaDangKy);
                    if (Inserted)
                    {
                        Item.Username = Security.Username;
                        Item.NgayTao = DateTime.Now;
                        Item.RowId = Guid.NewGuid();
                        //SearchManager.Add(string.Format("{0} {1}", Item.BienSo_Chu, Item.BienSo_So)
                        //    , string.Format("{0} {1} {2} {3} {4}", Item.BienSo_Chu, Item.BienSo_So, DONVI_Ten, TUYEN_Ten, LOAIXE_Ten)
                        //    , string.Format("{0} {1}", Item.BienSo_Chu, Item.BienSo_So)
                        //    , Item.RowId.ToString()
                        //    , Item.Url
                        //    , typeof(Xe).Name);
                    }

                    Item.NgayCapNhat = DateTime.Now;
                    Item = Inserted ? XeDal.Insert(Item) : XeDal.Update(Item);
                    rendertext(Item.ID.ToString());
                }
                rendertext("0");
                break;

                #endregion
            case "remove":
                #region remove
                if (loggedIn)
                {
                    var Item = XeDal.SelectById(Convert.ToInt32(Id));
                    if (Item.Username == Security.Username)
                    {
                        XeDal.DeleteById(Item.ID);
                        rendertext("0");
                    }
                }
                rendertext("-1");
                break;
                #endregion
            case "GetById":
                #region GetById
                if (!string.IsNullOrEmpty(Id))
                {
                    var Item = XeDal.SelectById(Convert.ToInt32(Id));
                    Item.Tuyen = TuyenDal.SelectById(Item.TUYEN_ID);
                    Item.LoaiBieuDo = LoaiBieuDoDal.SelectById(Item.BIEUDO_ID);
                    Item.LaiXe = LaiXeDal.SelectByXeId(Item.ID);
                    
                    var ngay = DateTime.Now;
                    if(!string.IsNullOrEmpty(NgayXuatBen))
                    {
                        ngay = Convert.ToDateTime(ngay, new CultureInfo("Vi-vn"));
                    }
                    var ngaySoSanh = ngay.AddDays(BxVinhConfig.SoNgayHetHan);
                    Item.HopLeAll = (ngaySoSanh < Item.BaoHiem) && (ngaySoSanh < Item.LuuHanh) &&
                                    (ngaySoSanh < Item.BaoHiem);

                    if(!string.IsNullOrEmpty(XVB_ID))
                    {
                        var xvb = XeVaoBenDal.SelectById(Convert.ToInt64(XVB_ID));
                        xvb.TrangThai = 300;
                        xvb.NguoiXuLyYeuCau = Security.Username;
                        xvb.NgayXuLyYeuCau = xvb.NgayCapNhat = DateTime.Now;
                        xvb = XeVaoBenDal.Update(xvb);
                    }

                    rendertext(string.Format("({0})", JavaScriptConvert.SerializeObject(Item)));
                }
                rendertext("-1");
                break;
                #endregion
            case "search":
                #region search
                var pgResult = XeTinyDal.SearchSQL(q, VangLai);
                rendertext(JavaScriptConvert.SerializeObject(pgResult), "text/javascript");
                break;
                #endregion
            default:
                break;
        }
    }
}