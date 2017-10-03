//
// FixedLeft Theme - Javascript Functions for MoinMoin 1.9.x
//
//  @copyright: 2007-2013 by Roger Haase
//  @license: GNU GPL
//
/*jslint browser: true, */
/*global $:false, confirm:false, document:false, prompt:false,
  can_use_gui_editor:false,
  escape:false, unescape:false, getElementsByClassName:false */


// override function of same name in common.js
function show_switch2gui() {
    // if gui editor possible, display the link to switch between text and gui editor
    'use strict';
    // Show switch to gui editor link if the browser is compatible
    if (can_use_gui_editor() === false) { return; }
    // instead of switch2gui, get xswitch2gui
    var switch2gui = document.getElementById('xswitch2gui');
    if (switch2gui) {
        switch2gui.style.display = 'block';
    }
}

// override and neuter common.js functions dealing with comments within wiki pages
function toggleComments() {
    'use strict';
    return false;
}
function show_toggleComments() {
    'use strict';
    return false;
}

// executed when user clicks on sidepanel edit action link
function tickle(x) {
    // get corresponding element without leading x in its name and click the hidden button in editor form
    'use strict';
    var yName, y;
    if (x.name) {
        yName = x.name.slice(1);
    } else {
        yName = x.parentNode.name.slice(1);
    }
    y = document.getElementsByName(yName);
    y = y[0];
    y.click();
    return false;
}

// executed when user clicks Save button after editing page (event set in fixedleft.py)
function checkComment(x) {
    // if no comment was entered for edit log, remind user
    'use strict';
    var editcomment = document.getElementById('editor-comment'),
        newComment;
    if (editcomment.value === "") {
        newComment = prompt("Enter optional comment for change log:", "");
        if (newComment === null) {
            // user hit cancel, cancel save
            return false;
        }
        editcomment.value = newComment;
    }
    // click submit button again
    tickle(x);
    return true;
}

// executed on page load
function check_loaddraft() {
    // if there is a draft version of page, show button in page actions panel
    'use strict';
    var el = document.getElementsByName('button_load_draft');
    if (el[0]) {
        el = document.getElementsByName('xbutton_load_draft');
        if (el[0]) {
            el[0].parentNode.style.display = '';
        }
    }
}

// executed on page load
function linksToThisPage() {
    // find all links pointing to this page and add classname 'thispage', thereby making links bold
    'use strict';
    var thispage, atags, i;
    if (document.getElementsByTagName("a") !== null) {
        thispage = document.location.href || document.location;
        atags = document.getElementsByTagName("a");
        for (i = 0;  i < atags.length;  i += 1) {
            if (atags[i].href === thispage) {
                atags[i].className = "thispage " + atags[i].className;
            }
        }
    }
}

// utility function used to find a nearby anchor
function getPriorAnchorId(comment) {
    // scan up the DOM looking for a prior element with an id and return the id
    'use strict';
    var node = comment;
    while (!$(node).attr('id')) {
        if (node.previousSibling) {
            node = node.previousSibling;
            while ($(node).attr('lastChild')) {
                node = node.lastChild;
            }
        } else {
            node = node.parentNode;
        }
    }
    return node.id;
}

