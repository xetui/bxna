using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using linh.common;
using linh.controls;
using linh.core;
using linh.core.dal;

namespace docsoft.entities
{
    #region KhachHang
    #region BO
    public class KhachHang : BaseEntity
    {
        #region Properties
        public Int64 ID { get; set; }
        public String Ten { get; set; }
        public String Mobile { get; set; }
        public Guid TINH_ID { get; set; }
        public DateTime NgayTao { get; set; }
        public DateTime NgayCapNhat { get; set; }
        public Double DoanhThuMuaVe { get; set; }
        public Double DoanhThuDichVu { get; set; }
        public Guid HANG_ID { get; set; }
        #endregion
        #region Contructor
        public KhachHang()
        { }
        #endregion
        #region Customs properties

        #endregion
        public override BaseEntity getFromReader(IDataReader rd)
        {
            return KhachHangDal.getFromReader(rd);
        }
    }
    #endregion
    #region Collection
    public class KhachHangCollection : BaseEntityCollection<KhachHang>
    { }
    #endregion
    #region Dal
    public class KhachHangDal
    {
        #region Methods

        public static void DeleteById(Int64 KH_ID)
        {
            var obj = new SqlParameter[1];
            obj[0] = new SqlParameter("KH_ID", KH_ID);
            SqlHelper.ExecuteNonQuery(DAL.con(), CommandType.StoredProcedure, "sp_tblBx_KhachHang_Delete_DeleteById_linhnx", obj);
        }

        public static KhachHang Insert(KhachHang item)
        {
            var Item = new KhachHang();
            var obj = new SqlParameter[9];
            obj[1] = new SqlParameter("KH_Ten", item.Ten);
            obj[2] = new SqlParameter("KH_Mobile", item.Mobile);
            obj[3] = new SqlParameter("KH_TINH_ID", item.TINH_ID);
            obj[4] = new SqlParameter("KH_NgayTao", item.NgayTao);
            if (item.NgayTao > DateTime.MinValue)
            {
                obj[4] = new SqlParameter("KH_NgayTao", item.NgayTao);
            }
            else
            {
                obj[4] = new SqlParameter("KH_NgayTao", DBNull.Value);
            }
            obj[5] = new SqlParameter("KH_NgayCapNhat", item.NgayCapNhat);
            if (item.NgayCapNhat > DateTime.MinValue)
            {
                obj[5] = new SqlParameter("KH_NgayCapNhat", item.NgayCapNhat);
            }
            else
            {
                obj[5] = new SqlParameter("KH_NgayCapNhat", DBNull.Value);
            }
            obj[6] = new SqlParameter("KH_DoanhThuMuaVe", item.DoanhThuMuaVe);
            obj[7] = new SqlParameter("KH_DoanhThuDichVu", item.DoanhThuDichVu);
            obj[8] = new SqlParameter("KH_HANG_ID", item.HANG_ID);

            using (IDataReader rd = SqlHelper.ExecuteReader(DAL.con(), CommandType.StoredProcedure, "sp_tblBx_KhachHang_Insert_InsertNormal_linhnx", obj))
            {
                while (rd.Read())
                {
                    Item = getFromReader(rd);
                }
            }
            return Item;
        }

        public static KhachHang Update(KhachHang item)
        {
            var Item = new KhachHang();
            var obj = new SqlParameter[9];
            obj[0] = new SqlParameter("KH_ID", item.ID);
            obj[1] = new SqlParameter("KH_Ten", item.Ten);
            obj[2] = new SqlParameter("KH_Mobile", item.Mobile);
            obj[3] = new SqlParameter("KH_TINH_ID", item.TINH_ID);
            if (item.NgayTao > DateTime.MinValue)
            {
                obj[4] = new SqlParameter("KH_NgayTao", item.NgayTao);
            }
            else
            {
                obj[4] = new SqlParameter("KH_NgayTao", DBNull.Value);
            }
            if (item.NgayCapNhat > DateTime.MinValue)
            {
                obj[5] = new SqlParameter("KH_NgayCapNhat", item.NgayCapNhat);
            }
            else
            {
                obj[5] = new SqlParameter("KH_NgayCapNhat", DBNull.Value);
            }
            obj[6] = new SqlParameter("KH_DoanhThuMuaVe", item.DoanhThuMuaVe);
            obj[7] = new SqlParameter("KH_DoanhThuDichVu", item.DoanhThuDichVu);
            obj[8] = new SqlParameter("KH_HANG_ID", item.HANG_ID);

            using (IDataReader rd = SqlHelper.ExecuteReader(DAL.con(), CommandType.StoredProcedure, "sp_tblBx_KhachHang_Update_UpdateNormal_linhnx", obj))
            {
                while (rd.Read())
                {
                    Item = getFromReader(rd);
                }
            }
            return Item;
        }

