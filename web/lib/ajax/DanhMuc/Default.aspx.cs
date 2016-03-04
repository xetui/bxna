using System;
using System.Collections.Generic;
using System.EnterpriseServices.Internal;
using System.Globalization;
using System.Linq;
using docsoft;
using docsoft.entities;
using linh.common;
using linh.json;

public partial class lib_ajax_DanhMuc_Default : basePage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var loggedIn = Security.IsAuthenticated();

        var Id = Request["Id"];
        var LDM = Request["LDM"];

        var q = Request["q"];

        switch (subAct)
        {
            case "search":
                #region search

                if (!string.IsNullOrEmpty(LDM))
                {
                    q = BoDau1(q);
                    var listByLdm = DanhMucDal.SelectByLDMMa(LDM);
                    var newList = listByLdm.Select(x =>
                    {
                        x.Ma = BoDau1(x.Ten);
                        return x;
                    }).ToList();
                    var list = listByLdm.Where(x => x.Ma.Contains(q)).ToList();
                    rendertext(JavaScriptConvert.SerializeObject(list), "text/javascript");
                }
                break;    
                
                #endregion
            case "searchByMap":
                #region search

                if (!string.IsNullOrEmpty(LDM))
                {
                    q = BoDau1(q);

                    var listByLdm = DanhMucDal.SelectByLDMMa(LDM);
                    
                    var list = listByLdm.Where(x => BoDau1(x.Ten).Contains(q)).ToList();
                    rendertext(JavaScriptConvert.SerializeObject(list), "text/javascript");    

                }
                
                break;
                #endregion
            default:
                break;
        }
    }

    public string BoDau1(string input)
    {
        input = Lib.Bodau(input);
        return input.Replace("-", " ").ToLower();
    }
}