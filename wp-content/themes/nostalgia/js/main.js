jQuery(document).ready(function($) 
{
	var options={};
	var i = 0;
	var slide = new Array();
	for(i=0; i<config.backgrounds.length; i++)
	{
		slide[i] = {
			image: config.backgrounds[i],
			title: config.background_title[i]
		};
	}
	var page = new Object();
	for(i=0; i<config.link.length; i++)
		page[config["link"][i]] = {tab:config["direction"][i], className: config["icon"][i]};
	
	$('#nostalgia').nostalgia(options,page,slide);
	//audio
	if(typeof(config.tracks)!='undefined' && config.tracks!=null && config.tracks.length)
	{
		i=0;
		$("#jPlayer").jPlayer({
			ready: function() {
				$(this).jPlayer("setMedia", {
					mp3: config.tracks[i]
				});
				if(parseInt(config.music_autoplay))
				{
					$(this).jPlayer("play");
					var click = document.ontouchstart === undefined ? 'click' : 'touchstart';
					var kickoff = function () {
						$("#jPlayer").jPlayer("play");
						document.documentElement.removeEventListener(click, kickoff, true);
					};
					document.documentElement.addEventListener(click, kickoff, true);
				}
			},
			ended: function(){
				i++;
				if(i>=config.tracks.length)
					i=0;
				$(this).jPlayer("setMedia", {
					mp3: config.tracks[i]
				}).jPlayer("play");
			},
			swfPath: config.swfPath,
			loop: parseInt(config.music_loop)
		});
		$(".jPlayerControl").click(function(event){
			event.preventDefault();
			if($(this).hasClass("inactive") || $(this).hasClass("muted"))
			{
				$("#jPlayer").jPlayer("play");
				$("#jPlayerPortfolio").jPlayer("stop");
				$(".jPlayerControl").removeClass("inactive muted");
				$(".audio-item").removeClass("playing");

			}
			else
			{
				$("#jPlayer").jPlayer("pause");
				$(".jPlayerControl").addClass("muted");
			}
		});
	}
	$("#jPlayerPortfolio").jPlayer({
		ready: function() {
			var click = document.ontouchstart === undefined ? 'click' : 'touchstart';
			var kickoff = function () {
				$("#jPlayerPortfolio").jPlayer("play");
				document.documentElement.removeEventListener(click, kickoff, true);
			};
			document.documentElement.addEventListener(click, kickoff, true);
		},
		swfPath: config.swfPath,
		loop: parseInt(config.music_loop)
	});
	$(".audio-item").live("click", function(event){
		event.preventDefault();
		var self = $(this);
		$("#jPlayer").jPlayer("stop");
		$(".jPlayerControl").addClass("inactive").removeClass("muted");
		$("#jPlayerPortfolio").jPlayer("stop");
		var addClass = false;
		if(!$(this).hasClass("playing"))
		{
			$("#jPlayerPortfolio").jPlayer("setMedia", {
				mp3: self.attr("href")
			});
			$("#jPlayerPortfolio").jPlayer("play");
			addClass = true;
		}
		$(".audio-item").removeClass("playing");
		if(addClass)
			$(this).addClass("playing");
	});
	//widget control
	$(".widgetControl").click(function(){
		$(this).toggleClass("inactive");
		$(".sidebar-home").fadeToggle();
	});
	//home sidebar
	//twitter
	$(".widget_twitter ul").bxSlider(
	{
		auto:true,
		pause:5000,
		nextText:null,
		prevText:null,
		mode:'vertical',
		displaySlideQty:1,
		wrapperClass:'bx-wrapper bx-wrapper-twitter' 
	});
	//latest portfolio
	$('.fancybox-image.fancybox-latest-portfolio').fancybox({
		'titlePosition': 'inside'
	});
	/**************************************************************************/
	$('.fancybox-video.fancybox-latest-portfolio').bind('click',function() 
	{
		$("#jPlayer").jPlayer("stop");
		$(".jPlayerControl").addClass("inactive").removeClass("muted");
		$("#jPlayerPortfolio").jPlayer("stop");
		$(".audio-item").removeClass("playing");
		$.fancybox(
		{
			//'padding':0,
			'autoScale':false,
			'titlePosition': 'inside',
			'title': this.title,
			'transitionIn':'none',
			'transitionOut':'none',
			'width':(this.href.indexOf("vimeo")!=-1 ? 600 : 680),
			'height':(this.href.indexOf("vimeo")!=-1 ? 338 : 495),
			'href':(this.href.indexOf("vimeo")!=-1 ? this.href : this.href.replace(new RegExp("watch\\?v=", "i"), 'v/')),
			'type':(this.href.indexOf("vimeo")!=-1 ? 'iframe' : 'swf'),
			'swf':
			{
				'wmode':'transparent',
				'allowfullscreen':'true'
			}
		});

		return false;
	});
	/**************************************************************************/
	$(".fancybox-iframe.fancybox-latest-portfolio").fancybox({
		'width' : '75%',
		'height' : '75%',
		'autoScale' : false,
		'titleShow': false,
		'type' : 'iframe'
	});
	/**************************************************************************/
	$('a.fancybox-image.fancybox-latest-portfolio img,a.fancybox-video.fancybox-latest-portfolio img, .audio-item.fancybox-latest-portfolio img').each(function() 
	{
		$(this).attr('src',$(this).attr('src') + '?i='+getRandom(1,100000));
		$(this).bind('load',function() { $(this).parent('a').css('background-image','none'); $(this).fadeIn(1000); });
	});
        
        
        
             
                    $("#_rsBengalaWrapp div").hover(function(){$(this).css("background-position","bottom")},function(){$(this).css("background-position","top")});
                   
                   $("#nostalgia-navigation-close-button").on("click",function(){
                              
                               $("#_rsBengalaWrapp").fadeOut(500, function(){
                                    $("#_rsBengalaWrapp").attr("class","_rsIzquierda");
                                    $("#_rsBengalaWrapp").fadeIn(3000);
                                    })
                              
                   })
                
                
        
        
});



