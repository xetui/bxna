using System;
using System.Web.UI;
using docsoft.entities;

public partial class lib_ui_booking_Ve_DatVe_View : UserControl
{
    public DatVe ItemDatVe { get; set; }
    public Xe ItemXe { get; set; }
    public DiemDung Di { get; set; }
    public DiemDung Den { get; set; }
    public string NgayStr { get; set; }
    protected void Page_Load(object sender, EventArgs e)
    {

    }
}