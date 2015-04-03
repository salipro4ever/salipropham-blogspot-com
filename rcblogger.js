/*
*	Recent comments blogger - blogspot
*	Collected by SaliproPham {http://salipropham.blogspot.com}
*	Update 22/05/2012 
*/
function showrecentcomments(json) {
	var a_rc = numberOfComments;
	var o_rc = summaryLength;
	var m_rc = displayDate;
	var n_rc = displayArticle;
        for (var i = 0; i < a_rc; i++) {
                var b_rc = json.feed.entry[i];
                var c_rc;
                if (i == json.feed.entry.length) break;
                for (var k = 0; k < b_rc.link.length; k++) {
                        if (b_rc.link[k].rel == 'alternate') {
                                c_rc = b_rc.link[k].href;
                                break;
                        }
                }
				var linkCmt = c_rc;
				// c_rc: link day du cua comment
                c_rc = c_rc.replace("#", "#comment-");
                var d_rc = c_rc.split("#");
                d_rc = d_rc[0];
                var e_rc = d_rc.split("/");
                e_rc = e_rc[5];
                e_rc = e_rc.split(".html");
                e_rc = e_rc[0];			
                var f_rc = e_rc.replace(/-/g, " ");
                f_rc = f_rc.link(d_rc);
				
                var g_rc = b_rc.published.$t;				
                var h_rc = g_rc.substring(0, 4);
                var i_rc = g_rc.substring(5, 7);
                var j_rc = g_rc.substring(8, 10);
				var x_rc = g_rc.substring(11, 16);
				// get date of comment
				var dateCmt = x_rc + " " + j_rc + "/" + i_rc + "/" + h_rc;
                var k_rc = new Array();
                k_rc[1] = "Jan";
                k_rc[2] = "Feb";
                k_rc[3] = "Mar";
                k_rc[4] = "Apr";
                k_rc[5] = "May";
                k_rc[6] = "Jun";
                k_rc[7] = "Jul";
                k_rc[8] = "Aug";
                k_rc[9] = "Sep";
                k_rc[10] = "Oct";
                k_rc[11] = "Nov";
                k_rc[12] = "Dec";
                if ("content" in b_rc) {
                        var l_rc = b_rc.content.$t;
                } else if ("summary" in b_rc) {
                        var l_rc = b_rc.summary.$t;
                } else var l_rc = "";
                var re = /<\S[^>]*>/g;
                l_rc = l_rc.replace(re, "");
				// Open commemt
                document.write('<div class="rc-comments">');				
					//Display author
					document.write('<span id="rc-author"><a href="' + c_rc + '">' + b_rc.author[0].name.$t + '</a> : </span>');				
					// Display content
					if (o_rc == 0) {
							document.write('');
					} else {
							if (l_rc.length < o_rc) {                                
									document.write(l_rc);                                
							} else {                               
									l_rc = l_rc.substring(0, o_rc);
									var p_rc = l_rc.lastIndexOf(" ");
									l_rc = l_rc.substring(0, p_rc);
									document.write(l_rc + '&hellip;');
							}
					}
				// Footer comment
					document.write('<div id="rc-footer">');
						// Display date
							//Org: if (m_rc == true) document.write('On ' + k_rc[parseInt(i_rc, 10)] + ' ' + j_rc + ' ');
							if (m_rc == true) document.write("Lúc "+dateCmt);
						// Display article
							//Org: Hien thi ten bai viet: if (n_rc == true) document.write(' on ' + f_rc);
						if (n_rc == true) {					
							var r = "XEM";
							r = r.link(linkCmt);
							document.write(" | " + r);
						}	
					document.write('</div>');
				// Close comments
				document.write('</div>');
        }
}