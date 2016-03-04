<%@ Control Language="C#" AutoEventWireup="true" CodeFile="DatVe_ThanhToan.ascx.cs" Inherits="lib_ui_booking_Ve_DatVe_ThanhToan" %>
<%@ Import Namespace="linh.common" %>
<div class="datVe-thanhToanPnl">
    <h3>
        <a href="/ghe?XE_ID=<%=ItemXe.ID %>&DI_ID=<%=Di.ID %>&DEN_ID=<%=Den.ID %>&Ngay=<%=NgayStr %>&CHIEUDI=<%=ItemXe.Di %>">
        <span class="glyphicon glyphicon-triangle-left"></span> 
        Chọn ghế
        </a>
    </h3>
    <hr/>
    <p>
        Mã đặt vé của bạn là: <b style="color: red;"><%=ItemDatVe.MaVe %></b>
    </p>
    <p>
        Số tiền: <b style="color: red;"><%=Lib.TienVietNam(ItemDatVe.Gia) %></b>
    </p>
    <p>
        Vui lòng chọn hình thức thanh toán vé để hoàn tất
    </p>
    <button class="btn btn-lg btn-block btn-default">
        <h3>Thẻ ATM</h3>
        <p>
            Dùng cho 30 ngân hàng ở Việt Nam. Phí giao dịch 5k
        </p>
    </button>
    <button class="btn btn-lg btn-block btn-default">
        <h3>
            Tin nhắn
        </h3>
        <p>
            Nhắn <%=ItemDatVe.MaVe %> đến số tổng đài 8750
        </p>
    </button>
    <button class="btn btn-lg btn-block btn-default">
        <h3>
            Giao vé tận nhà
        </h3>
        <p>
            Chúng tôi giao vé tận nhà tại TP Vinh và Hà Nội
        </p>
    </button>
    <button class="btn btn-lg btn-block btn-default">
        <h3>
            Thanh toán tại quầy
        </h3>
        <p>
            Bạn ra quầy bán vé hoặc xe 3h trước khi xe chạy
        </p>
    </button>
</div>