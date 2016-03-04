using System;
using System.Linq;
using System.Web.UI;
using docsoft.entities;
using linh.core.dal;

public partial class lib_booking_List : Page
{
    public DiemDung Di { get; set; }
    public DiemDung Den { get; set; }
    protected void Page_Load(object sender, EventArgs e)
    {
        var route = Request["Route"];
        var ngay = Request["Ngay"];
        if (!string.IsNullOrEmpty(route))
        {
            var diems = route.Split(new char[] {','});
            var diId = diems[0];
            var denId = diems[1];
            Di = DiemDungDal.SelectById(Convert.ToInt32(diId));
            Den = DiemDungDal.SelectById(Convert.ToInt32(denId));
            
            var list = XeDal.SearchByDiemDung(DAL.con(), diId, denId, 50, ngay);

            var newList = list.Select(x =>
            {
                x.DI_ID = Convert.ToInt32(diId);
                x.DEN_ID = Convert.ToInt32(denId);
                x.NgayStr = ngay;
                return x;
            }).ToList();
            ListByDiem.List = newList;
            ListByDiem.Di = Di;
            ListByDiem.Den = Den;
        }
    }
}