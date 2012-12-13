/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$=jQuery;
 
var imagenesArray = [];
    var imagenesCarpeta="";
    var contenedorIMG="#fancybox-img";
    var carrusellIMG = "#_carrWrapp";
    var claseThumbs = "_btnThumbs"
  
    var NuevaImagen = function(id,src){
        this.img = $('<img>');
        this.id = id;
        this.src = imagenesCarpeta+"/"+src;
    }
    
    NuevaImagen.prototype.creaImagen = function(){
        this.img.attr({
            "id":this.id,
            "src":this.src,
            "class": claseThumbs,
            "onClick":"cambiarIMG(this)"
        });
        this.img.appendTo(carrusellIMG)
    }
     
    function cambiarIMG(imgIntro){
        var imgActual = $(contenedorIMG);
        var imgTemp = imgActual.attr("src");
        
        imgActual.fadeOut(500, function(){
            imgActual.attr("src",imgIntro.src);
            imgIntro.src = imgTemp;   
            imgActual.fadeIn(500);
        })
    }

    
    function creaReel(){
        for (i=0;i<imagenesArray.length;i++){
            img = new NuevaImagen("img"+i,imagenesArray[i]);
            img.creaImagen();
        }
    }
    
    /// ENTRADA A LA GALERÍA, RECIBE UN ARREGLO QUE ES EL QUE PONDRÁ EN EL HTML, COMENZANDO POR LA CARPETA DONDE SE ENCUENTRAN LAS IMAGENES
    /// SEPARADO CON ":", LAS IMAGENES DEBEN IR DESPUES SEPARADAS POR COMA
        function mainGaleria(objetoGaleria){
        if(imagenesArray!=""){
            imagenesArray="";
            $(carrusellIMG).html("");
            
        }
        imagenesCarpeta = objetoGaleria.substring(0, objetoGaleria.indexOf(":"));
        imagNomTmp = objetoGaleria.substring(objetoGaleria.indexOf(":")+1,objetoGaleria.length);
        imagenesArray = imagNomTmp.split(",");
        creaReel();
    }

