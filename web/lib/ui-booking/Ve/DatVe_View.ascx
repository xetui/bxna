<%@ Control Language="C#" AutoEventWireup="true" CodeFile="DatVe_View.ascx.cs" Inherits="lib_ui_booking_Ve_DatVe_View" %>
<%@ Import Namespace="linh.common" %>


<div class="panel panel-default">
    <div class="panel-heading">
        <p class="panel-title">
            <a href="/" class="btn btn-lg btn-default">
                <span class="glyphicon glyphicon-triangle-left"></span> Đặt vé
            </a>
            <b><%=ItemDatVe.MaVe %></b>
        </p>
    </div>
    <div class="panel-body">
        <div class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 text-right">Hành trình:</label>
                <div class="col-xs-9">
                    <%=Di.Ten %> → <%=Den.Ten %>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 text-right">
                    Khách:
                </label>
                <div class="col-xs-9">
                    <%=ItemDatVe.Ten %> <b><%=ItemDatVe.Mobile %></b>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 text-right">
                    Giá:
                </label>
                <div class="col-xs-9">
                    <b><%=Lib.TienVietNam(ItemDatVe.Gia) %></b>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 text-right">
                    Tình trạng:
                </label>
                <div class="col-xs-9">
                    <%=string.IsNullOrEmpty(ItemDatVe.TT_Ten) ? "Mới tạo" : ItemDatVe.TT_Ten %>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 text-right">
                    Xe:
                </label>
                <div class="col-xs-9">
                    <%=ItemXe.DONVI_Ten %> <b><%=ItemXe.BienSo_Chu + " " +ItemXe.BienSo_So %></b>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 text-right">
                    Lưu ý:
                </label>
                <div class="col-xs-9">
                    <%if(ItemDatVe.ThanhToan){ %>
                        Bạn lưu ý về thời gian để lên xe đúng giờ.
                    <%}else{ %>
                        <span style="color: red;">
                            Bạn cần thanh toán trước <%=ItemDatVe.NgayTao.AddHours(3).ToString("HH:mm dd/MM/yyyy") %>
                        </span>
                    <%} %>
                </div>
            </div>
        </div>
    </div>
    <div class="panel-footer">
        Chân thành cám ơn quý khách. Mọi thắc mắc xin vui lòng gọi hotline: <a href="tel:0988610888">0988610888</a>
    </div>
</div>