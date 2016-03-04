using System;
using System.Linq;
using docsoft;
using docsoft.entities;
using linh.json;

public partial class lib_ajax_Tuyen_Default : basePage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var loggedIn = Security.IsAuthenticated();

        var Id = Request["Id"];
        var NoiTinh = Request["NoiTinh"];
        var DI_ID = Request["DI_ID"];
        var DEN_ID = Request["DEN_ID"];

        var VeSinhLuuBen = Request["VeSinhLuuBen"];
        var HoaHongBanVe = Request["HoaHongBanVe"];

        NoiTinh = !string.IsNullOrEmpty(NoiTinh)
                      ? "true"
                      : "false";

        var Ten = Request["Ten"];
        var Inserted = string.IsNullOrEmpty(Id);
        var q = Request["q"];
        switch (subAct)
        {
            case "save":

                #region save

                if (!loggedIn || !string.IsNullOrEmpty(Ten))
                {
                    var Item = Inserted ? new Tuyen() : TuyenDal.SelectById(Convert.ToInt32(Id));
                    Item.Ten = Ten;
                    Item.NoiTinh = Convert.ToBoolean(NoiTinh);
                    Item.VeSinhLuuBen = Convert.ToDouble(VeSinhLuuBen);
                    Item.HoaHongBanVe = Convert.ToDouble(HoaHongBanVe);
                    Item.DI_ID = Convert.ToInt32(DI_ID);
                    Item.DEN_ID = Convert.ToInt32(DEN_ID);
                    if (Inserted)
                    {
                        Item.Username = Security.Username;
                        Item.NgayTao = DateTime.Now;
                        Item.RowId = Guid.NewGuid();
                    }

                    Item.NgayCapNhat = DateTime.Now;
                    Item = Inserted ? TuyenDal.Insert(Item) : TuyenDal.Update(Item);
                    rendertext(Item.ID.ToString());
                }
                rendertext("0");
                break;

                #endregion

            case "remove":

                #region remove

                if (loggedIn)
                {
                    var Item = TuyenDal.SelectById(Convert.ToInt32(Id));
                    if (Item.Username == Security.Username)
                    {
                        TuyenDal.DeleteById(Item.ID);
                        rendertext("0");
                    }
                }
                rendertext("-1");
                break;
                #endregion
            case "search":
                #region search
                var pgResult = TuyenDal.SelectAll().Where(x => x.Ten.ToLower().Contains(q)).ToList();
                rendertext(JavaScriptConvert.SerializeObject(pgResult), "text/javascript");
                break;
                #endregion
            default:
                break;
        }
    }
}