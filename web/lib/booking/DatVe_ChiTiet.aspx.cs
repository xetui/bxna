using System;
using System.Collections.Generic;
using System.Web.UI;
using docsoft.entities;

public partial class lib_booking_DatVe_ChiTiet : Page
{
    public SoDo ItemSoDo { get; set; }
    public List<Ghe> ListGhe { get; set; }
    public Xe ItemXe { get; set; }
    public DiemDung Di { get; set; }
    public DiemDung Den { get; set; }
    public string NgayStr { get; set; }
    protected void Page_Load(object sender, EventArgs e)
    {
        var Id = Request["ID"];
        var XE_ID = Request["XE_ID"];
        var CHIEUDI = Request["CHIEUDI"];
        var DI_ID = Request["DI_ID"];
        var DEN_ID = Request["DEN_ID"];
        NgayStr = Request["Ngay"];
        var IdNull = string.IsNullOrEmpty(Id);

        if (!string.IsNullOrEmpty(XE_ID))
        {
            var itemXe = XeDal.SelectById(Convert.ToInt64(XE_ID));

            var itemDi = DiemDungDal.SelectById(Convert.ToInt32(DI_ID));
            var itemDen = DiemDungDal.SelectById(Convert.ToInt32(DEN_ID));
            var listGhe = GheDal.SelectBySoDo(itemXe.SODO_ID.ToString());
            var itemSoDo = SoDoDal.SelectById(itemXe.SODO_ID);
            
            itemXe.Di = Convert.ToBoolean(CHIEUDI);



            DatVe_XeChiTiet.NgayStr = NgayStr;
            DatVe_XeChiTiet.ItemSoDo = itemSoDo;
            DatVe_XeChiTiet.ItemXe = itemXe;
            DatVe_XeChiTiet.Di = itemDi;
            DatVe_XeChiTiet.Den = itemDen;
            DatVe_XeChiTiet.ListGhe = listGhe;
            DatVe_XeChiTiet.Visible = true;
        }
    }
}