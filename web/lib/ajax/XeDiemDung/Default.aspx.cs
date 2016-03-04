using System;
using System.Linq;
using System.Text;
using docsoft;
using docsoft.entities;
using linh.json;


public partial class lib_ajax_XeDiemDung_Default : basePage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var Id = Request["ID"];
        var XE_ID = Request["XE_ID"];
        var DIEM_ID = Request["DIEM_ID"];
        var ThuTu = Request["ThuTu"];
        var KhoangCach = Request["KhoangCach"];
        var ThoiGian = Request["ThoiGian"];
        var Di = Request["Di"];

        var loggedIn = Security.IsAuthenticated();
        var IdNull = string.IsNullOrEmpty(Id);


        switch (subAct)
        {
            case "save":

                #region save

                if (!loggedIn || !string.IsNullOrEmpty(DIEM_ID))
                {
                    Di = !string.IsNullOrEmpty(Di) ? "true" : "false";

                    var Item = IdNull ? new XeDiemDung() : XeDiemDungDal.SelectById(Convert.ToInt32(Id));
                    Item.Di = Convert.ToBoolean(Di);
                    if (!string.IsNullOrEmpty(XE_ID))
                    {
                        Item.XE_ID = Convert.ToInt32(XE_ID);
                    }
                    if (!string.IsNullOrEmpty(DIEM_ID))
                    {
                        Item.DIEM_ID = Convert.ToInt32(DIEM_ID);
                    }
                    if (!string.IsNullOrEmpty(KhoangCach))
                    {
                        Item.KhoangCach = Convert.ToInt32(KhoangCach);
                    }
                    if (!string.IsNullOrEmpty(ThuTu))
                    {
                        Item.ThuTu = Convert.ToInt32(ThuTu);
                    }
                    Item.ThoiGian = ThoiGian;

                    if (IdNull)
                    {
                        Item.RowId = Guid.NewGuid();
                    }

                    Item = IdNull ? XeDiemDungDal.Insert(Item) : XeDiemDungDal.Update(Item);
                    UpdateHanhTrinh(Item.XE_ID);
                    rendertext(Item.ID.ToString());
                }
                rendertext("0");
                break;

                #endregion
            case "saveTiny":

                #region save

                if (!loggedIn || !string.IsNullOrEmpty(DIEM_ID))
                {
                    Di = !string.IsNullOrEmpty(Di) ? "true" : "false";

                    var Item = IdNull ? new XeDiemDung() : XeDiemDungDal.SelectById(Convert.ToInt32(Id));
                    Item.Di = Convert.ToBoolean(Di);
                    if (!string.IsNullOrEmpty(XE_ID))
                    {
                        Item.XE_ID = Convert.ToInt32(XE_ID);
                    }
                    if (!string.IsNullOrEmpty(DIEM_ID))
                    {
                        Item.DIEM_ID = Convert.ToInt32(DIEM_ID);
                    }
                    if (!string.IsNullOrEmpty(KhoangCach))
                    {
                        Item.KhoangCach = Convert.ToInt32(KhoangCach);
                    }
                    if (!string.IsNullOrEmpty(ThuTu))
                    {
                        Item.ThuTu = Convert.ToInt32(ThuTu);
                    }
                    Item.ThoiGian = ThoiGian;

                    if (IdNull)
                    {
                        Item.RowId = Guid.NewGuid();
                    }

                    Item = IdNull ? XeDiemDungDal.Insert(Item) : XeDiemDungDal.Update(Item);
                    UpdateHanhTrinh(Item.XE_ID);
                    AjaxItem.Item = Item;
                    AjaxItem.Visible = true;
                }
                break;

                #endregion
            case "remove":

                #region remove

                if (loggedIn)
                {
                    var Item = XeDiemDungDal.SelectById(Convert.ToInt32(Id));
                    XeDiemDungDal.DeleteById(Item.ID);
                    rendertext("0");
                }
                rendertext("-1");
                break;
                #endregion
            case "search":
                #region search
                var pgResult = XeDiemDungDal.SelectAll();
                rendertext(JavaScriptConvert.SerializeObject(pgResult), "text/javascript");
                break;
                #endregion
            default:
                break;
        }
    }


    public void UpdateHanhTrinh(Int64 XE_ID)
    {
        var xe = XeDal.SelectById(XE_ID);
        var list = XeDiemDungDal.SelectByXeId_DiemId(xe.ID.ToString(), null);
        var listDi = list.Where(x => x.Di).ToList();
        var listDen = list.Where(x => !x.Di).ToList();

        var hanhTrinhDiStr = new StringBuilder();
        var hanhTrinhVeStr = new StringBuilder();
        foreach (var item in listDi)
        {
            hanhTrinhDiStr.AppendFormat("|{0}|-",item.DIEM_ID);
        }
        foreach (var item in listDen)
        {
            hanhTrinhVeStr.AppendFormat("|{0}|-", item.DIEM_ID);
        }


        xe.HanhTrinhDi = hanhTrinhDiStr.ToString();
        xe.HanhTrinhVe = hanhTrinhVeStr.ToString();
        xe.NgayCapNhat = DateTime.Now;
        XeDal.Update(xe);
    }
}