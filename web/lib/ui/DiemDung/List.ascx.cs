using System;
using System.Web.UI;
using docsoft.entities;
using linh.controls;

public partial class lib_ui_DiemDung_List : UserControl
{
    public Pager<DiemDung> Pager { get; set; }
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Pager == null) return;
        rpt.DataSource = Pager.List;
        rpt.DataBind();
    }
}