using System;
using System.Globalization;
using System.Linq;
using System.Net;
using docsoft;
using docsoft.entities;
using linh.common;
using linh.json;

public partial class lib_ajax_DatVe_Default : basePage
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
        var Id = Request["ID"];
        var HT_ID = Request["HT_ID"];
        var XE_ID = Request["XE_ID"];
        var Ngay = Request["Ngay"];
        var Ma = Request["Ma"];
        var MaVe = Request["MaVe"];
        var Ten = Request["Ten"];
        var Mobile = Request["Mobile"];
        var DI_ID = Request["DI_ID"];
        var DEN_ID = Request["DEN_ID"];
        var Gia = Request["Gia"];
        var ChonGhe = Request["ChonGhe"];
        var TT_ID = Request["TT_ID"];
        var ThanhToan = Request["ThanhToan"];
        var NgayThanhToan = Request["NgayThanhToan"];
        var Huy = Request["Huy"];
        var NhanVien = Request["NhanVien"];
        var Readed = Request["Readed"];
        var q = Request["q"];
        var IdNull = string.IsNullOrEmpty(Id);
        var loggedIn = Security.IsAuthenticated();

        ChonGhe = string.IsNullOrEmpty(ChonGhe) ? "false" : "true";
        ThanhToan = string.IsNullOrEmpty(ThanhToan) ? "false" : "true";
        Readed = string.IsNullOrEmpty(Readed) ? "false" : "true";
        Huy = string.IsNullOrEmpty(Huy) ? "false" : "true";

        switch (subAct)
        {
            case "save":

                #region save

                if (!loggedIn || !string.IsNullOrEmpty(Ten))
                {

                    var Item = IdNull ? new DatVe() : DatVeDal.SelectById(Convert.ToInt64(Id));

                    if (!string.IsNullOrEmpty(HT_ID))
                    {
                        Item.HT_ID = Convert.ToInt64(HT_ID);
                    }
                    if (!string.IsNullOrEmpty(XE_ID))
                    {
                        Item.XE_ID = Convert.ToInt64(XE_ID);
                    }
                    if (!string.IsNullOrEmpty(Ngay))
                    {
                        Item.Ngay = Convert.ToDateTime(Ngay, new CultureInfo("vi-Vn"));
                    }
                    if (!string.IsNullOrEmpty(Ma))
                    {
                        Item.Ma = Convert.ToInt64(Ma);
                    }
                    Item.Ten = Ten;
                    Item.Mobile = Mobile;
                    Item.MaVe = MaVe;
                    Item.NguoiTao = Security.Username;
                    Item.MaVe = MaVe;
                    if (!string.IsNullOrEmpty(DI_ID))
                    {
                        Item.DI_ID = Convert.ToInt32(DI_ID);
                    }
                    if (!string.IsNullOrEmpty(DEN_ID))
                    {
                        Item.DEN_ID = Convert.ToInt32(DEN_ID);
                    }
                    if (!string.IsNullOrEmpty(Gia))
                    {
                        Item.Gia = Convert.ToDouble(Gia);
                    }
                    if (!string.IsNullOrEmpty(TT_ID))
                    {
                        Item.TT_ID = new Guid(TT_ID);
                    }
                    Item.ChonGhe = Convert.ToBoolean(ChonGhe);
                    Item.ThanhToan = Convert.ToBoolean(ThanhToan);
                    Item.Readed = Convert.ToBoolean(Readed);
                    Item.Huy = Convert.ToBoolean(Huy);
                    Item.NhanVien = NhanVien;


                    Item = IdNull ? DatVeDal.Insert(Item) : DatVeDal.Update(Item);
                    rendertext(Item.ID.ToString());
                }
                rendertext("0");
                break;

                #endregion

            case "remove":

                #region remove

                if (loggedIn)
                {
                    var Item = DatVeDal.SelectById(Convert.ToInt32(Id));
                    DatVeDal.DeleteById(Item.ID);
                    rendertext("0");
                }
                rendertext("-1");
                break;

                #endregion

            case "thanhtoan":

                #region remove

                if (loggedIn)
                {
                    var item = DatVeDal.SelectById(Convert.ToInt32(Id));
                    item.ThanhToan = true;
                    item.NgayThanhToan = DateTime.Now;
                    item.NgayCapNhat = DateTime.Now;
                    item.NguoiCapNhat = Security.Username;
                    DatVeDal.Update(item);

                    var datVeChiTiet = DatVeChiTietDal.SelectByDvId(item.ID);

                    var hanhTrinh = HanhTrinhDal.SelectById(item.HT_ID);
                    hanhTrinh.Khach += datVeChiTiet.Count;
                    HanhTrinhDal.Update(hanhTrinh);


                    var itemDi = DiemDungDal.SelectById(item.DI_ID);
                    var itemDen = DiemDungDal.SelectById(item.DI_ID);
                    var bodySms =
                            string.Format("Bx NGHE AN: THANH TOAN THANH CONG. MA VE: {0}: {1}-{2}. Chi tiet: http://192.168.1.7/v/{0} .CAM ON QUY KHACH!", item.MaVe
                            , BoDau1(itemDi.Ten), BoDau1(itemDen.Ten));

                    if (!string.IsNullOrEmpty(item.Mobile.Replace(" ", "").Replace(".", "")))
                    {
                        var deleSms = new SendSmsDelegate(SendSms);
                        deleSms.BeginInvoke(item.Mobile, bodySms, null, null);
                    }

                    rendertext("0");
                }
                rendertext("-1");
                break;

                #endregion

            case "search":

                #region search

                var rsList = DatVeDal.pagerNormal("", false, null, q, 20, null).List;
                rendertext(JavaScriptConvert.SerializeObject(rsList), "text/javascript");
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