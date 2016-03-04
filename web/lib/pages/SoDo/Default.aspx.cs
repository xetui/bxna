using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using docsoft.entities;

public partial class lib_pages_SoDo_Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var q = Request["q"];

        var pg = SoDoDal.pagerNormal("", false, null, q, 10);
        List.Pager = pg;
    }
}