// executed on page load if there are comments within this page
function initCommentProcessing() {
    // create a "Comments" sidebar panel with links to each comment
    'use strict';
    var i, comments, comment, anchorId, ulElement, liElement, aElement;
    function iconbarCommentDisplay(hide, show) {
        // utility function to set starting display of comment hide/show icons
        $('#iconbarComments :first-child').css('display', hide); // hide icon
        $('#iconbarComments :last-child').css('display', show); // show icon
    }
    // sync state of sidebar comments panel, iconbar comment button, and page comments
    // state of sidebar comments panel overrides server side user preferences
    if ($('#sidebarComments').length) {
        // there is a sidebar comments panel
        if ($('#sidebarComments').hasClass('showSidePanel')) {
            // starting state of sidebar comments panel is show comments
            iconbarCommentDisplay('inline', 'none');
            // inline-block is required for Firefox to display wiki-parser with class="comment"
            $('.comment').css('display', 'inline-block');
        } else {
            // starting state of sidebar comments panel is hide comments
            iconbarCommentDisplay('none', 'inline');
            $('.comment').css('display', 'none');
        }
    } else {
        // page has no sidebar comments panel, take user preferences default
        if ($('.comment').css('display') === 'none') {
            iconbarCommentDisplay('none', 'inline');
        } else {
            iconbarCommentDisplay('inline', 'none');
        }
    }
    // add number of comments to sidebar comments panel
    comments = $('.comment');
    $('#putNbrHere').text(comments.length + ' ' + $('#putNbrHere').text());
    // build hyperlinks to each comment and insert into sidebar
    ulElement = $('#putCommentLinksHere');
    if (ulElement.length) {
        for (i = 0; i < comments.length; i += 1) {
            comment = comments[i];
            anchorId = getPriorAnchorId(comment);
            liElement = document.createElement('li');
            aElement = document.createElement('a');
            aElement.setAttribute('href', '#' + anchorId);
            aElement.innerHTML = $(comment).text().slice(0, 50);
            liElement.appendChild(aElement);
            ulElement[0].appendChild(liElement);
        }
    }
    // add click handlers to sidebar comments panel and iconbar comment button
    $('#sidebarComments div').click(
        function () {
            // click handler to toggle comments, iconbar comments button; see click handler in makeSidePanelsCollapsible
            $('.comment').toggle();
            $('#iconbarComments').children('img').toggle();
        }
    );
    $('#iconbarComments').click(
        function () {
            // click handler for sidebar iconbar
            if ($('#sidebarComments > div').length) {
                // clicking sidebar comments panel will do everything needed
                $('#sidebarComments > div').click();
            } else {
                // toggle comments, iconbar comments button
                $('.comment').toggle();
                $('#iconbarComments').children('img').toggle();
            }
            return false; // do not scroll to top of page
        }
    );
}

// executed when user clicks on a link that will open in a new window, onclick event set in fixedleft.py
function newWikiWindow(t) {
    // open a wiki page in a new window
    'use strict';
    var href = t.href,
        winName,
        newWindow;
    // IE supports innerText, not textContent
    winName = t.textContent || t.innerText;
    // IE does not allow blanks in window names
    winName = winName.split(' ').join('');
    newWindow = window.open(href, winName, 'width=800,height=600,toolbar=yes,location=yes,directories=no,status=yes,menubar=yes,scrollbars=yes,copyhistory=no,resizable=yes,left=0,top=0');
    newWindow.focus();
    return false;
}

// executed when user clicks "Search Google" button, onclick event set in fixedleft.py
function searchGoogle() {
    // redirect wiki search form to google
    'use strict';
    var searchInput = document.getElementById('searchinput'),
        wikiUrl = document.getElementById('wikiUrl');
    if (searchInput && searchInput.value && wikiUrl) {
        searchInput = escape(searchInput.value);
        window.location = 'http://www.google.com/search?q=' + searchInput + '&sitesearch=' + wikiUrl.value;
        return false;
    }
}

// executed on page load
function tableOfContents() {
    // add table of contents panel to sidebar
    'use strict';
    var pageContent, headerList, tocPlace, ulElement, liElement, aElement, eClass, id, i;
    // find all headings within the wiki page
    pageContent = document.getElementById('page');
    headerList = $(':header', pageContent);
    if (headerList.length) {
        // build a structure like this:
        // UL
        //    LI
        //      A
        //    LI
        //      A .....
        tocPlace = document.getElementById('sidebarTOC');
        if (tocPlace) {
            ulElement = document.createElement('ul');
            for (i = 0; i < headerList.length; i += 1) {
                liElement = document.createElement('li');
                // make class names like sidebarToc_H1, sidebarTOC_H2, ...
                eClass = 'sidebarTOC_' + headerList[i].nodeName;
                liElement.setAttribute('class', eClass);
                aElement = document.createElement('a');
                // use existing ID on an anchor or find a nearby anchor up the DOM
                id = '';
                if (headerList[i].id) {
                    id = headerList[i].id;
                } else {
                    id = getPriorAnchorId(headerList[i]);
                }
                aElement.setAttribute('href', '#' + id);
                // IE supports innerText, not textContent
                aElement.innerHTML = headerList[i].textContent || headerList[i].innerText;
                liElement.appendChild(aElement);
                ulElement.appendChild(liElement);
            }
            // add current heading to sidebar table of contents
            tocPlace.appendChild(ulElement);
        }
    }
}

