using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using docsoft.entities;

public partial class lib_booking_DatVe_ThanhToan : System.Web.UI.Page
{
    public SoDo ItemSoDo { get; set; }
    public List<Ghe> ListGhe { get; set; }
    public Xe ItemXe { get; set; }
    public DiemDung Di { get; set; }
    public DiemDung Den { get; set; }
    public DatVe ItemDatVe { get; set; }
    public string NgayStr { get; set; }

    protected void Page_Load(object sender, EventArgs e)
    {
        var ma = Request["ID"];
        if (!string.IsNullOrEmpty(ma))
        {
            ItemDatVe = DatVeDal.SelectByMa(ma);


            ItemXe = XeDal.SelectById(Convert.ToInt64(ItemDatVe.XE_ID));

            Di = DiemDungDal.SelectById(Convert.ToInt32(ItemDatVe.DI_ID));
            Den = DiemDungDal.SelectById(Convert.ToInt32(ItemDatVe.DEN_ID));
            ListGhe = GheDal.SelectBySoDo(ItemXe.SODO_ID.ToString());
            ItemSoDo = SoDoDal.SelectById(ItemXe.SODO_ID);
            NgayStr = ItemDatVe.Ngay.ToString("dd/MM/yyyy");

            DatVe_ThanhToan.ItemXe = ItemXe;
            DatVe_ThanhToan.ItemDatVe = ItemDatVe;
            DatVe_ThanhToan.Di = Di;
            DatVe_ThanhToan.Den = Den;
        }
    }
}