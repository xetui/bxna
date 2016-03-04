using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using docsoft.entities;

public partial class lib_pages_XeDiemDung_Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var tinh_id = Request["TINH_ID"];

        var url = string.Format("?TINH_ID={0}&", tinh_id) + "{1}={0}";
        var pg = XeDiemDungDal.pagerNormal(url, false, null,  10, tinh_id);
        List.Pager = pg;
    }
}