// executed on page load
function initMottieTableSorter() {
    'use strict';
    // determine which tables are suitable for sorting, create a thead if there is none, init mottie table sorter
    var thead, tbody, tfoot, cell, row;
    $('table').not('.donotsort').each(function (index, table) {
        // do not sort small tables with less than 4 rows or tables with colspan or rowspan in tbody
        if ($(table).find('tr').length < 4) { return; }
        if ($(table).parents('#page-history').length) { return; }
        if ($(table).parents('.userpref').length) { return; }
        row = ($(table).find('td[rowspan]'));
        if (row && row.length) { return; }
        row = ($(table).find('td[colspan]'));
        if (row && row.length) { return; }
        // do not sort (CSV) tables that have text starting with donotsort in first cell
        cell = $(table).find('tr:first-child').children('td:first-child').children('strong').text();
        if (cell.substring(0, 9) === 'donotsort') {
            // remove donotsort and get out
            $(table).find('tr:first-child').children('td:first-child').children('strong').text(cell.substring(9));
            return;
        }
        // make a thead if there is none, normal case
        if ($(table).children('thead').length === 0 && $(table).children('tbody').length) {
            // we have tbody but no thead, create a thead and move first tr from tbody
            thead = $('<thead>');
            $(thead).append($(table).children('tbody').children('tr:first-child').detach());
            $(table).prepend(thead);
        } else if ($(table).children('thead').length === 0 && $(table).children('tbody').length === 0) {
            // obsolete browser?  we have no thead nor a tbody - make first tr as thead, rest as tbody
            alert('no tbody');
            if ($(table).find('[rowspan]').length) { return; }
            if ($(table).find('[colspan]').length) { return; }
            thead = $('<thead>');
            tbody = $('<tbody>');
            $(tbody).append($(table).children('tr').detach());
            $(table).append(tbody); // if there was a footer, body is after footer
            $(thead).append($(table).children('tbody').children('tr:first-child').detach());
            $(table).prepend(thead);
        }
        // examine tbody for rows that have class of tfoot
        if ($(table).children('tbody').find('tr.tfoot').length) {
            if ($(table).children('tfoot').length) {
                // there is an existing tfoot, use it
                tfoot = $(table).children('tfoot');
            } else {
                tfoot = $('<tfoot>');
            }
            $(tfoot).append($(table).children('tbody').find('tr.tfoot').detach());
            $(table).children('thead').after(tfoot);
        }
        // examine tbody for last row that has a first cell beginning with tfoot
        tfoot = $(table).children('tbody').children('tr:last-child').children('td:first-child').text();
        if (tfoot.substring(0, 5) === 'tfoot') {
            $(table).children('tbody').children('tr:last-child').children('td:first-child').text(tfoot.substring(5));
            tfoot = $('<tfoot>');
            tfoot.append($(table).children('tbody').children('tr:last-child').detach());
            $(table).children('thead').after(tfoot);
        }
        // make table sortable
        $(table).addClass('tablesorter'); // class is not a requirement, just a status indicator, perhaps usefull for CSS
        $(table).tablesorter({ widgetOptions: {columns_tfoot : false} });
    });
}

// ========================================
// code for sidebar transformations starts here

// called when width of sidebar changes or entire sidebar is hidden/shown
function saveSidebarState(display, width) {
    // save current sidebar state, both show/hide (inline/none) and width of sidebar
    'use strict';
    //display is initially "", make it inline for cookie
    if (!display) {
        display = 'inline';
    }
    localStorage.FixedLeftSidebarDisplay = display;
    localStorage.FixedLeftSidebarWidth = width;
}

