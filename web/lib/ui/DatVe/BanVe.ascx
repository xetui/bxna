<%@ Control Language="C#" AutoEventWireup="true" CodeFile="BanVe.ascx.cs" Inherits="lib_ui_DatVe_BanVe" %>
<div class="QuanLyDatVePnl" data-src="/lib/ajax/datve/Default.aspx">
    <div class="panel panel-default">
        <div class="panel-body">
            <div class="form-horizontal">
                <div class="col-xs-3">
                    <input data-src="/lib/ajax/DanhMuc/Default.aspx?LDM=Tinh" class="form-control input-lg DI_Input" placeholder="Bến đi"/>
                </div>
                <div class="col-xs-3">
                    <input class="form-control input-lg DEN_Input" placeholder="Bến đến"/>
                </div>
                <div class="col-xs-2">
                    <input class="form-control input-lg Ngay" placeholder="Ngày"/>
                </div>
                <div class="col-xs-1">
                    <button class="btn btn-default btn-block btn-lg btnTimVe">
                        <i class="glyphicon glyphicon-search"></i>
                    </button>
                </div>
            </div>
        </div>
    </div> 
    <div class="panel panel-default">
        <div class="panel-body QuanLyDatVePnl-Rs">
            
        </div>
    </div>
</div>

<!-- Modal bến đi -->
<div class="modal fade" id="chonBenDiModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">
            Chọn bến đi
        </h4>
      </div>
      <div class="modal-body">
        <div class="form-horizontal">
            <div class="form-group">
                <div class="col-md-12">
                    <input class="form-control DI_Ben input-lg" placeholder="Bến xe"
                         data-src="/lib/ajax/DiemDung/Default.aspx?TINH_ID=" 
                        data-realSrc="/lib/ajax/DiemDung/Default.aspx?TINH_ID="
                        />
                </div>                
            </div>            
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default btn-block" data-dismiss="modal">Đóng</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal bến đến -->
<div class="modal fade" id="chonBenDenModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="H1">
            Chọn bến đến
        </h4>
      </div>
      <div class="modal-body">
        <div class="form-horizontal">
            <div class="form-group">
                <div class="col-md-12">
                    <input class="form-control DEN_Ben input-lg" placeholder="Bến xe"/>
                </div>                
            </div>            
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default btn-block" data-dismiss="modal">Đóng</button>
      </div>
    </div>
  </div>
</div>


<!-- Modal bến đi -->
<div class="modal fade" id="quanLyDatVeChonChoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="H2">
            Chọn bến đi
        </h4>
      </div>
      <div class="modal-body">
        
      </div>
    </div>
  </div>
</div>