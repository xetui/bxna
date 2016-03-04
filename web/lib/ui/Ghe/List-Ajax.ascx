<%@ Control Language="C#" AutoEventWireup="true" CodeFile="List-Ajax.ascx.cs" Inherits="lib_ui_Ghe_List_Ajax" %>
<%@ Register Src="~/lib/ui/Ghe/templates/Item-Ajax.ascx" TagPrefix="uc1" TagName="ItemAjax" %>
<div class="row">
    <div class="col-md-6">
        <table class="table SoDo-Ghe-List">
            <thead>    
                <tr>
                    <th>
                        #
                    </th>
                    <th>
                        Mã
                    </th>
                    <th>
                        Tầng
                    </th>
                    <th>
                        Thứ tự
                    </th>
                    <th>
                        Class
                    </th>
                    <th>
                
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="SoDo-Ghe-AddPnl" data-url="/lib/ajax/Ghe/Default.aspx">
                    <td class="">

                    </td>
                    <td class="">
                        <input name="Ma" placeholder="Mã" class="form-control Ma" />
                    </td>
                    <td class="">
                        <input name="Tang" placeholder="Tầng" class="form-control Tang"/>
                    </td>
                    <td>
                        <input name="ThuTu" placeholder="Thứ tự" class="form-control ThuTu"/>
                    </td>
                    <td>
                        <input name="CssClass" placeholder="Class" class="form-control CssClass" />
                    </td>
                    <td>
                        <button class="btn btn-default btn-block savebtn" data-id="<%=Item.ID %>">
                            <i class="glyphicon glyphicon-plus"></i>
                        </button>
                    </td>
                </tr>    
                <asp:Repeater runat="server" ID="rpt">
                    <ItemTemplate>
                        <uc1:ItemAjax runat="server" id="ItemAjax"  Item='<%# Container.DataItem %>' />
                    </ItemTemplate>
                </asp:Repeater> 
            </tbody>
        </table>        
    </div>
    <div class="col-md-6">
        <h3>Xem trước</h3>
        <div class="SoDoChoNgoi-Preview <% =Item.CssClass %>">
             <% var listTang1 = List.Where(x => x.Tang == 1).ToList(); %>

            <%if(listTang1.Any()){ %>
                <div class="SoDoChoNgoi-Tang1">
                    <% foreach (var item in listTang1)
                       {%>
                    <a href="javascript:;" class="btn btn-default SoDoChoNgoi-ChoNgoi <%=item.CssClass %>">
                        <%=item.Ma %>
                    </a>                   
                    <% } %>        
                </div>
            <%} %>
             <% var listTang2 = List.Where(x => x.Tang == 2).ToList(); %>

            <%if (listTang2.Any())
              { %>
                <div class="SoDoChoNgoi-Tang2">
                    <% foreach (var item in listTang2)
                       {%>
                    <a href="javascript:;" class="btn btn-default SoDoChoNgoi-ChoNgoi <%=item.CssClass %>">
                        <%=item.Ma %>
                    </a>                   
                    <% } %>        
                </div>
            <%} %>
        </div>        
    </div>
</div>



<link href="/lib/css/front/soDoChoNgoi.css" rel="stylesheet" />