// executed on page load if sidebar should be hidden, also when user clicks hide sidebar icon
function hideSidebarPart2() {
    // function to hide sidebar, save left margin value , and copy wiki navigation under menu icon
    'use strict';
    var sidebar, w, altWikiNavMenu, wikiNavMenu, contentWikiMenu;
    sidebar = document.getElementById('sidebar');
    sidebar.style.display = 'none';
    // change the margin for page content
    w = document.getElementById('wikipagecontent');
    // should agree with css values
    w.style.marginLeft = '10px';
    // show the show and menu icons
    altWikiNavMenu = document.getElementById('altWikiNavMenu');
    altWikiNavMenu.style.display = 'inline';
    // move the sidebar navigation menu into the main right page - becomes sideways drop down via css
    wikiNavMenu = document.getElementById('wikiNavMenu');
    wikiNavMenu = wikiNavMenu.parentNode.removeChild(wikiNavMenu);
    contentWikiMenu = document.getElementById('contentWikiMenu');
    contentWikiMenu.appendChild(wikiNavMenu);

    // prevent popup panels from being hidden by bottom of page - add function to check status and fix
    $('div#altWikiNavMenu li.sidepanel div').mouseover(function () {
        var position = $(this).next().offset(), // position of div
            // we expect sidebarPos to be 0, but sometimes positive under edit and always positive on  edit preview
            sidebarPos = $('#sidebar').offset().top,
            winHeight = $(window).height(),
            ulPopup = $(this).next(),
            fudgeup = 8;
        // position popup panel relative to overlay icon; if needed slide upward to prevent popup extending below bottom of window
        if (position) {
            position.top = position.top - fudgeup - sidebarPos;
            if ((position.top + ulPopup.height()) > (winHeight - fudgeup)) {
                position.top = Math.max(sidebarPos, (winHeight - ulPopup.height() - fudgeup));
                $(this).next().offset(position);
            }
        }
    });
}

// executed when user clicks hidesidebar button
function hideSidebar() {
    // save sidebar state and then hide it
    'use strict';
    // hide the entire sidebar
    var sidebar = document.getElementById('sidebar');
    // subtract 3 for border width - this should agree with CSS
    saveSidebarState('none', sidebar.offsetWidth - 3);
    hideSidebarPart2();
}

// executed when user clicks "show sidebar" or "restore defaults" buttons
function showSidebar() {
    // restore sidebar to former width; remove hide sidebar mouseover event; restore contract/expand panels
    'use strict';
    var sidebar, wikipagecontent, altWikiNavMenu, wikiNavMenu, sidebarWikiMenu, width;
    $('div#altWikiNavMenu li.sidepanel div').unbind('mouseover');
    sidebar = document.getElementById('sidebar');
    sidebar.style.display = 'inline';
    // change margin of wiki page content
    wikipagecontent = document.getElementById('wikipagecontent');
    width = localStorage.FixedLeftSidebarWidth;
    wikipagecontent.style.marginLeft = (20 + parseInt(width, 10)) + 'px';
    sidebar.style.width = width + 'px';
    saveSidebarState(sidebar.style.display, width);
    // hide the show and menu icons
    altWikiNavMenu = document.getElementById('altWikiNavMenu');
    altWikiNavMenu.style.display = 'none';
    // copy the sidebar navigation menu back to sidebar
    wikiNavMenu = document.getElementById('wikiNavMenu');
    wikiNavMenu = wikiNavMenu.parentNode.removeChild(wikiNavMenu);
    sidebarWikiMenu = document.getElementById('sidebarWikiMenu');
    sidebarWikiMenu.appendChild(wikiNavMenu);
}

// executed when user clicks a sidebar panel header
function saveListOfCollapsedPanels() {
    // create a list of collapsed sidepanels and save in localStorage
    'use strict';
    var hidden = [],
        isEditor;
    $.each($("#wikiNavMenu > li.hideSidePanel"), function (index, value) { hidden[hidden.length] = value.id; });
    isEditor = $("div.isEditor").length;
    if (isEditor) {
        localStorage.FixedLeftEditCollapsedPanels = hidden;
    } else {
        localStorage.FixedLeftViewCollapsedPanels = hidden;
    }
    return false;
}

