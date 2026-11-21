function splitGrids(indexes, className, title, page, insertPoint) {
    var n = 2;
    var $mainTables = $("." + className);
    for (var j = 0; j < $mainTables.length; j++) {
        var $table = $($mainTables[j]);
        $table.css("page-break-after", "always");
        var kk;
        for (var i = 0; i < indexes.length; i++) {
            var splitBy = indexes[i];
            var l = i + 1;
            if (i === indexes.length - 1) {
                l = i;
            }
            var nextSplitBy = indexes[l];
            var delta = 0;
            if (splitBy + nextSplitBy > $table[0].rows.length) {
                delta = nextSplitBy-splitBy;
            }
            kk = splitBy;
            var rows = $table[0].rows;
            var str = new Array();
            for (var k = delta; k < rows.length; k++) {
                str.push($(rows[k].outerHTML));
            }
            while ($table[0].rows.length > splitBy + ((delta>0)?delta+1:0)) {
                $table[0].deleteRow(splitBy + ((delta > 0) ? delta + 1 : 0));
            }
            if (kk < str.length) {
                var appended = $("<b>" + title + /*' ' + (j + 1) +*/ " - " + page + " " + n + "</b><br/>" + $table[0].outerHTML);
                if (insertPoint === null) {
                    insertPoint = $table.parent();
                }
                insertPoint.append(appended);
                var table = appended[2];
                while (table.tagName === 'DIV') {
                    table = table[0].children[0];
                }
                table.id = null;
                while (table.rows.length > 1)
                    table.deleteRow(1);
                if (delta > 0)
                    kk++;
                for (; kk < str.length; kk++) {
                    var row = table.insertRow(table.rows.length);
                    row.outerHTML = str[kk][0].outerHTML;
                }
                $table = $(table);
                n++;
            } else {
                n = 2;
                break;
            }
            if (i === indexes.length - 1) {
                i -= 2;
            }
        }
    }
}
