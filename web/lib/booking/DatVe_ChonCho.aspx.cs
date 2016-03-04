using System;
using System.Collections.Generic;
using System.Web.UI;
using docsoft.entities;

public partial class lib_booking_DatVe_ChonCho : Page
{
    public SoDo ItemSoDo { get; set; }
    public List<Ghe> ListGhe { get; set; }
    public Xe ItemXe { get; set; }
    public DiemDung Di { get; set; }
    public DiemDung Den { get; set; }
    public HanhTrinh ItemHanhTrinh { get; set; }
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
            ItemXe = XeDal.SelectById(Convert.ToInt64(XE_ID));
            Di = DiemDungDal.SelectById(Convert.ToInt32(DI_ID));
            Den = DiemDungDal.SelectById(Convert.ToInt32(DEN_ID));
            ListGhe = GheDal.SelectBySoDo(ItemXe.SODO_ID.ToString());
            ItemSoDo = SoDoDal.SelectById(ItemXe.SODO_ID);
            ItemXe.Di = Convert.ToBoolean(CHIEUDI);
            ItemHanhTrinh = HanhTrinhDal.SelectCurrentHanhTrinh(ItemXe.ID, Convert.ToBoolean(CHIEUDI), NgayStr);

            var datVeChiTiets = DatVeChiTietDal.SelectByHanhTrinhId(ItemHanhTrinh.ID);

            DatVe_ChonCho.NgayStr = NgayStr;
            DatVe_ChonCho.ItemSoDo = ItemSoDo;
            DatVe_ChonCho.ItemXe = ItemXe;
            DatVe_ChonCho.Di = Di;
            DatVe_ChonCho.Den = Den;
            DatVe_ChonCho.ListGhe = ListGhe;
            DatVe_ChonCho.Visible = true;
            DatVe_ChonCho.ListDatVeChiTiet = datVeChiTiets;
        }
    }
}