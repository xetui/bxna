<%@ Control Language="C#" AutoEventWireup="true" CodeFile="DatVe_XeChiTiet.ascx.cs" Inherits="lib_ui_booking_Ve_DatVe_XeChiTiet" %>
<%@ Import Namespace="linh.common" %>

<div class="datVe-Xe-Panel">
    <h3>
        <a href="/tim?route=<%=Di.ID %>,<%=Den.ID %>&ngay=<%=NgayStr %>">
        <span class="glyphicon glyphicon-triangle-left"></span> 
        <%=Di.TINH_Ten %> → <%=Den.TINH_Ten %>
        </a>
    </h3>
    <hr/>
    
    
    <div class="row">
        <div class="col-md-8">
            <%if(!string.IsNullOrEmpty(ItemXe.Anh)){ %>
                <div class="datVe-Xe-AnhPreview">
                    <div class="datVe-Xe-AnhPreview-item">
                        <img class="datVe-Xe-AnhPreview-item-img" src="<%=ItemXe.Anh %>"/>
                    </div>
                    <% if (!string.IsNullOrEmpty(ItemXe.Anh1))
                        { %>
                        <div class="datVe-Xe-AnhPreview-item">
                            <img class="datVe-Xe-AnhPreview-item-img" src="<%=ItemXe.Anh1 %>"/>
                        </div>
                    <% } %>
                    <% if (!string.IsNullOrEmpty(ItemXe.Anh2))
                        { %>
                        <div class="datVe-Xe-AnhPreview-item">
                            <img class="datVe-Xe-AnhPreview-item-img" src="<%=ItemXe.Anh2 %>"/>
                        </div>
                    <% } %>
                    <% if (!string.IsNullOrEmpty(ItemXe.Anh3))
                        { %>
                        <div class="datVe-Xe-AnhPreview-item">
                            <img class="datVe-Xe-AnhPreview-item-img" src="<%=ItemXe.Anh3 %>"/>
                        </div>
                    <% } %>
                    <% if (!string.IsNullOrEmpty(ItemXe.Anh4))
                        { %>
                        <div class="datVe-Xe-AnhPreview-item">
                            <img class="datVe-Xe-AnhPreview-item-img" src="<%=ItemXe.Anh4 %>"/>
                        </div>
                    <% } %>

                </div>
            <%} %>          
        </div>
        <div class="col-md-4">
            <div class="row">
                <div class="col-md-6 col-xs-8">
                    <div class="datVe-Xe-Panel-NhaXe">
                        <%=ItemXe.DONVI_Ten %>                
                    </div>
                    <div class="datVe-Xe-Panel-LoaiXe">
                        <%=ItemXe.LOAIXE_Ten %>                
                    </div>
                    <div class="datVe-Xe-Panel-TienIch">
                        <%if(ItemXe.TIENICH_Wifi){ %>
                            <span class="TienIchIcon TienIch-Wifi"></span>
                        <%} %>
                        <%if(ItemXe.TIENICH_Chan){ %>
                            <span class="TienIchIcon TienIch-Chan"></span>
                        <%} %>
                        <%if(ItemXe.TIENICH_Tivi){ %>
                            <span class="TienIchIcon TienIch-Tivi"></span>
                        <%} %>
                        <%if(ItemXe.TIENICH_Nuoc){ %>
                            <span class="TienIchIcon TienIch-NuocUong"></span>
                        <%} %>
                        <%if(ItemXe.TIENICH_AnNhe){ %>
                            <span class="TienIchIcon TienIch-AnNhe"></span>
                        <%} %>
                        <%if(ItemXe.TIENICH_Wc){ %>
                            <span class="TienIchIcon TienIch-Wc"></span>
                        <%} %>
                    </div>
                </div>
                <div class="col-md-6 col-xs-4">
                    <div class="text-right">
                        <div class="datVe-Xe-Panel-ThoiGian">
                            <%=ItemXe.DI_GioXuatBen %>→<%=ItemXe.DI_GioDen %>                
                        </div>
                        <div class="datVe-Xe-Panel-Gia">
                            <%=Lib.TienVietNam(ItemXe.GiaVe) %>
                        </div>
                        <div class="datVe-Xe-Panel-TrangThaiVe">
                            Còn <b><%=ItemXe.Ghe-ItemXe.VeDaBan %></b> ghế
                        </div>
                        <div class="datVe-Xe-Panel-DatVePnl">
                            <a class="btn btn-danger btn-lg btn-block btnDatVe" href="/ghe?XE_ID=<%=ItemXe.ID %>&DI_ID=<%=Di.ID %>&DEN_ID=<%=Den.ID %>&Ngay=<%=NgayStr %>&CHIEUDI=<%=ItemXe.Di %>">
                                ĐẶT VÉ
                            </a>
                        </div>
                    </div>
            
                </div>
            </div>            
        </div>
    </div>

    


    
</div>
