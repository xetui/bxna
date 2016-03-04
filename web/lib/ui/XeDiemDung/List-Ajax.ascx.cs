using System;
using System.Collections.Generic;
using System.Web.UI;
using docsoft.entities;
using linh.controls;
public partial class lib_ui_XeDiemDung_List_Ajax : UserControl
{
    public List<XeDiemDung> List { get; set; }
    public Xe Item { get; set; }
    protected void Page_Load(object sender, EventArgs e)
    {
        if (List == null) return;
        rpt.DataSource = List;
        rpt.DataBind();
    }
}