// executed on page load
function restoreSidePanelState() {
    // restore sidebar to last saved state
    'use strict';
    var isEditor, i, collapsed, wikipagecontent, display, width, sidebar;
    // is this the editor?
    isEditor = $("div.isEditor").length;
    if (isEditor) {
        collapsed = localStorage.FixedLeftEditCollapsedPanels;
    } else {
        collapsed = localStorage.FixedLeftViewCollapsedPanels;
    }
    // make all panels visible
    $("#wikiNavMenu > li").removeClass("hideSidePanel").addClass("showSidePanel");
    if (collapsed) {
        // get list of IDs that should be collapsed and hide them
        collapsed = collapsed.split(',');
        for (i = 0; i < collapsed.length; i += 1) {
            $('#' + collapsed[i]).removeClass("showSidePanel").addClass("hideSidePanel");
        }
    }
    // panels are now in sequence and expanded/collapsed; adjust width or show/hide entire sidebar per saved state
    display = localStorage.FixedLeftSidebarDisplay;
    width = localStorage.FixedLeftSidebarWidth;
    wikipagecontent = document.getElementById('wikipagecontent');
    if (width && wikipagecontent) {
        // sidebar was changed in one way or another
        if (display === 'inline') {
            // sidebar visible - adjust width and margins
            wikipagecontent.style.marginLeft = (parseInt(width, 10) + 20) + 'px';
            sidebar = document.getElementById('sidebar');
            sidebar.style.width = width + 'px';
        } else {
            // sidebar was hidden, hide it again without saving state from page load
            hideSidebarPart2();
        }
    }
}

// executed on page load
function makeSidePanelsCollapsible() {
    // assign a click event to show/hide panel contents
    'use strict';
    function toggleShowHide(that) {
        // collapse/expand sidebar panels (li.sidepanel) by alternating show/hide css class
        var ele = that.parentNode;
        if ($(ele).hasClass("hideSidePanel")) {
            $(ele).removeClass("hideSidePanel").addClass("showSidePanel");
        } else {
            $(ele).removeClass("showSidePanel").addClass("hideSidePanel");
        }
    }
    $('li.sidepanel').not('#sidebarIconBar, #sidebarLogo').children('div').click(
        function () {
            toggleShowHide(this);
            saveListOfCollapsedPanels();
        }
    );
}

// click handler that is executed when a user moves mouse off of popup panel; initialized by panelPopUp
function panelPopDown(elem) {
    // flip css classes to hide popup on mouseout
    'use strict';
    $(elem).parent().parent().removeClass("popup-detail").addClass("hide-detail");
}
// executed when user mouses over a collapsed panel indicator icon -- icon-caret-right
function panelPopUp(elem) {
    'use strict';
    // flip css classes so a collapsed panel is visible on mouseover
    var oldElem = $(".popup-detail i"),
        position = $(elem).offset(), // position of <img> icon
        // usually sidebarPos is 0, but it is sometimes positive under edit and always positive on  edit preview
        sidebarPos = $('#sidebar').offset().top,
        winHeight = $(window).height(),
        ulPopup = $(elem).parent().next(),
        fudgeup = 14,
        fudgeleft = 0;
    if (oldElem) { panelPopDown(oldElem); } // make sure there is only 1 popup at a time
    $(elem).parent().parent().addClass("popup-detail").removeClass("hide-detail");
    // position popup panel relative to overlay icon; if needed slide upward to prevent popup extending below bottom of window
    position.top = position.top - fudgeup - sidebarPos;
    position.left = position.left - fudgeleft;
    if ((position.top + ulPopup.height()) > (winHeight - fudgeup)) {
        position.top = Math.max(0, (winHeight - ulPopup.height() - fudgeup));
    }
    $(elem).parent().next().css(position);
    $(elem).parent().next().mouseleave(function () {panelPopDown(elem); });
}

