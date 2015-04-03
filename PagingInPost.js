$(document).ready(function(){	
	CreateItems()	 ;  
	$(".spage183:first").css("display","block");
	$(".sitem183:first a").addClass("current183");
	$(".snumber-container a").click(function() {
		var showPage = $(this).attr("href");
		showPage = parseInt(showPage) - 1;
		$(".spage183").hide();
		$(".sitem183 a").removeClass("current183");
		$("#spaging-container > div.spage183:eq("+showPage+")").fadeIn();
		$(this).addClass("current183");
		//alert(showPage);
		return false;
	});
});
function CreateItems() {
	var a = document.getElementById('spaging-container'); 	
		nd = a.innerHTML.replace(/\$pageIn/gi, '<div class="spage183">'); 
		nd = nd.replace(/\$pageOut/gi, '</div><div class="clear"></div>');
		 a.innerHTML = nd;	
}
function NumberedPage(num,name,sep) {
		document.write('<div class="snumber-container" id="snumber-container"></div>');
		var i = 1;
		var txt = "";
		while(i <= num){
			if(num-i != 0){
				txt += "<span class='sitem183'><a href=\""+i+"\">"+name+" "+  i +"</a></span> " + sep + " ";
			}
			else {
				txt += "<span class='sitem183'><a href=\""+i+"\">"+name+" "+  i +"</a></span> ";
			}
			
			i++;
		}
		$("#snumber-container").html(txt);
	}
