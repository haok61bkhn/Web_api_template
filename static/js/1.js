function upload_image(){
  $("#input").unbind("change").bind("change",function(){ // bind: kiểm tra sự kiện là change
    let fileData=$(this).prop("files")[0];
    let math =["image/png","image/jpg","image/jpeg"];// kiểm tra file ảnh thuộc định dạng nào
    let limit=1048576; //byte=1MB

    if($.inArray(fileData.type, math) === -1 ){
      alertify.notify("Kiểu file không hợp lệ, vui lòng chọn ảnh khác","error",7);
      $(this).val(null) // refesh lại thẻ avt 
      return false
    }

    if(fileData.size >limit){
      alertify.notify("Ảnh tối đa 1MB","error",7);
      $(this).val(null) // refesh lại thẻ avt 
      return false
    }
    // console.log(fileData);

    if(typeof (FileReader) != "undefined"){
        let imagePreview=$("#image-edit-profile");
        imagePreview.empty();// làm rỗng ;
        let fileReader=new FileReader();
        fileReader.onload=function(element){
          let image_show = `<img src="${element.target.result}" id="image-show" class="" alt="Images" style="display: block; width: 350px; height: 250px; margin:auto">`
          let image_main = `<img src="${element.target.result}" id="image-main" class="" alt="Images" style="display: none">`
          imagePreview.append(image_show)
          imagePreview.append(image_main)
        }
        imagePreview.show()
        fileReader.readAsDataURL(fileData);
    } else{
        alertify.notify("Trình duyệt của bạn không hỗ trọ FileReader","error",7);
    }
  })
}
function cancel_crop_image(){
   $("#cancel").unbind("click").bind("click", function(){
      let data_src = $("input#src_base64").val()
 	      let imagePreview=$("#image-edit-profile");
      imagePreview.empty();
      let image_show = `<img src="${data_src}" id="image-show" class="" alt="Images" style="display: block; width: 250px; height: 300px; margin:auto; border : 2px solid white">`
      imagePreview.append(image_show)
      imagePreview.show()
      $("#modal").modal('hide');
   })
}

function plate_detect(){
    $("button#send-image-plate").unbind('click').bind('click', function(){
        let data_src = $("input#src_base64").val()
        let brightness = $("input#brightness").val()
        let contrast = $("input#contrast").val()
        console.log(contrast, brightness, data_src)
        
    })
}

function volume_bar(){
  let brightness = document.getElementById("brightness");
  let contrast = document.getElementById("contrast");
  
  brightness.oninput = function() {
    $("#image-show").css("filter", `brightness(${this.value}%)`)
  }

  contrast.oninput = function() {
    $("#image-show").css("filter", `contrast(${this.value}%)`)
  }

}
function received(){
  $("#received-image-plate").unbind("click").bind("click", function(){
      let data = $("img#image-show-plate").attr("src")
      // $("img#avatar").attr("src", data)

      let imagePreview=$("#image-edit-profile");
      imagePreview.empty();
      let image_show = `<img src="${data}" id="image-show" class="" alt="Images" style="display: block;max-width : 330px; max-height:300px; min-width:150px; min-height:40px; margin:auto; border : 2px solid white">`
      imagePreview.append(image_show)
      imagePreview.show()
      $("#cancel_crop_image").empty()
	console.log(data)
      $("#cancel_crop_image").append(`<input style = "display:none" type="text" value="${data}" id="src_base64" name= "image">`)
      $("#cancel_crop_image").show()
  })
}
$(document).ready(function(){
  cancel_crop_image()
  volume_bar()
  // upload_image()
  plate_detect()
  received()
  
})