// executed after sidebar width drag event
function sidebarWasResized() {
    // adjust left margin of wikipagecontent after resizing width of  sidebar
    'use strict';
    var sidebar, wikipagecontent;
    // side effect of resizing sidebar width is fixing height in pixels, set it back to 100%
    sidebar = document.getElementById('sidebar');
    sidebar.style.height = '100%';
    // set left margin of wikipagecontent to width of sidebar + 20 px
    wikipagecontent = document.getElementById('wikipagecontent');
    wikipagecontent.style.marginLeft = 20 + sidebar.offsetWidth + 'px';
    saveSidebarState(sidebar.style.display, sidebar.offsetWidth - 3);
}

// called on page load and after user modifies panel sequence in sidebar options table
function sortSidebarPanels() {
    'use strict';
    // sort sidebar panels per user preference
    var isEditor = $("div.isEditor").length,
        sortedPanels;
    if (isEditor) {
        sortedPanels = localStorage.FixedLeftEditSortedPanels;
    } else {
        sortedPanels = localStorage.FixedLeftViewSortedPanels;
    }
    if (sortedPanels) {
        sortedPanels = sortedPanels.split(',');
        $($(sortedPanels).get().reverse()).each(function (key, panelId) {
            if (panelId.length && $('#' + panelId).length) {
                $('#wikiNavMenu').prepend(($('#' + panelId)).detach());
            }
        });
    }
}

// called on page load and if user clicks Restore Defaults > Sidebar Options
function findPanelIds(panels) {
    'use strict';
    var origPanelSequence = [];
    $.each($("#wikiNavMenu > li.sidepanel"), function (index, li) {
        // save sequence of panels in case user later clicks Restore Default
        origPanelSequence[origPanelSequence.length] = li.id;
        // remember the panel ID of every panel ever seen (in case of custom sidebars)
        panels[li.id] = $(li).children('div').children('span').text();
        if (li.id === 'sidebarComments') {
            // remove leading number
            panels[li.id] = panels[li.id].replace(/^\d+\s*/, '');
        }
    });
    return [panels, origPanelSequence];
}