        public static KhachHang SelectById(Int64 KH_ID)
        {
            var Item = new KhachHang();
            var obj = new SqlParameter[1];
            obj[0] = new SqlParameter("KH_ID", KH_ID);
            using (IDataReader rd = SqlHelper.ExecuteReader(DAL.con(), CommandType.StoredProcedure, "sp_tblBx_KhachHang_Select_SelectById_linhnx", obj))
            {
                while (rd.Read())
                {
                    Item = getFromReader(rd);
                }
            }
            return Item;
        }

        public static KhachHangCollection SelectAll()
        {
            var List = new KhachHangCollection();
            using (IDataReader rd = SqlHelper.ExecuteReader(DAL.con(), CommandType.StoredProcedure, "sp_tblBx_KhachHang_Select_SelectAll_linhnx"))
            {
                while (rd.Read())
                {
                    List.Add(getFromReader(rd));
                }
            }
            return List;
        }
        public static Pager<KhachHang> pagerNormal(string url, bool rewrite, string sort, string q, int size)
        {
            var obj = new SqlParameter[2];
            obj[0] = new SqlParameter("Sort", sort);
            if (!string.IsNullOrEmpty(q))
            {
                obj[1] = new SqlParameter("q", q);
            }
            else
            {
                obj[1] = new SqlParameter("q", DBNull.Value);
            }

            var pg = new Pager<KhachHang>("sp_tblBx_KhachHang_Pager_Normal_linhnx", "page", size, 10, rewrite, url, obj);
            return pg;
        }
        #endregion

        #region Utilities
        public static KhachHang getFromReader(IDataReader rd)
        {
            var Item = new KhachHang();
            if (rd.FieldExists("KH_ID"))
            {
                Item.ID = (Int64)(rd["KH_ID"]);
            }
            if (rd.FieldExists("KH_Ten"))
            {
                Item.Ten = (String)(rd["KH_Ten"]);
            }
            if (rd.FieldExists("KH_Mobile"))
            {
                Item.Mobile = (String)(rd["KH_Mobile"]);
            }
            if (rd.FieldExists("KH_TINH_ID"))
            {
                Item.TINH_ID = (Guid)(rd["KH_TINH_ID"]);
            }
            if (rd.FieldExists("KH_NgayTao"))
            {
                Item.NgayTao = (DateTime)(rd["KH_NgayTao"]);
            }
            if (rd.FieldExists("KH_NgayCapNhat"))
            {
                Item.NgayCapNhat = (DateTime)(rd["KH_NgayCapNhat"]);
            }
            if (rd.FieldExists("KH_DoanhThuMuaVe"))
            {
                Item.DoanhThuMuaVe = (Double)(rd["KH_DoanhThuMuaVe"]);
            }
            if (rd.FieldExists("KH_DoanhThuDichVu"))
            {
                Item.DoanhThuDichVu = (Double)(rd["KH_DoanhThuDichVu"]);
            }
            if (rd.FieldExists("KH_HANG_ID"))
            {
                Item.HANG_ID = (Guid)(rd["KH_HANG_ID"]);
            }
            return Item;
        }
        #endregion

        #region Extend
        public static KhachHang SelectByMobile(string Mobile)
        {
            var Item = new KhachHang();
            var obj = new SqlParameter[1];
            obj[0] = new SqlParameter("Mobile", Mobile);
            using (IDataReader rd = SqlHelper.ExecuteReader(DAL.con(), CommandType.StoredProcedure, "sp_tblBx_KhachHang_Select_SelectByMobile_linhnx", obj))
            {
                while (rd.Read())
                {
                    Item = getFromReader(rd);
                }
            }
            return Item;
        }
        #endregion
    }
    #endregion

    #endregion
}
