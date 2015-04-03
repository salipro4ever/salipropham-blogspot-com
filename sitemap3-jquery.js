if (typeof jQuery == 'undefined') {
    cekjq = {};
    cekjq.s = document.createElement('script');
    cekjq.s.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
    document.getElementsByTagName('head')[0].appendChild(cekjq.s)
}
var postTitle = new Array();
var postUrl = new Array();
var postMp3 = new Array();
var postDate = new Array();
var postLabels = new Array();
var postBaru = new Array();
var sortBy = "titleasc";
var tocLoaded = false;
var numChars = 250;
var postFilter = '';
var numberfeed = 0;

function loadtoc(json) {
    function getPostData() {
        if ("entry" in json.feed) {
            var numEntries = json.feed.entry.length;
            numberfeed = numEntries;
            ii = 0;
            for (var i = 0; i < numEntries; i++) {
                var entry = json.feed.entry[i];
                var posttitle = entry.title.$t;
                var postdate = entry.published.$t.substring(0, 10);
                var posturl;
                for (var k = 0; k < entry.link.length; k++) {
                    if (entry.link[k].rel == 'alternate') {
                        posturl = entry.link[k].href;
                        break
                    }
                }
                var postmp3 = '';
                for (var k = 0; k < entry.link.length; k++) {
                    if (entry.link[k].rel == 'enclosure') {
                        postmp3 = entry.link[k].href;
                        break
                    }
                }
                var pll = '';
                if ("category" in entry) {
                    for (var k = 0; k < entry.category.length; k++) {
                        pll = entry.category[k].term;
                        var l = pll.lastIndexOf(';');
                        if (l != -1) {
                            pll = pll.substring(0, l)
                        }
                        postLabels[ii] = pll;
                        postTitle[ii] = posttitle;
                        postDate[ii] = postdate;
                        postUrl[ii] = posturl;
                        postMp3[ii] = postmp3;
                        if (i < 10) {
                            postBaru[ii] = true
                        } else {
                            postBaru[ii] = false
                        };
                        ii = ii + 1
                    }
                }
            }
        }
    }
    getPostData();
    sortBy = "titleasc";
    sortPosts(sortBy);
    sortlabel();
    tocLoaded = true;
    displayToc2();
    document.write('</br><a href="http://salipropham.blogspot.com" style="font-size: 8px; text-decoration:none; color: #616469;">designed by SaliproPham, Abu Farhan</a>')
}
function filterPosts(filter) {
    scroll(0, 0);
    postFilter = filter;
    displayToc(postFilter)
}
function allPosts() {
    sortlabel();
    postFilter = '';
    displayToc(postFilter)
}
function sortPosts(sortBy) {
    function swapPosts(x, y) {
        var temp = postTitle[x];
        postTitle[x] = postTitle[y];
        postTitle[y] = temp;
        var temp = postDate[x];
        postDate[x] = postDate[y];
        postDate[y] = temp;
        var temp = postUrl[x];
        postUrl[x] = postUrl[y];
        postUrl[y] = temp;
        var temp = postLabels[x];
        postLabels[x] = postLabels[y];
        postLabels[y] = temp;
        var temp = postMp3[x];
        postMp3[x] = postMp3[y];
        postMp3[y] = temp;
        var temp = postBaru[x];
        postBaru[x] = postBaru[y];
        postBaru[y] = temp
    }
    for (var i = 0; i < postTitle.length - 1; i++) {
        for (var j = i + 1; j < postTitle.length; j++) {
            if (sortBy == "titleasc") {
                if (postTitle[i] > postTitle[j]) {
                    swapPosts(i, j)
                }
            }
            if (sortBy == "titledesc") {
                if (postTitle[i] < postTitle[j]) {
                    swapPosts(i, j)
                }
            }
            if (sortBy == "dateoldest") {
                if (postDate[i] > postDate[j]) {
                    swapPosts(i, j)
                }
            }
            if (sortBy == "datenewest") {
                if (postDate[i] < postDate[j]) {
                    swapPosts(i, j)
                }
            }
            if (sortBy == "orderlabel") {
                if (postLabels[i] > postLabels[j]) {
                    swapPosts(i, j)
                }
            }
        }
    }
}
function sortlabel() {
    sortBy = "orderlabel";
    sortPosts(sortBy);
    var j = 0;
    var i = 0;
    while (i < postTitle.length) {
        temp1 = postLabels[i];
        firsti = j;
        do {
            j = j + 1
        } while (postLabels[j] == temp1);
        i = j;
        sortPosts2(firsti, j);
        if (i > postTitle.length) break
    }
}
function sortPosts2(firstvar, lastvar) {
    function swapPosts2(x, y) {
        var temp = postTitle[x];
        postTitle[x] = postTitle[y];
        postTitle[y] = temp;
        var temp = postDate[x];
        postDate[x] = postDate[y];
        postDate[y] = temp;
        var temp = postUrl[x];
        postUrl[x] = postUrl[y];
        postUrl[y] = temp;
        var temp = postLabels[x];
        postLabels[x] = postLabels[y];
        postLabels[y] = temp;
        var temp = postMp3[x];
        postMp3[x] = postMp3[y];
        postMp3[y] = temp;
        var temp = postBaru[x];
        postBaru[x] = postBaru[y];
        postBaru[y] = temp
    }
    for (var i = firstvar; i < lastvar - 1; i++) {
        for (var j = i + 1; j < lastvar; j++) {
            if (postTitle[i] > postTitle[j]) {
                swapPosts2(i, j)
            }
        }
    }
}
function displayToc(filter) {
    var numDisplayed = 0;
    var tocTable = '';
    var tocHead1 = 'Judul Artikel';
    var tocTool1 = 'Klik untuk sortir berdasarkan judul';
    var tocHead2 = 'Tanggal';
    var tocTool2 = 'Klik untuk Sortir bedasarkan tanggal';
    var tocHead3 = 'Kategori';
    var tocTool3 = '';
    if (sortBy == "titleasc") {
        tocTool1 += ' (descending)';
        tocTool2 += ' (newest first)'
    }
    if (sortBy == "titledesc") {
        tocTool1 += ' (ascending)';
        tocTool2 += ' (newest first)'
    }
    if (sortBy == "dateoldest") {
        tocTool1 += ' (ascending)';
        tocTool2 += ' (newest first)'
    }
    if (sortBy == "datenewest") {
        tocTool1 += ' (ascending)';
        tocTool2 += ' (oldest first)'
    }
    if (postFilter != '') {
        tocTool3 = 'Klik untuk menampilkan semua'
    }
    tocTable += '<table>';
    tocTable += '<tr>';
    tocTable += '<td class="toc-header-col1">';
    tocTable += '<a href="javascript:toggleTitleSort();" title="' + tocTool1 + '">' + tocHead1 + '</a>';
    tocTable += '</td>';
    tocTable += '<td class="toc-header-col2">';
    tocTable += '<a href="javascript:toggleDateSort();" title="' + tocTool2 + '">' + tocHead2 + '</a>';
    tocTable += '</td>';
    tocTable += '<td class="toc-header-col3">';
    tocTable += '<a href="javascript:allPosts();" title="' + tocTool3 + '">' + tocHead3 + '</a>';
    tocTable += '</td>';
    tocTable += '<td class="toc-header-col4">';
    tocTable += 'Download MP3';
    tocTable += '</td>';
    tocTable += '</tr>';
    for (var i = 0; i < postTitle.length; i++) {
        if (filter == '') {
            tocTable += '<tr><td class="toc-entry-col1"><a href="' + postUrl[i] + '">' + postTitle[i] + '</a></td><td class="toc-entry-col2">' + postDate[i] + '</td><td class="toc-entry-col3">' + postLabels[i] + '</td><td class="toc-entry-col4">' + '<a href="' + postMp3[i] + '">' + 'Download' + '</a>' + '</td></tr>';
            numDisplayed++
        } else {
            z = postLabels[i].lastIndexOf(filter);
            if (z != -1) {
                tocTable += '<tr><td class="toc-entry-col1"><a href="' + postUrl[i] + '">' + postTitle[i] + '</a></td><td class="toc-entry-col2">' + postDate[i] + '</td><td class="toc-entry-col3">' + postLabels[i] + '</td><td class="toc-entry-col4">' + '<a href="' + postMp3[i] + '">' + 'Download' + '</a>' + '</td></tr>';
                numDisplayed++
            }
        }
    }
    tocTable += '</table>';
    if (numDisplayed == postTitle.length) {
        var tocNote = '<span class="toc-note">Menampilkan Semua ' + postTitle.length + ' Artikel<br/></span>'
    } else {
        var tocNote = '<span class="toc-note">Menampilkan ' + numDisplayed + ' artikel dengan kategori \'';
        tocNote += postFilter + '\' dari ' + postTitle.length + ' Total Artikel<br/></span>'
    }
    var tocdiv = document.getElementById("toc");
    tocdiv.innerHTML = tocNote + tocTable
}
function displayToc2() {
    var j = 0;
    var i = 0;
    document.write('<div id="daftar-isi">');
    while (i < postTitle.length) {
        temp1 = postLabels[i];
        document.write('<div class="sublabel">');
        document.write('<div class="judul-label">' + temp1 + '</div>');
        document.write('<div class="judul-list"><ol>');
        firsti = j;
        var tempposition = 'odd';
        do {
            if (tempposition == 'odd') {
                document.write('<li class="data-list list-ganjil">');
                tempposition = 'even'
            } else {
                document.write('<li class="data-list list-genap">');
                tempposition = 'odd'
            }
            document.write('<a href="' + postUrl[j] + '">' + postTitle[j] + '</a>');
            if (postBaru[j] == true) {
                document.write(' - <strong><em><span style="color: rgb(255, 0, 0);">New !!</span> </em></strong>')
            };
            document.write('</li>');
            j = j + 1
        } while (postLabels[j] == temp1);
        i = j;
        document.write('</ol></div></div>');
        sortPosts2(firsti, j);
        if (i > postTitle.length) break
    }
    document.write('</div>')
}
function toggleTitleSort() {
    if (sortBy == "titleasc") {
        sortBy = "titledesc"
    } else {
        sortBy = "titleasc"
    }
    sortPosts(sortBy);
    displayToc(postFilter)
}
function toggleDateSort() {
    if (sortBy == "datenewest") {
        sortBy = "dateoldest"
    } else {
        sortBy = "datenewest"
    }
    sortPosts(sortBy);
    displayToc(postFilter)
}
function showToc() {
    if (tocLoaded) {
        displayToc(postFilter);
        var toclink = document.getElementById("toclink")
    } else {
        alert("Just wait... TOC is loading")
    }
}
function hideToc() {
    var tocdiv = document.getElementById("toc");
    tocdiv.innerHTML = '';
    var toclink = document.getElementById("toclink");
    toclink.innerHTML = '<a href="#" onclick="scroll(0,0); showToc(); Effect.toggle(' + "'toc-result','blind');" + '">¡í Menampilkan Daftar Isi</a> <img src="http://radiorodja.googlepages.com/new_1.gif"/>'
}
function looptemp2() {
    for (var i = 0; i < numberfeed; i++) {
        document.write('<br>');
        document.write('Post Link		  : ' + '<a href="' + postUrl[i] + '">' + postTitle[i] + '</a>' + '<br>');
        document.write('Download mp3  : ' + '<a href="' + postMp3[i] + '">' + postTitle[i] + '</a>' + '<br>');
        document.write('<br>')
    }
}