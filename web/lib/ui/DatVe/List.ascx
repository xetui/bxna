﻿<%@ Control Language="C#" AutoEventWireup="true" CodeFile="List.ascx.cs" Inherits="lib_ui_DatVe_List" %>
<%@ Register Src="~/lib/ui/DatVe/templates/Item.ascx" TagPrefix="uc1" TagName="Item" %>

<div class="ModuleHeader">
    <div class="panel panel-default">
        <div class="panel-body" role="form">
            <div class="form-inline">
                <div class="form-group pull-left">
                    <a href="/lib/pages/DatVe/Add.aspx" class="btn btn-primary">Thêm</a>      
                    <a href="/lib/pages/DatVe/" class="btn btn-success">
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
                Mã
            </th>
            <th class="">
                Khách
            </th>            
            <th>
                Tình trạng
            </th>
            <th>
                T.Toán
            </th>
            <th>
                Hủy
            </th>
            <th>
                Ngày
            </th>
        </tr>    
    </thead>
    <asp:Repeater runat="server" ID="rpt">
        <ItemTemplate>
            <uc1:Item runat="server" id="Item" Item='<%# Container.DataItem %>' />
        </ItemTemplate>
    </asp:Repeater>   
</table>   
<% if(Pager!= null){ %> 
<ul class="pagination">
    <%=Pager.Paging %>    
</ul>
<%} %>