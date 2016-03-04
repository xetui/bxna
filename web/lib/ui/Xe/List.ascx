﻿<%@ Control Language="C#" AutoEventWireup="true" CodeFile="List.ascx.cs" Inherits="lib_ui_Xe_List" %>
<%@ Register Src="~/lib/ui/Xe/templates/Item.ascx" TagPrefix="uc1" TagName="Item" %>
<div class="col-md-2">
    <div class="list-group">
        <a href="/lib/pages/Xe/Default.aspx?XeVangLai=0" class="list-group-item">
            Toàn bộ
        </a>
        <a href="/lib/pages/Xe/Default.aspx?ChuaDangKy=1&XeVangLai=0" class="list-group-item">
            Chờ đăng ký        
        </a>
        <a href="/lib/pages/Xe/Default.aspx?ChuaDangKy=0&XeVangLai=0" class="list-group-item">
            Đã đăng ký
        </a>
        <a href="/lib/pages/Xe/Default.aspx?XeVangLai=1" class="list-group-item">
            Vãng lai
        </a>
    </div>
</div>
<div class="col-md-10">
    <div class="ModuleHeader">
        <div class="panel panel-default">
            <div class="panel-body" role="form">
                <div class="form-inline">
                    <div class="form-group pull-left">
                        <a href="/lib/pages/Xe/Add.aspx" class="btn btn-primary">Thêm</a>      
                        <a href="/lib/pages/Xe/" class="btn btn-success">
                            <i class="glyphicon glyphicon-refresh"></i>
                        </a>
                    </div>
                    <div class="form-group pull-right">
                        <a href="javascript:;" class="btn btn-default" data-toggle="collapse" data-target="#filtering">
                            <i class="glyphicon glyphicon-search"></i>
                        </a>
                    </div>
                </div>
            </div>               
        </div>
        <div id="filtering" class="panel panel-default collapse">
            <div class="panel-body">
                <div class="form-inline">
                    <div class="row">
                        <div class="col-sm-2">
                            <div class="form-group">
                                <select name="Duyet">
                                    <option value="">Trạng thái</option>
                                    <option value="false">Chưa khóa</option>
                                    <option value="true">Khóa</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group">
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="pull-right">
                                <div class="input-group">
                                  <input name="q" type="text" value="<%=Request["q"] %>" class="form-control">
                                  <div class="input-group-btn">
                                    <a class="btn btn-default searchBtn">
                                        <i class="glyphicon glyphicon-search"></i>
                                    </a>                                
                                  </div>
                                </div>            
                            </div>                    
                        </div>
                    </div>   
                </div>            
            </div>
        </div>
    </div> 
    <table class="table table-striped table-bordered table-hover">
        <thead>
            <tr>
                <th class="">
                    #
                </th>
                <th >
                    Biển
                </th>
                <th class="hidden-xs">
                    Tuyến
                </th>
                <th class="hidden-xs">
                    Vé
                </th>
                <th class="hidden-xs">
                    Loại xe
                </th>
                <th class="hidden-xs">
                    Số ghế
                </th>
                <th>
                    TCĐ
                </th>
                <th>
                    BH
                </th>
                <th>
                    Lưu hành
                </th>
                <th>
                    Tình trạng
                </th>
            </tr>    
        </thead>
        <asp:Repeater runat="server" ID="rpt">
            <ItemTemplate>
                <uc1:Item runat="server" ID="Item1" Item='<%# Container.DataItem %>' />
            </ItemTemplate>
        </asp:Repeater>   
    </table>   
    <% if(Pager!= null){ %> 
    <ul class="pagination">
        <%=Pager.Paging %>    
    </ul>
    <%} %>    
</div>



