using System;
using System.Linq;
using docsoft;
using docsoft.entities;
using linh.common;
using linh.json;


public partial class lib_ajax_DiemDung_Default : basePage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var loggedIn = Security.IsAuthenticated();

        var Id = Request["ID"];
        var TINH_ID = Request["TINH_ID"];
        var Ben = Request["Ben"];
        var Ten = Request["Ten"];
        var IdNull = string.IsNullOrEmpty(Id);
        var q = Request["q"];
        switch (subAct)
        {
            case "save":

                #region save

                if (!loggedIn || !string.IsNullOrEmpty(Ten))
                {
                    Ben = !string.IsNullOrEmpty(Ben) ? "true" : "false";

                    var Item = IdNull ? new DiemDung() : DiemDungDal.SelectById(Convert.ToInt32(Id));
                    Item.Ten = Ten;
                    Item.Ben = Convert.ToBoolean(Ben);
                    Item.TINH_ID = new Guid(TINH_ID);
                    if (IdNull)
                    {
                        Item.RowId = Guid.NewGuid();
                    }

                    

                    Item = IdNull ? DiemDungDal.Insert(Item) : DiemDungDal.Update(Item);
                    rendertext(Item.ID.ToString());
                }
                rendertext("0");
                break;

                #endregion

            case "remove":

                #region remove

                if (loggedIn)
                {
                    var Item = DiemDungDal.SelectById(Convert.ToInt32(Id));
                    DiemDungDal.DeleteById(Item.ID);
                    rendertext("0");
                }
                rendertext("-1");
                break;
                #endregion
            case "search":
                #region search
                q = BoDau1(q);
                var rsList = string.IsNullOrEmpty(TINH_ID)
                    ? DiemDungDal.SelectAll().Where(x => BoDau1(x.Ten).Contains(q)).ToList()
                    : DiemDungDal.SelectAll().Where(x => x.TINH_ID == new Guid(TINH_ID)).Where(x => BoDau1(x.Ten).Contains(q)).ToList();
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