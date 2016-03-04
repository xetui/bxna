using System;
using docsoft.entities;

public partial class lib_pages_XeDiemDung_Add : System.Web.UI.Page
{
    public XeDiemDung Item { get; set; }
    protected void Page_Load(object sender, EventArgs e)
    {
        var id = Request["ID"];
        Item = string.IsNullOrEmpty(id) ? new XeDiemDung() : XeDiemDungDal.SelectById(Convert.ToInt32(id));
        Add.Item = Item;
    }
}