﻿// Add ... in summary
function replaceDot(w,num){
var y=w;
var r = 0;
var s ="";
var t = 1;
a=y.replace(/\s/g,' ');
a=a.split(' ');
if(a.length > 1) {
 if(num >= a.length){
  num = a.length;t=0;}
 for (z=0; z<num; z++) {
  if (a[z].length > 0) {
    s += " " + a[z];
    r++;
  }
 }
 if(t==1) s+= "...";
 
} 
 return s;
}
function RecentFilteredPost(a)
{
    
   var b = this;
    var c = {
        BlogURL: "http://salipropham.blogspot.com",
        tag: ['Thủ thuật Blogspot'],
        maxPost: 10,
        containerId: "",
        thumbH: 32,
        thumbW: 32,
        ulClass: "",
        aClass: "recentNews",
        onLoad: false,
        defImg: "http://lh3.ggpht.com/--Z8SVBQZ4X8/TdDxPVMl_sI/AAAAAAAAAAA/jhAgjCpZtRQ/no-image.png",
        imgEna: -1,
        imgClass: "recentThumb",
        aPermaTitle: "",
        sumLenght: 40,
        titLenght: 20,
        tit0Lenght: 10, 
        showDesc: false
    };
    c = $.extend({}, c, a);
    if (!c.containerId)
    {
        c.containerId = "#recent-post";
        document.write('<div id="recent-post"></div>')
    }
    var d = $(c.containerId);
    var e = d.html();
    var f = 0;
    var g = function (a, b, e, f)
        {
            var g = e;
            var i = f;
            var j = a.feed.entry;
            if (j)
            {
                for (var k = 0; k < j.length; k++)
                {
                    var l = j[k];
                    var m = l.link;
                    var n = "";
                    for (var o = 0; o < m.length; o++)
                    {
                        if (m[o].rel == "alternate")
                        {
                            n = m[o].href;
                            break
                        }
                    }
                    var p = l.title.$t;
                    var q = c.defImg;
                    if ("media$thumbnail" in l) q = l.media$thumbnail.url;
                    var r = "content" in l ? l.content.$t : l.summary.$t;
                    k != 0 && c.imgEna == 1 ? h(p, n, "", "") : h(p, n, q, r);
                    if (g == "recent" && k == j.length - 1)
                    {
                        $("#iTgSwashata", d).remove()
                    }
                    else if (g == "filtered" && i == c.tag.length - 1 && k == j.length - 1)
                    {
                        $("#iTgSwashata", d).remove()
                    }
                }
            }
        };
    var h = function (a, b, d, e)
        {
            var f = $("li", i);
            for (var g = 0; g < f.length; g++)
            {
                var h = $("a", f.eq(g));
                if (h.attr("href") == b)
                {
                    return
                }
            }
           var a2 = a; 
           e = replaceDot(e,c.sumLenght);
           if(f.length==0) {a = replaceDot(a,c.tit0Lenght);}
           else { a = replaceDot(a,c.titLenght);}
             
            var j = "<li><a" + (c.aClass ? ' class="' + c.aClass + '"' : "") + ' href="' + b + '" title="' + c.aPermaTitle + " " + a2 + '">' + (c.imgEna && d != "" ? '<img class="' + c.imgClass + '" height="' + c.thumbH + '" width="' + c.thumbW + '" src="' + d + '"/>' : "") + a + "</a>" + (c.showDesc && e != "" ? "<div>" + e + "</div>" :"") + "</li>";
// SaliproIT mixed here
$("#recentCol2").html(i);
// End mix
            i.append(j)};
    var i;
    var j = function ()
        {
            d.html("");

            $('<div id="iTgSwashata">' + e + "</div>").appendTo(d);
            i = $('<ul class="' + c.ulClass + '"/>').appendTo(d);
            var a = "/feeds/posts/summary";
            if (c.tag.length == 0)
            {
                $.ajax(
                {
                    url: c.BlogURL + a,
                    data: {
                        "max-results": c.maxPost,
                        alt: "json-in-script"
                    },
                    success: function (a, b)
                    {
                        g(a, b, "recent", 0)
                    },
                    dataType: "jsonp",
                    cache: true
                })
            }
            else
            {
                for (var b = 0; b < c.tag.length; b++)
                {
                    $.ajax(
                    {
                        url: c.BlogURL + a,
                        data: {
                            category: c.tag[b],
                            "max-results": c.maxPost,
                            alt: "json-in-script"
                        },
                        dataType: "jsonp",
                        success: function (a, b)
                        {
                            g(a, b, "filtered", f);
                            f++
                        },
                        cache: true
                    })
                }
            }
        };

    if (c.onLoad) $(window).load(j);
    else $(document).ready(j)
}
