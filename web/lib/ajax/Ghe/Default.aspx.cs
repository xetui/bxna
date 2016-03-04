using System;
using docsoft;
using docsoft.entities;
using linh.json;

public partial class lib_ajax_Ghe_Default : basePage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var Id = Request["ID"];
        var SoDo = Request["SoDo"];
        var Tang = Request["Tang"];
        var Ma = Request["Ma"];
        var ThuTu = Request["ThuTu"];
        var CssClass = Request["CssClass"];
        var RowId = Request["RowId"];

        var loggedIn = Security.IsAuthenticated();
        var IdNull = string.IsNullOrEmpty(Id);

        switch (subAct)
        {
            case "save":

                #region save

                if (!loggedIn || !string.IsNullOrEmpty(Ma))
                {

                    var Item = IdNull ? new Ghe() : GheDal.SelectById(Convert.ToInt32(Id));
                    Item.Ma = Ma;
                    if (!string.IsNullOrEmpty(ThuTu))
                    {
                        Item.ThuTu = Convert.ToInt32(ThuTu);
                    }
                    if (!string.IsNullOrEmpty(Tang))
                    {
                        Item.Tang = Convert.ToInt32(Tang);
                    }
                    if (!string.IsNullOrEmpty(SoDo))
                    {
                        Item.SoDo = Convert.ToInt32(SoDo);
                    }
                    Item.CssClass = CssClass;

                    if (IdNull)
                    {
                        Item.RowId = Guid.NewGuid();
                    }

                    Item = IdNull ? GheDal.Insert(Item) : GheDal.Update(Item);
                    ItemAjax.Item = Item;
                    ItemAjax.Visible = true;
                }
                break;

                #endregion

            case "remove":

                #region remove

                if (loggedIn)
                {
                    var Item = GheDal.SelectById(Convert.ToInt32(Id));
                    GheDal.DeleteById(Item.ID);
                    rendertext("0");
                }
                rendertext("-1");
                break;
                #endregion
            case "search":
                #region search
                var pgResult = GheDal.SelectAll();
                rendertext(JavaScriptConvert.SerializeObject(pgResult), "text/javascript");
                break;
                #endregion
            default:
                break;
        }
    }
}