// EDITADO POR VICTOR ESPINOSA
function comparteFb(titulo,desc,imagen){
  // REFERENCIA
  // http://developers.facebook.com/docs/reference/dialogs/feed/
  
  // variables de prueba DEBEMOS CAMBIARLAS

//  var id= "458358780877780";// ESTE SOLO ES DE EJEMPLO PERO ES LA ID QUE TE DA FACEBOOK  
//  var link = "https://developers.facebook.com/docs/reference/dialogs/" // PAGINA QUE REFERENCIA EL POST
//  var picture = "http://knock-factory.com.mx/Bengala/wp-content/uploads/2012/11/Logo-1.png"// RUTA DE LA IMAGEN The picture must be at least 50px by 50px (though minimum 200px by 200px is preferred) 
//  var name = "Titulo del la liga"// TITULO DEL LINK QUE SE ENVIA LAS LETRAS AZULES
//  var caption = "Texto de la imagen a compartir" // SUBTITULO DEL LINK QUE SE ENVIA
//  var description = "Casa Bengala";
//  var redirect = "http://knock-factory.com.mx/Bengala/"; //PÁGINA A LA QUE SE VA DESPUES DE COMPARTIR 

  var id= "458358780877780";// ESTE SOLO ES DE EJEMPLO PERO ES LA ID QUE TE DA FACEBOOK  
  var link = "https://developers.facebook.com/docs/reference/dialogs/" // PAGINA QUE REFERENCIA EL POST
  var picture = imagen // RUTA DE LA IMAGEN The picture must be at least 50px by 50px (though minimum 200px by 200px is preferred) 
  var name = titulo// TITULO DEL LINK QUE SE ENVIA LAS LETRAS AZULES
  var caption = "Portafolio CasaBengala.tv" // SUBTITULO DEL LINK QUE SE ENVIA
  var description = desc;
  var redirect = "https://mighty-lowlands-6381.herokuapp.com/"; //PÁGINA A LA QUE SE VA DESPUES DE COMPARTIR 

  var url = "https://www.facebook.com/dialog/feed?";
  url += "app_id="+id+"&";
  url += "link="+link+"&";
  url += "picture="+picture+"&";
  url += "name="+name+"&";
  url += "caption="+caption+"&";
  url += "description="+description+"&";
  url += "redirect_uri="+redirect;
  
  window.location.href=url;
  
  
//  window.open(url, "_fbComparte", "menubar=yes,location=no,resizable=no,scrollbars=no,status=yes,width=500,height=400")
  
//  return url;

}

function comparteTw(titulo,desc,imagen){

//FORMATO DEL TWITT--->
//texto por default del twitt https://dev.twitter.com/pages/tweet-button vía @Nombre de la via

var text= titulo+": "+desc;
var link = imagen //"https%3A%2F%2Fdev.twitter.com%2Fpages%2Ftweet-button&";
var via="casabengalatv&";
var counturl = "nombre de la pagina a la que se le agregaran los twitts"


    var url = "https://twitter.com/share?";
    url+= "url="+link
    url+=   "&via="+via
    url+=  "&text="+text;
    url+="&counturl="+counturl;
    window.open(url, "twitterRs", "width=400, height=350")
}