// executed when user clicks sidebar options button
function showSidebarOptions() {
    'use strict';
    // create sidebar options table and add to wikipagecontent
    var sortedPanels,
        hiddenPanels = localStorage.FixedLeftHiddenPanels || '',
        isEditor = $("div.isEditor").length,
        panels,
        checkBox,
        trtd,
        optionsTable = [
            '<table id="sidebarOptions"><thead><tr>',
            '<th>hidden column of IDs as text</th>',
            '<th><button type="button" class="donebutton">OK</button></th>',
            '<th><button type="button" class="defaultbutton">Restore Defaults</button></th>',
            '</tr><tr>',
            '<th>ID</th><th>Hide </th><th>Panel Name</th>',
            '</tr></thead>',
            '<tbody id="putPanelRowsHere" title="drag rows up or down to sort">',
            '</tbody></table>'
        ].join('\n');
    $(document).scrollTop(0);
    if ($('#sidebarOptions').length) {
        // user clicked wrench icon twice, remove the sidebar options table
        $('#sidebarOptions').remove();
        return;
    }
    // start to build options table
    optionsTable = $(optionsTable);
    $('#wikipagecontent').prepend(optionsTable);
    // edit and view modes have different panels
    if (isEditor) {
        if (localStorage.FixedLeftEditPanelIds) {
            panels = $.parseJSON(localStorage.FixedLeftEditPanelIds);
        } else {
            panels = findPanelIds([])[0];
        }
        sortedPanels  = (localStorage.FixedLeftEditSortedPanels || '').split(',');
    } else {
        if (localStorage.FixedLeftViewPanelIds) {
            panels = $.parseJSON(localStorage.FixedLeftViewPanelIds);
        } else {
            panels = findPanelIds({})[0];
        }
        sortedPanels  = (localStorage.FixedLeftViewSortedPanels || '').split(',');
    }
    // add a row to options table for each known panel
    $.each(panels, function (panelId, panelName) {
        if (hiddenPanels.indexOf(panelId) >= 0) {
            checkBox = '</td><td><input type="checkbox" checked></td><td>';
        } else {
            checkBox = '</td><td><input type="checkbox"></td><td>';
        }
        trtd = '<tr id="x' + panelId + '"><td>';
        $('#putPanelRowsHere').append($(trtd + panelId + checkBox + panelName + '</td></tr>'));
    });
    // hide the table column containing element IDs
    $('#sidebarOptions tr > *:first-child').hide();
    // sort the sidebar options table
    if (sortedPanels.length) {
        $($(sortedPanels).get().reverse()).each(function (key, panelId) {
            if (panelId.length && $('#x' + panelId).length) {
                $('#putPanelRowsHere').prepend(($('#x' + panelId)).detach());
            }
        });
    }
    // make rows in sidebar options table body sortable
    $("#putPanelRowsHere").sortable({
        update: function () {
            // executed after user sorts sidebar panels within options menu; save the new order and sort sidebar
            sortedPanels = [];
            $('#putPanelRowsHere tr').each(function (index, tr) {
                sortedPanels[sortedPanels.length] = $(tr).children(':first').text();
            });
            if (isEditor) {
                localStorage.FixedLeftEditSortedPanels = sortedPanels.join(',');
            } else {
                localStorage.FixedLeftViewSortedPanels = sortedPanels.join(',');
            }
            sortSidebarPanels();
        }
    });
    // add click event to hide/show a sidebar panel
    $('#putPanelRowsHere input').click(function (event) {
        // hide or show the panel corresponding to the clicked checkbox
        var panelId = $(event.target).parent().prev().text(),
            revisedHiddenPanels = [];
        if ($(event.target).is(':checked')) {
            $('#' + panelId).hide();
        } else {
            $('#' + panelId).show();
        }
        // save the list of checked panelIds
        $('#putPanelRowsHere tr').each(function (index, tr) {
            if ($(tr).find('input').is(':checked')) {
                revisedHiddenPanels[revisedHiddenPanels.length] = $(tr).children(':first').text();
            }
        });
        localStorage.FixedLeftHiddenPanels = revisedHiddenPanels.join(',');
    });
    // add click event to OK button
    $('#sidebarOptions button:first').click(function () {
        $('#sidebarOptions').remove();
    });
    // add click event to Restore Defaults button
    $('#sidebarOptions button:last').click(function () {
        var hidePanels = localStorage.FixedLeftHiddenPanels || '';
        // restore original panel sequence
        localStorage.FixedLeftEditSortedPanels = localStorage.FixedLeftEditOrigPanelSequence;
        localStorage.FixedLeftViewSortedPanels = localStorage.FixedLeftViewOrigPanelSequence;
        sortSidebarPanels();
        // unhide any hidden panels
        if (hidePanels.length) {
            hidePanels = hidePanels.split(',');
            $(hidePanels).each(function (key, panelId) {
                $('#' + panelId).show();
            });
        }
        // restore sidebar original width and display
        if ($('#sidebar').css('display') !== 'block') { showSidebar(); }
        $('#sidebar').css('width', localStorage.FixedLeftOrigSidebarWidth);
        $('#wikipagecontent').css('margin-left', localStorage.FixedLeftOrigContentLeftMargin);
        // expand any collapsed panels
        $('.hideSidePanel').removeClass('hideSidePanel').addClass('showSidePanel');
        // delete theme data from local storage
        localStorage.FixedLeftEditCollapsedPanels = '';
        // localStorage.FixedLeftEditOrigPanelSequence = '';
        localStorage.FixedLeftEditPanelIds = '';
        localStorage.FixedLeftEditSortedPanels = '';
        localStorage.FixedLeftHiddenPanels = '';
        // localStorage.FixedLeftOrigContentLeftMargin = '';
        // localStorage.FixedLeftOrigSidebarWidth = '';
        localStorage.FixedLeftSidebarDisplay = '';
        localStorage.FixedLeftSidebarWidth = '';
        localStorage.FixedLeftViewCollapsedPanels = '';
        // localStorage.FixedLeftViewOrigPanelSequence = '';
        localStorage.FixedLeftViewPanelIds = '';
        localStorage.FixedLeftViewSortedPanels = '';
        // remove sidebar options table
        $('#sidebarOptions').remove();
    });
}

