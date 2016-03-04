using System;
using System.Web.UI;
using docsoft.entities;

public partial class lib_booking_DatVe_View : Page
{
    public DatVe ItemDatVe { get; set; }
    public Xe ItemXe { get; set; }
    public DiemDung Di { get; set; }
    public DiemDung Den { get; set; }
    public string NgayStr { get; set; }
    protected void Page_Load(object sender, EventArgs e)
    {
        var ma = Request["Ma"];
        if (!string.IsNullOrEmpty(ma))
        {
            ItemDatVe = DatVeDal.SelectByMa(ma);
            ItemXe = XeDal.SelectById(Convert.ToInt64(ItemDatVe.XE_ID));
            Di = DiemDungDal.SelectById(Convert.ToInt32(ItemDatVe.DI_ID));
            Den = DiemDungDal.SelectById(Convert.ToInt32(ItemDatVe.DEN_ID));
            NgayStr = ItemDatVe.Ngay.ToString("dd/MM/yyyy");

            DatVe_View.ItemXe = ItemXe;
            DatVe_View.ItemDatVe = ItemDatVe;
            DatVe_View.Di = Di;
            DatVe_View.Den = Den;
        }

    }
}