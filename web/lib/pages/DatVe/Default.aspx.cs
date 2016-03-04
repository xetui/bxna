using System;
using System.Web.UI;
using docsoft.entities;


public partial class lib_pages_DatVe_Default : Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var TT_ID = Request["TT_ID"];
        var q = Request["q"];
        var size = Request["Size"];
        if (string.IsNullOrEmpty(size)) size = "50";

        var url = string.Format("?q={0}&TT_ID={1}&Size={2}&", q, TT_ID,size) + "{1}={0}";
        var pg = DatVeDal.pagerNormal(url, false, null, q, Convert.ToInt32(size), TT_ID);
        List.Pager = pg;
    }
}