// when DOM is ready, do stuff
$(document).ready(function () {
    'use strict';
    // if there is an unsaved draft version of this page, add a Load Draft button
    check_loaddraft();
    // make links pointing to this page bold
    linksToThisPage();
    // add table of contents to sidebar
    tableOfContents();
    // add a click event to sidebar panel headers to make them collapse/expand
    makeSidePanelsCollapsible();
    // add mouseover action handler to icon that will popup the ul below a contracted sidebar panel
    $(".contractIcon").not('.noMouseoverAction').mouseover(function () {panelPopUp(this); });
    // make sidebar resizeable
    $("div#sidebar").resizable({
        handles: 'e',
        minWidth: 100,
        maxWidth: 1000,
        stop: function (event, ui) {
            sidebarWasResized(event, ui);
        }
    });
    // add single click handler to all headings - scroll clicked heading to top of page
    $(':header').click(function () {
        // this is complicated by need to work around double-click to edit function
        var that = this;
        // start or increment a click count
        if ($(this).data("clkCount")) {
            $(this).data("clkCount", 1 + $(this).data("clkCount"));
        } else {
            $(this).data("clkCount", 1);
        }
        // delay start of scroll to top in case there is another click coming
        setTimeout (function () {
            if ($(that).data("clkCount") === 2) {
                // this is the first click of a doubleclick, set flag for second click and do nothing
                $(that).data("clkCount", 3);
                return;
            } else {
                if ($(that).data("clkCount") === 3) {
                    // this is second click of a double click, zero count and do nothing
                    $(that).data("clkCount", 0);
                    return;
                }
            }
            // this is a single click, zero count and scroll page
            $(that).data("clkCount", 0);
            location.hash = that.id;
        },400);
    });
    // if there are comments within this page initialize processing, else eliminate display of comment buttons and links
    if ($('.comment').length) {
        initCommentProcessing();
    } else {
        $('li#sidebarComments').css('display', 'none');
        $('#iconbarComments').css('display', 'none');
    }
    // initialize and update local storage
    var hiddenPanels = localStorage.FixedLeftHiddenPanels || '',
        isEditor = $("div.isEditor").length,
        origPanelSequence,
        panels;
    // extract and save initial state of sidebar
    localStorage.FixedLeftOrigSidebarWidth = $('#sidebar').css('width');
    localStorage.FixedLeftOrigContentLeftMargin = $('#wikipagecontent').css('margin-left');
    // create a list of all sidebar panels ever seen (if case a wiki page has pragma sidebar xxxx)
    if (isEditor) {
        panels = localStorage.FixedLeftEditPanelIds;
    } else {
        panels = localStorage.FixedLeftViewPanelIds;
    }
    if (!panels) {
        panels = {};
    } else {
        panels = $.parseJSON(panels);
    }
    origPanelSequence = findPanelIds(panels);
    panels = origPanelSequence[0];
    origPanelSequence = origPanelSequence[1];
    if (isEditor) {
        localStorage.FixedLeftEditOrigPanelSequence = origPanelSequence.join(',');
        localStorage.FixedLeftEditPanelIds = JSON.stringify(panels);
    } else {
        localStorage.FixedLeftViewOrigPanelSequence = origPanelSequence.join(',');
        localStorage.FixedLeftViewPanelIds = JSON.stringify(panels);
    }
    // sort sidebar panels per user option
    restoreSidePanelState();
    sortSidebarPanels();
    // load list of hidden sidebar panels and hide them
    if (hiddenPanels.length) {
        hiddenPanels = hiddenPanels.split(',');
        $(hiddenPanels).each(function (key, panelId) {
            $('#' + panelId).hide();
        });
    }
    // set click handlers to hideSidebar  showSidebar, and show sidebar options table icons
    $('#hideSidebarIcon').click(function () { hideSidebar(); });
    $('#optionsToolIcon').click(function () { showSidebarOptions(); });
    $('#showSidebarIcon').click(function () { showSidebar(); });
    // initialize Mottie tablesoreter
    initMottieTableSorter();
});
