﻿using System;
using docsoft.entities;

public partial class lib_pages_DiemDung_Add : System.Web.UI.Page
{
    public DiemDung Item { get; set; }
    protected void Page_Load(object sender, EventArgs e)
    {
        var id = Request["ID"];
        Item = string.IsNullOrEmpty(id) ? new DiemDung() : DiemDungDal.SelectById(Convert.ToInt32(id));
        Add.Item = Item;
    }
}