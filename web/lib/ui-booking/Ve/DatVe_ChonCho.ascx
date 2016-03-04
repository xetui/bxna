<%@ Control Language="C#" AutoEventWireup="true" CodeFile="DatVe_ChonCho.ascx.cs" Inherits="lib_ui_booking_Ve_DatVe_ChonCho" %>
<%@ Import Namespace="linh.common" %>
<div class="datVe-chonGhePnl">
    
<h3>
    <a href="/datVe?XE_ID=<%=ItemXe.ID %>&DI_ID=<%=Di.ID %>&DEN_ID=<%=Den.ID %>&Ngay=<%=NgayStr %>&CHIEUDI=<%=ItemXe.Di %>">
    <span class="glyphicon glyphicon-triangle-left"></span> 
    <%=ItemXe.BienSo_Chu %> <%=ItemXe.BienSo_So %>
    </a>
</h3>
<hr/>
<div class="row">
    <div class="col-md-4 col-md-offset-4">
        <div class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-2 text-right">Xe:</label>
                <div class="col-xs-4">
                    <%=ItemXe.DONVI_Ten %>
                </div>
                <label class="col-xs-2 text-right">Giờ:</label>
                <div class="col-xs-4">
                    <%=ItemXe.DI_GioXuatBen %>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-2 text-right">
                    Bến:
                </label>
                <div class="col-xs-4">
                    <%=Di.Ten %>
                </div>
                <label class="col-xs-2 text-right">
                    Giá:
                </label>
                <div class="col-xs-4">
                    <%=Lib.TienVietNam(ItemXe.GiaVe) %>
                </div>
            </div>
            <div class="form-group">
                <label for="Ten" class="col-xs-2 text-right">
                    Tên:
                </label>
                <div class="col-xs-10">
                    <input class="form-control Ten" id="Ten" name="Ten" placeholder="Họ và tên quý khách"/>
                </div>
            </div>
            <div class="form-group">
                <label for="Mobile" class="col-xs-2 text-right">
                    Mobile:
                </label>
                <div class="col-xs-10">
                    <input class="form-control Mobile" id="Mobile" name="Mobile" placeholder="Số điện thoại"/>
                </div>
            </div>
        </div>
        <hr/>
        <div class="row">
            <div class="col-md-12">
                <h3>
                    CHỌN CHỖ
                </h3>
                <%if(ItemXe.ChonGhe){ %>
                <img src="/lib/css/front/i/chonGhe-HuongDan.png" class="img-responsive" />

                <div class="SoDoChoNgoi-Preview SoDoChoNgoi-ChonGhePnl <% =ItemSoDo.CssClass %>">
                    <% var listTang1 = ListGhe.Where(x => x.Tang == 1).ToList(); %>
                    <%if(listTang1.Any()){ %>
                        <div class="SoDoChoNgoi-Tang1">
                            <% foreach (var item in listTang1)
                                {%>
                            <a href="javascript:;" data-id="<%=item.ID %>" class="btn btn-default SoDoChoNgoi-ChoNgoi <%=item.CssClass %><%=ListDatVeChiTiet.Any(x => x.GHE_ID==item.ID) ? " btn-danger" : "" %>">
                                <%=item.Ma %>
                            </a>                   
                            <% } %>        
                        </div>
                    <%} %>
                        <% var listTang2 = ListGhe.Where(x => x.Tang == 2).ToList(); %>

                    <%if (listTang2.Any())
                        { %>
                        <div class="SoDoChoNgoi-Tang2">
                            <% foreach (var item in listTang2)
                                {%>
                            <a href="javascript:;" data-id="<%=item.ID %>" class="btn btn-default SoDoChoNgoi-ChoNgoi <%=item.CssClass %><%=ListDatVeChiTiet.Any(x => x.GHE_ID==item.ID) ? " btn-danger" : "" %>">
                                <%=item.Ma %>
                            </a>                   
                            <% } %>        
                        </div>
                    <%} %>
                </div>

                <link href="/lib/css/front/soDoChoNgoi.css" rel="stylesheet" />

                <%}else{ %>
                <p>
                    <span class="center-block">
                        Xe không hỗ trợ chọn ghế
                    </span>
                </p>
                <%} %>        
            </div>
        </div>        
    </div>
</div>
<hr/>
    <div class="datVe-chonGhePnl-btnDatVePnl">
        <button 
            data-xeId="<%=ItemXe.ID %>" 
            data-diId="<%=Di.ID %>" 
            data-denId="<%=Den.ID %>" 
            data-ngay="<%=NgayStr %>" 
            data-chieuDi="<%=ItemXe.Di %>" 
            data-chonGhe="<%=ItemXe.ChonGhe %>"
            class="btn btn-block btn-lg btn-danger btnDatVe">
            ĐẶT VÉ
        </button>
        
    </div>


</div>
