using System;
using System.Globalization;
using System.Linq;
using System.Net;
using docsoft;
using docsoft.entities;
using linh.common;
using linh.controls;
using linh.httpModule;
using linh.json;

public partial class lib_ajax_Booking_Default : basePage
{

    public delegate void SendEmailDelegate(string email, string title, string body);
    public void SendMailSingle(string email, string title, string body)
    {
        omail.Send(email, "LyVnxk", title, body, "gigawebhome@gmail.com", "Ly-DatHang", "25111987");
    }

    public delegate void SendSmsDelegate(string sdt, string body);
    public void SendSms(string sdt, string body)
    {
        var wc = new WebClient();

        var url =
            string.Format(
                @"http://api.smsnhanh.com/?Taikhoan=0946709969&matkhau=800585&sodienthoai={0}&noidung={1}&STT=VIP", sdt, body);
        var ret = wc.DownloadString(url);
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        var loggedIn = Security.IsAuthenticated();

        var Id = Request["ID"];
        var XE_ID = Request["XE_ID"];
        var CHIEUDI = Request["CHIEUDI"];
        var DI_ID = Request["DI_ID"];
        var DEN_ID = Request["DEN_ID"];
        var Ngay = Request["Ngay"];
        var IdNull = string.IsNullOrEmpty(Id);
        var Ten = Request["Ten"];
        var Mobile = Request["Mobile"];
        var VeStr = Request["VeStr"];
        var ChonGhe = Request["ChonGhe"];

        switch (subAct)
        {

            case "chonGhe":
                #region search

                if (!string.IsNullOrEmpty(XE_ID))
                {
                    var itemXe = XeDal.SelectById(Convert.ToInt64(XE_ID));
                    var itemDi = DiemDungDal.SelectById(Convert.ToInt32(DI_ID));
                    var itemDen = DiemDungDal.SelectById(Convert.ToInt32(DEN_ID));
                    var listGhe = GheDal.SelectBySoDo(itemXe.SODO_ID.ToString());
                    var itemSoDo = SoDoDal.SelectById(itemXe.SODO_ID);

                    DatVe_ChonCho.ItemSoDo = itemSoDo;
                    DatVe_ChonCho.ItemXe = itemXe;
                    DatVe_ChonCho.Di = itemDi;
                    DatVe_ChonCho.Den = itemDen;
                    DatVe_ChonCho.ListGhe = listGhe;
                    DatVe_ChonCho.Visible = true;                    
                }
                
                break;
                #endregion
            case "datVe-web":
                #region search

                if (!string.IsNullOrEmpty(XE_ID))
                {
                    var itemXe = XeDal.SelectById(Convert.ToInt64(XE_ID));
                    var itemDi = DiemDungDal.SelectById(Convert.ToInt32(DI_ID));
                    var itemDen = DiemDungDal.SelectById(Convert.ToInt32(DEN_ID));
                    var listGhe = GheDal.SelectBySoDo(itemXe.SODO_ID.ToString());
                    var itemSoDo = SoDoDal.SelectById(itemXe.SODO_ID);

                    // Check hành trình
                    var hanhTrinh = HanhTrinhDal.SelectCurrentHanhTrinh(itemXe.ID, Convert.ToBoolean(CHIEUDI), Ngay);

                    var veStr = VeStr.Split(new char[] { ',' }).Where(x => !string.IsNullOrEmpty(x)).ToList();

                    // Check khách hàng cũ
                    var oldKhach = KhachHangDal.SelectByMobile(Mobile).ID != 0;
                    
                    var datVe = new DatVe
                    {
                        XE_ID = itemXe.ID,
                        DI_ID = itemDi.ID,
                        DEN_ID = itemDen.ID,
                        Gia = itemXe.GiaVe * veStr.Count,
                        HT_ID = hanhTrinh.ID,
                        Mobile = Mobile,
                        Ten = Ten,
                        MaVe = CaptchaImage.GenerateRandomCode(CaptchaType.AlphaNumeric, 6),
                        ChonGhe = Convert.ToBoolean(ChonGhe),
                        Ngay = Convert.ToDateTime(Ngay,new CultureInfo("vi-Vn")),
                        NgayTao = DateTime.Now
                    };
                    if (!datVe.ChonGhe)
                    {
                        datVe.Gia = itemXe.GiaVe;
                    }
                    datVe = DatVeDal.Insert(datVe);


                    if (datVe.ChonGhe)
                    {
                        foreach (var ve in veStr)
                        {
                            DatVeChiTietDal.Insert(new DatVeChiTiet()
                            {
                                DATVE_ID = datVe.ID
                                ,
                                GHE_ID = Convert.ToInt32(ve)
                                ,
                                Gia = itemXe.GiaVe
                                ,
                                NgayTao = DateTime.Now
                                ,
                                NgayCapNhat = DateTime.Now
                            });
                        }
                    }
                    else
                    {
                        DatVeChiTietDal.Insert(new DatVeChiTiet()
                        {
                            DATVE_ID = datVe.ID
                            ,
                            GHE_ID = 0
                            ,
                            Gia = itemXe.GiaVe
                            ,
                            NgayTao = DateTime.Now
                            ,
                            NgayCapNhat = DateTime.Now
                        });
                    }

                    var bodySms =
                            string.Format("Bx NGHE AN: DAT VE. MA SO: {0}: {1}-{2}. Chi tiet: http://192.168.1.7/v/{0} .CAM ON QUY KHACH!", datVe.MaVe
                            , BoDau1(itemDi.Ten), BoDau1(itemDen.Ten));

                    if (!string.IsNullOrEmpty(datVe.Mobile.Replace(" ", "").Replace(".", "")))
                    {
                        var deleSms = new SendSmsDelegate(SendSms);
                        deleSms.BeginInvoke(datVe.Mobile, bodySms, null, null);
                        bodySms = string.Format("DATVE: {5} {0} {1}. {2}-{3} ngay {4}"
                            , datVe.Ten, datVe.Mobile
                            , BoDau1(itemDi.Ten), BoDau1(itemDen.Ten)
                            , Ngay
                            , datVe.MaVe
                            );
                        //deleSms.BeginInvoke("0988610888", bodySms, null, null);
                    }

                    rendertext(datVe.MaVe.ToString());
                }

                break;
                #endregion
            case "datVe-quanLy":
                #region search

                if (!string.IsNullOrEmpty(XE_ID))
                {
                    var itemXe = XeDal.SelectById(Convert.ToInt64(XE_ID));
                    var itemDi = DiemDungDal.SelectById(Convert.ToInt32(DI_ID));
                    var itemDen = DiemDungDal.SelectById(Convert.ToInt32(DEN_ID));
                    var listGhe = GheDal.SelectBySoDo(itemXe.SODO_ID.ToString());
                    var itemSoDo = SoDoDal.SelectById(itemXe.SODO_ID);

                    // Check hành trình
                    var hanhTrinh = HanhTrinhDal.SelectCurrentHanhTrinh(itemXe.ID, Convert.ToBoolean(CHIEUDI), Ngay);

                    var veStr = VeStr.Split(new char[] { ',' }).Where(x => !string.IsNullOrEmpty(x)).ToList();

                    // Check khách hàng cũ
                    var oldKhach = KhachHangDal.SelectByMobile(Mobile).ID != 0;

                    var datVe = new DatVe
                    {
                        XE_ID = itemXe.ID,
                        DI_ID = itemDi.ID,
                        DEN_ID = itemDen.ID,
                        Gia = itemXe.GiaVe * veStr.Count,
                        HT_ID = hanhTrinh.ID,
                        Mobile = Mobile,
                        Ten = Ten,
                        ThanhToan = true,
                        NgayThanhToan = DateTime.Now,
                        MaVe = CaptchaImage.GenerateRandomCode(CaptchaType.AlphaNumeric, 6),
                        ChonGhe = Convert.ToBoolean(ChonGhe),
                        Ngay = Convert.ToDateTime(Ngay, new CultureInfo("vi-Vn")),
                        NgayTao = DateTime.Now,
                        NhanVien = Security.Username,
                        NguoiTao = Security.Username                        
                    };
                    if (!datVe.ChonGhe)
                    {
                        datVe.Gia = itemXe.GiaVe;
                    }
                    datVe = DatVeDal.Insert(datVe);


                    if (datVe.ChonGhe)
                    {
                        foreach (var ve in veStr)
                        {
                            DatVeChiTietDal.Insert(new DatVeChiTiet()
                            {
                                DATVE_ID = datVe.ID
                                ,
                                GHE_ID = Convert.ToInt32(ve)
                                ,
                                Gia = itemXe.GiaVe
                                ,
                                NgayTao = DateTime.Now
                                ,
                                NgayCapNhat = DateTime.Now
                            });
                        }
                    }
                    else
                    {
                        DatVeChiTietDal.Insert(new DatVeChiTiet()
                        {
                            DATVE_ID = datVe.ID
                            ,
                            GHE_ID = 0
                            ,
                            Gia = itemXe.GiaVe
                            ,
                            NgayTao = DateTime.Now
                            ,
                            NgayCapNhat = DateTime.Now
                        });
                    }

                   

                    var bodySms =
                           string.Format("Bx NGHE AN: DAT VE THANH CONG. MA VE: {0}: {1}-{2}. Chi tiet: http://192.168.1.7/v/{0} .CAM ON QUY KHACH!", datVe.MaVe
                           , BoDau1(itemDi.Ten), BoDau1(itemDen.Ten));

                    if (!string.IsNullOrEmpty(datVe.Mobile.Replace(" ", "").Replace(".", "")))
                    {
                        var deleSms = new SendSmsDelegate(SendSms);
                        deleSms.BeginInvoke(datVe.Mobile, bodySms, null, null);
                        bodySms = string.Format("DATVE: {5} {0} {1}. {2}-{3} ngay {4}"
                            , datVe.Ten, datVe.Mobile
                            , BoDau1(itemDi.Ten), BoDau1(itemDen.Ten)
                            , Ngay
                            , datVe.MaVe
                            );
                        //deleSms.BeginInvoke("0988610888", bodySms, null, null);
                    }

                    rendertext(datVe.MaVe.ToString());
                }

                break;
                #endregion
            default:
                break;
        }
    }
    public string BoDau1(string input)
    {
        input = Lib.Bodau(input);
        return input.Replace("-", " ").ToLower();
    }
}