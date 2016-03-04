using System;
using System.Web.UI;
using docsoft.entities;
using linh.controls;

public partial class lib_pages_DatVe_Add : Page
{
    public DatVe Item { get; set; }
    protected void Page_Load(object sender, EventArgs e)
    {
        var id = Request["ID"];
        Item = string.IsNullOrEmpty(id) ? new DatVe(){MaVe = CaptchaImage.GenerateRandomCode(CaptchaType.AlphaNumeric, 6)} : DatVeDal.SelectById(Convert.ToInt32(id));
        Add.Item = Item;
    }
}