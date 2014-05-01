var img=new Array;var interval;var end_of_play=1;

function loadPresentation(id,images,height,width){ //функция инициализации презентации, где id - идентификатор блока для презентации, images - массив изображений, height - высота блока(не обязательно), width - ширина блока (не обязательно).
	if(!width){width='100%';}
	if(!height){height=document.getElementsByTagName('body')[0].clientHeight-30;}
	var innerBody="<div style='width:"+width+";height:"+height+";'><div class='expand' onclick='fullScreen("+'"'+id+'"'+");'></div><div class='showarea' id='"+id+"area' onclick='nextSlide("+'"'+id+'"'+");'><img class='mainImg'  alt='' id='"+id+"mainImg'></div><div class='closemenu' id='"+id+"closeMenu' onclick='closeMenu("+'"'+id+'"'+");'></div><div class='menu' id='"+id+"menu' ><div class='forImage' style='width:"+((images.length)*102)+"px;'>";
	for(var i=0;i<images.length;i++){innerBody+="<div class='menu oneImage' id='"+id+"img"+i+"' onclick='showImage("+'"'+id+'"'+","+i+");'><img class='menuImage'  src='"+images[i]+"' alt=''></div>";}
	innerBody+="</div></div><div class='controlpanel'><div class='next strelki' onclick='nextSlide("+'"'+id+'"'+");'></div><div class='prev strelki' onclick='prevSlide("+'"'+id+'"'+");' ></div><div class='numslide' id='"+id+"num'></div><div class='play' id='"+id+"play'><div onclick='playSlides("+'"'+id+'"'+");'><img src='Images/play.png' class='start_stop_img' alt=''>&nbsp;<span class='play_stop_text'>воспроизвести</span></div></div></div></div>";
	document.getElementById(id).innerHTML=innerBody;
	img[id]=new Array;
	img[id]=images;
	showImage(id,0);
}

function showImage(id,num){ //функция выбора слайда, где id - идентификатор блока для презентации, num - номер слайда.
	$("#"+id+"mainImg").fadeOut("fast",function(){
	document.getElementById(id+'mainImg').src=img[id][num];
	$("#"+id+"mainImg").fadeIn("fast");
		for(var i=0;i<img[id].length;i++){document.getElementById(id+'img'+i).style.border="1px solid #ccc";document.getElementById(id+'img'+i).style.borderTop="0px";}
	document.getElementById(id+'img'+num).style.border="1px solid #f00";
		if((num-(-1))*102>document.getElementById(id+'menu').offsetWidth+document.getElementById(id+'menu').scrollLeft){document.getElementById(id+'menu').scrollLeft=(num-(-1))*102;}
		if(num*102<document.getElementById(id+'menu').scrollLeft){document.getElementById(id+'menu').scrollLeft=(num-1)*102;}
	document.getElementById(id+'num').innerHTML=num-(-1);
	});
}

function nextSlide(id){ //функция переключения на следующий слайд, где id - идентификатор блока для презентации.
	if(document.getElementById(id+'num').innerHTML<img[id].length){
		showImage(id,document.getElementById(id+'num').innerHTML);
	} else{
	stopSlides(id);
	}
}

function prevSlide(id){ //функция переключения на предыдущий слайд, где id - идентификатор блока для презентации.
	if(document.getElementById(id+'num').innerHTML>1){
		showImage(id,document.getElementById(id+'num').innerHTML-2);
	}
}

function playSlides(id){ //функция автоматического воспроизведения, где id - идентификатор блока для презентации.
	clearInterval(interval);
	interval=setInterval('nextSlide('+'"'+id+'"'+');',7000);
	document.getElementById(id+'play').innerHTML="<div onclick='stopSlides("+'"'+id+'"'+");'><img src='Images/stop.png' class='start_stop_img' alt=''>&nbsp;<span class='play_stop_text'>остановить</span></div>";
}

function stopSlides(id){ //функция отмены автоматического воспроизведения, где id - идентификатор блока для презентации.
	clearInterval(interval);
	document.getElementById(id+'play').innerHTML="<div onclick='playSlides("+'"'+id+'"'+");'><img src='Images/play.png' class='start_stop_img' alt=''>&nbsp;<span class='play_stop_text'>воспроизвести</span></div>";
}

function fullScreen(id){ //функция разворачивания слайда на весь экран, где id - идентификатор блока для презентации.
	$("#"+id+"area").toggleClass("fullScreen");
	end_of_play=id;
}

function closeMenu(id){ //функция исчезновения или появления миниатюрных изображений, где id - идентификатор блока для презентации.
	$("#"+id+"closeMenu").toggleClass("openMenu");
	$("#"+id+"menu").toggleClass("dispNone");
}

function keyPress(e){ //функция отслеживания переключений слайдов
	key = e.keyCode || e.which;
		switch(key){
			case 37:prevSlide(end_of_play);break;
			case 39:nextSlide(end_of_play);break;
			case 27:fullScreen(end_of_play);break;
		}    
}