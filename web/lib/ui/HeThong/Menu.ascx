﻿<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Menu.ascx.cs" Inherits="lib_ui_HeThong_Menu" %>
<%@ Import Namespace="docsoft" %>
<div class="navbar-wrapper">
    <div class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/lib/pages/">
                <span class="glyphicon glyphicon-home"></span>
            </a>            
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <% foreach (var Item in List.Where(y => y.Level==1 && !y.Ten.Contains("QT")))
                   {%>
                    <li class="dropdown">
                        <a data-id="<%=Item.ID %>" data-level="<%=Item.Level %>" href="#" class="dropdown-toggle" data-toggle="dropdown"><%=Item.Ten %><b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <% foreach (var item in List.Where( y => y.PID == Item.ID))
                               {%>
                               <li>
                                   <a href="<%=item.Url %>">
                                       <%=item.Ten %>
                                   </a>
                               </li>
                             <%  } %>
                        </ul>
                    </li>
                <%   } %>               
                
            </ul>            
            <form action="/lib/pages/TimKiem.aspx" class="navbar-form navbar-left">
                <div class="form-group">
                    <input name="q" type="text" value="<%=Request["q"] %>" class="form-control">
                </div>
                <button type="submit" class="btn btn-default globalSearchBtn"><i class="glyphicon glyphicon-search"></i></button>
            </form>
            <ul class="nav navbar-nav navbar-right">
              <li>
                  <%if(Security.IsAuthenticated()){ %>
                  
                  <%}else{ %>
                  <a href="javascript:;" class="loginbtn">
                      Đăng nhập
                  </a>
                  <%} %>
                  
              </li>
            <%if(Security.IsAuthenticated()){ %>
            <li class="dropdown GiaoCa-Label">
            </li>
              <li class="dropdown">
                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown"><%=Security.Username %> <b class="caret"></b></a>
                <ul class="dropdown-menu">
                    <li>
                        <a href="mailto:linh_net@yahoo.com">
                            <i class="glyphicon glyphicon-info-sign"></i> Hỗ trợ
                        </a>
                    </li>
                  <li class="divider"></li>
                    <li>
                        <a href="javascript:;" class="logoutbtn">
                            <i class="glyphicon glyphicon-log-out"></i> Thoát
                        </a>
                    </li>
                </ul>
              </li>
            <%} %>
            </ul>            
        </div>
    </div>
</div>