using System;
using docsoft;
using docsoft.entities;
using linh.json;

public partial class lib_ajax_SoDo_Default : basePage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var Id = Request["ID"];
        var Ten = Request["Ten"];
        var CssClass = Request["CssClass"];
        var RowId = Request["RowId"];
        var ThuTu = Request["ThuTu"];

        var loggedIn = Security.IsAuthenticated();
        var IdNull = string.IsNullOrEmpty(Id);

        switch (subAct)
        {
            case "save":

                #region save

                if (!loggedIn || !string.IsNullOrEmpty(Ten))
                {

                    var Item = IdNull ? new SoDo() : SoDoDal.SelectById(Convert.ToInt32(Id));
                    Item.Ten = Ten;
                    if (!string.IsNullOrEmpty(ThuTu))
                    {
                        Item.ThuTu = Convert.ToInt32(ThuTu);
                    }
                    Item.CssClass = CssClass;

                    if (IdNull)
                    {
                        Item.RowId = Guid.NewGuid();
                    }

                    Item = IdNull ? SoDoDal.Insert(Item) : SoDoDal.Update(Item);
                    rendertext(Item.ID.ToString());
                }
                rendertext("0");
                break;

                #endregion

            case "remove":

                #region remove

                if (loggedIn)
                {
                    var Item = SoDoDal.SelectById(Convert.ToInt32(Id));
                    SoDoDal.DeleteById(Item.ID);
                    rendertext("0");
                }
                rendertext("-1");
                break;
                #endregion
            case "search":
                #region search
                var pgResult = SoDoDal.SelectAll();
                rendertext(JavaScriptConvert.SerializeObject(pgResult), "text/javascript");
                break;
                #endregion
            default:
                break;
        }
    }
}