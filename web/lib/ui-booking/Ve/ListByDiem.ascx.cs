using System;
using System.Collections.Generic;
using System.Web.UI;
using docsoft.entities;

public partial class lib_ui_booking_Ve_ListByDiem : UserControl
{
    public List<Xe> List { get; set; }
    public DiemDung Di { get; set; }
    public DiemDung Den { get; set; }
    public string NgayStr { get; set; }
    protected void Page_Load(object sender, EventArgs e)
    {
        if (List == null) return;
        rpt.DataSource = List;
        rpt.DataBind();
        NgayStr = Request["ngay"];
    }
}