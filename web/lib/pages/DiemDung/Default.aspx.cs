using System;
using System.Web.UI;
using docsoft.entities;

public partial class lib_pages_DiemDung_Default : Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var xe_Id = Request["XE_ID"];
        var q = Request["q"];

        var url = string.Format("?q={0}&XE_ID={1}&", q, xe_Id) + "{1}={0}";
        var pg = DiemDungDal.pagerNormal(url, false, null, q, 10, xe_Id);
        List.Pager = pg;
    }
}