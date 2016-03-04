using System;
using docsoft.entities;

public partial class lib_pages_SoDo_Add : System.Web.UI.Page
{
    public SoDo Item { get; set; }
    protected void Page_Load(object sender, EventArgs e)
    {
        var id = Request["ID"];
        Item = string.IsNullOrEmpty(id) ? new SoDo() : SoDoDal.SelectById(Convert.ToInt32(id));
        Add.Item = Item;

        if (!string.IsNullOrEmpty(id))
        {
            ListAjax.Visible = true;
            ListAjax.List = GheDal.SelectBySoDo(id);
            ListAjax.Item = Item;
        }
    }
}