function _rsCompartir(tipoRed){
    
    imgCompartir = document.getElementById("fancybox-img");
    var titulo = imgCompartir.getAttribute('title');
    var desc = imgCompartir.getAttribute('desc');
    var imagen = imgCompartir.getAttribute('src');


    switch (tipoRed){
    
    case "fb":
        comparteFb(titulo,desc,imagen)
    break;
    
    
    case "tw":
        comparteTw(titulo,desc,imagen)
    break;
    
    default:
        alert("no se selecciono una red válida")
    }
        
    }
    
    
function galleryImg(){
    alert("gallery IMG");
}

var _txtServicios = '<h3>SERVICIOS</h3>'
               _txtServicios += '<div role="tablist" class="nostalgia-accordion ui-accordion ui-widget ui-helper-reset">'
               _txtServicios += '<h3 tabindex="0" aria-selected="true" aria-expanded="true" role="tab" class="ui-accordion-header ui-helper-reset ui-state-active ui-corner-top">'
               _txtServicios += '<a style="background:#000000 url(\' http://knock-factory.com.mx/Bengala/wp-content/themes/nostalgia/images/icon_plus.png\') right center no-repeat;" tabindex="-1" href="#">ON<b>SCREEN</b></a>'
                _txtServicios +='</h3>'
                _txtServicios +='<div style="display: block;" role="tabpanel" class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active">'
               _txtServicios += '<p style="font-family:\'Novecentowide-Light\'; font-size:12px;">WEB <b>/</b> ANIMACIÓN <b>/</b> PRODUCCIÓN DE VIDEO <b>/</b> MOBILE APPS <b>/</b> REDES SOCIALES</p>'
               _txtServicios += '<ul class="image-list">'
               _txtServicios += '<li class="left">'
                _txtServicios +='<a style="border: 1px solid red; height: 180px; width: 480px;" href="http://player.vimeo.com/video/45931147?badge=0" class="fancybox-iframe" title="ON SCREEN PRUEBA">'
               _txtServicios += '<img style="height: 180px; width: 480px;" src="http://knock-factory.com.mx/Bengala/wp-content/uploads/2012/11/Logo-1-230x126.png" class="attachment-nostalgia-portfolio-thumb wp-post-image" alt="ONSCREEN" title="Logo (1)" desc="" height="126" width="230">'
               _txtServicios += '</a>'
               _txtServicios += '</li>'
               _txtServicios += '</ul>'
               _txtServicios += '</div>'
               _txtServicios += '<h3 tabindex="-1" aria-selected="false" aria-expanded="false" role="tab" class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-all">'
               _txtServicios += '<a tabindex="-1" href="#">ON<b>LOCATION</b></a>'
               _txtServicios += '</h3>'
               _txtServicios += '<div style="display: none;" role="tabpanel" class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom">'
               _txtServicios += '<p style="font-family:\'Novecentowide-Light\'; font-size:12px;">'
               _txtServicios += 'VIDEOMAPPING <b>/</b> HOLLOGRAPHIC PROJECTION <b>/</b> INSTALACIONES <b>/</b> 3D DISPLAY'
               _txtServicios += '</p>'
               _txtServicios += '<ul class="image-list">'
               _txtServicios += '<li class="left">'
               _txtServicios += '<a style="border: 1px solid red; height: 180px; width: 480px;" href="http://player.vimeo.com/video/45931147?badge=0" class="fancybox-iframe" title="Prueba de onlocation">'
               _txtServicios += '<img style="height: 180px; width: 480px;" src="http://knock-factory.com.mx/Bengala/wp-content/uploads/2012/11/Logo-1-230x126.png" class="attachment-nostalgia-portfolio-thumb wp-post-image" alt="ONLOCATION" title="Logo (1)" desc="" height="126" width="230">'
               _txtServicios += '</a>'
               _txtServicios +='<div style="width: 430px;" class="image-list-caption">'
               _txtServicios +='<div style="width: 430px;" class="image-list-caption">'
                _txtServicios +='<div class="image-list-caption-title">ONLOCATION</div>'
                _txtServicios +='<div class="image-list-caption-subtitle">Prueba de onlocation</div>'
                _txtServicios +='</div>'
                _txtServicios +='</li>'
                _txtServicios +='</ul>'
                _txtServicios +='</div></div>'
                
                
                
    var texto2 = '<h3>SERVICIOS</h3>'
    texto2 +='<div class="nostalgia-accordion ui-accordion ui-widget ui-helper-reset" role="tablist">'
    texto2 += '<h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-all" role="tab" aria-expanded="false" aria-selected="false" tabindex="0">'
    texto2 += '<a style="background:#000000 url(\' http://knock-factory.com.mx/Bengala/wp-content/themes/nostalgia/images/icon_plus.png\') right center no-repeat;" tabindex="-1" href="#">ON<b>SCREEN</b></a>'
    texto2 += '</h3>'
    texto2 += '<div class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" role="tabpanel" style="display: none;">'
    texto2 += '<p style="font-family:\'Novecentowide-Light\'; font-size:12px;">WEB <b>/</b> ANIMACIÓN <b>/</b> PRODUCCIÓN DE VIDEO <b>/</b> MOBILE APPS <b>/</b> REDES SOCIALES</p>'
    texto2 += '<ul class="image-list">'
    texto2 += '<li class="left">'
    texto2 += '<a class="fancybox-iframe" title="ON SCREEN PRUEBA" href="http://player.vimeo.com/video/45931147?badge=0" style="border: 1px solid red; height: 180px; width: 480px;">'
    texto2 += '<img class="attachment-nostalgia-portfolio-thumb wp-post-image" width="230" height="126" desc="" title="Logo (1)" alt="ONSCREEN" src="http://knock-factory.com.mx/Bengala/wp-content/uploads/2012/11/Logo-1-230x126.png" style="height: 180px; width: 480px;">'
    texto2 += '</a>'
    texto2 += '<div class="image-list-caption" style="width: 430px; display: none;">'
     texto2 += '<div class="image-list-caption-title"></div>'
     texto2 += '<div class="image-list-caption-subtitle"></div>'
     texto2 += ' </div>'
    texto2 += '</li>'
    texto2 += ' </ul>'
    texto2 += '</div>'
    texto2 += '<h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-all" role="tab" aria-expanded="false" aria-selected="false" tabindex="-1">'
    texto2 += '<a href="#" tabindex="-1">ONLOCATION</a>'
    texto2 += '</h3>'
     texto2 += '<div class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" role="tabpanel" style="display: none;">'
     texto2 += '<p style="font-family:\'Novecentowide-Light\'; font-size:12px;">'
     texto2 += 'VIDEOMAPPING <b>/</b> HOLLOGRAPHIC PROJECTION <b>/</b> INSTALACIONES <b>/</b> 3D DISPLAY'
     texto2 += '</p>'
      texto2 += '<ul class="image-list">'
      texto2 += '<li class="left">'
      texto2 += '<a class="fancybox-iframe" title="Prueba de onlocation" href="http://player.vimeo.com/video/45931147?badge=0" style="border: 1px solid red; height: 180px; width: 480px;">'
       texto2 += '<img class="attachment-nostalgia-portfolio-thumb wp-post-image" width="230" height="126" desc="" title="Logo (1)" alt="ONLOCATION" src="http://knock-factory.com.mx/Bengala/wp-content/uploads/2012/11/Logo-1-230x126.png" style="height: 180px; width: 480px;">'
       texto2 += '</a>'
       texto2 += '<div class="image-list-caption" style="width: 430px; display: none;">'
       texto2 += '<div class="image-list-caption-title"></div>'
       texto2 += '<div class="image-list-caption-subtitle"></div>'
       texto2 += '</div>'
       texto2 += '</li>'
      texto2 += '</ul>'
      texto2 += '</div>'
    texto2 +='</div>'
                
                
function galleryVideo(){
    $=jQuery;
    $(".fancybox-iframe").css({
    "border": "0px solid red",
    "height":"280px",
    "width":"480px",
    "margin-top":"-25px",
    "box-shadow":"3px 3px 5px #4b251b"
    });
    $(".fancybox-iframe img").css({
    "height":"280px",
    "width":"480px"
    });
    
    $(".image-list-caption").css({
        "width":"430px"
    })
    
// .parent()

    
// setTimeout(function(){
//// var txtDiv = $("#nostalgia-tab-content-page").html(texto2);
// },1000);
// $(".nostalgia-accordion div:first-child").html("Texto de prueba <br>"+txtDiv)
// $(".nostalgia-accordion div:last-child").html("Texto de prueba2 <br>"+txtDiv2)
  
    
}

