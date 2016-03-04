<%@ Control Language="C#" AutoEventWireup="true" CodeFile="DatVe.ascx.cs" Inherits="lib_ui_booking_Ve_DatVe" %>
<div class="form-horizontal DatVePnl">
    <div class="form-group">
        <div class="col-md-6 col-xs-6">
            <input data-src="/lib/ajax/DanhMuc/Default.aspx?LDM=Tinh"  class="form-control input-lg DI_Input" data-id="" placeholder="Bến đi"                
                />
        </div>
        <div class="col-md-6 col-xs-6">
            <input 
                 data-src="/lib/ajax/DanhMuc/Default.aspx?LDM=Tinh"
                class="form-control input-lg DEN_Input"  data-id="" placeholder="Bến đến"/>
        </div>
    </div>
    <div class="form-group">
        <div class="col-md-6 col-xs-6">
            <input 
                        value="<%=DateTime.Now.ToString("dd/MM/yyyy") %>"
                        data-format="dd/MM/yyyy" 
                        class="form-control input-lg Ngay" 
                        name="Ngay" 
                        type="text"/>
        </div>
        <div class="col-md-6 col-xs-6">
            <button class="btn btn-block btn-lg btn-success btnTimVe">Tìm vé</button>
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
<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>