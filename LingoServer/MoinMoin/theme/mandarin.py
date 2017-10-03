# -*- coding: iso-8859-1 -*-
"""
MoinMoin Mandarin theme

@copyright: 2007 by RadomirDopieralski (moin@sheep.art.pl), Oliver Siemoneit ()
@license: GNU GPL, see COPYING for details.
"""

from MoinMoin import wikiutil, version
from MoinMoin import caching
from MoinMoin.theme import ThemeBase
from MoinMoin.Page import Page
import StringIO

class Theme(ThemeBase):

    name = "mandarin"

    _ = lambda x: x     # We don't have gettext at this moment, so we fake it
    icons = {
        # key         alt                        icon filename      w   h
        # FileAttach
        'attach':     ("%(attach_count)s",       "moin-attach.png",  7, 15),
        'attachimg':  (_("[ATTACH]"),            "attach.png",      24, 24),
        # RecentChanges
        'rss':        (_("[RSS]"),               "moin-rss.png",    24, 24),
        'deleted':    (_("[DELETED]"),           "moin-deleted.png",16, 16),
        'updated':    (_("[UPDATED]"),           "moin-updated.png",16, 16),
        'renamed':    (_("[RENAMED]"),           "moin-renamed.png",16, 16),
        'conflict':   (_("[CONFLICT]"),          "moin-conflict.png", 15, 15),
        'new':        (_("[NEW]"),               "moin-new.png",    16, 16),
        'diffrc':     (_("[DIFF]"),              "moin-diff.png",   16, 16),
        # General
        'bottom':     (_("[BOTTOM]"),            "moin-bottom.png", 14, 10),
        'top':        (_("[TOP]"),               "moin-top.png",    14, 10),
        'www':        ("[WWW]",                  "moin-www.png",    11, 11),
        'mailto':     ("[MAILTO]",               "moin-email.png",  14, 10),
        'news':       ("[NEWS]",                 "moin-news.png",   10, 11),
        'telnet':     ("[TELNET]",               "moin-telnet.png", 10, 11),
        'ftp':        ("[FTP]",                  "moin-ftp.png",    11, 11),
        'file':       ("[FILE]",                 "moin-ftp.png",    11, 11),
        # search forms
        'searchbutton': ("[?]",                  "moin-search.png", 12, 12),
        'interwiki':  ("[%(wikitag)s]",          "moin-inter.png",  16, 16),

        # smileys (this is CONTENT, but good looking smileys depend on looking
        # adapted to the theme background color and theme style in general)
        #vvv    ==      vvv  this must be the same for GUI editor converter
        'X-(':        ("X-(",                    'angry.png',       16, 16),
        ':D':         (":D",                     'biggrin.png',     16, 16),
        '<:(':        ("<:(",                    'frown.png',       16, 16),
        ':o':         (":o",                     'redface.png',     16, 16),
        ':(':         (":(",                     'sad.png',         16, 16),
        ':)':         (":)",                     'smile.png',       16, 16),
        'B)':         ("B)",                     'smile2.png',      16, 16),
        ':))':        (":))",                    'smile3.png',      16, 16),
        ';)':         (";)",                     'smile4.png',      16, 16),
        '/!\\':       ("/!\\",                   'alert.png',       15, 15),
        '<!>':        ("<!>",                    'attention.png',   15, 15),
        '(!)':        ("(!)",                    'idea.png',        16, 16),
        ':-?':        (":-?",                    'tongue.png',      16, 16),
        ':\\':        (":\\",                    'ohwell.png',      16, 16),
        '>:>':        (">:>",                    'devil.png',       16, 16),
        '|)':         ("|)",                     'tired.png',       16, 16),
        ':-(':        (":-(",                    'sad.png',         16, 16),
        ':-)':        (":-)",                    'smile.png',       16, 16),
        'B-)':        ("B-)",                    'smile2.png',      16, 16),
        ':-))':       (":-))",                   'smile3.png',      16, 16),
        ';-)':        (";-)",                    'smile4.png',      16, 16),
        '|-)':        ("|-)",                    'tired.png',       16, 16),
        '(./)':       ("(./)",                   'checkmark.png',   16, 16),
        '{OK}':       ("{OK}",                   'thumbs-up.png',   16, 16),
        '{X}':        ("{X}",                    'icon-error.png',  16, 16),
        '{i}':        ("{i}",                    'icon-info.png',   16, 16),
        '{1}':        ("{1}",                    'prio1.png',       16, 16),
        '{2}':        ("{2}",                    'prio2.png',       16, 16),
        '{3}':        ("{3}",                    'prio3.png',       16, 16),
        '{*}':        ("{*}",                    'star_on.png',     16, 16),
        '{o}':        ("{o}",                    'star_off.png',    16, 16),
    }
    del _

    def header(self, d):
        parts = [
            self.emit_custom_html(self.cfg.page_header1),
            self.msg(d),
            u'<div class="header">',
            self.logo(),
            self.searchform(d),
            self.username(d),
            self.gotobar(d),
            self.editbar(d),
            u'<h1>',
            self.title(d),
            u'</h1>',
            self.logged_trail(d),
            u'</div>',
            self.emit_custom_html(self.cfg.page_header2),
            u'<div class="wrapper">',
            self.sidebar(d),
            #self.startPage(),
            u'<div class="content"%s>\n' % self.content_lang_attr(),
        ]
        return u''.join(parts)

    editorheader = header

    def logged_trail(self, d):
        user = self.request.user
        html = u""
        if user.valid and user.show_page_trail:
            if len(user.getTrail())>1:
                html = self.trail(d)
        return html

    def footer(self, d, **keywords):
        page = d['page']
        parts = [
            self.endPage(),
            u'</div>',
             self.emit_custom_html(self.cfg.page_footer1),
            u'<div class="footer">',
            self.pageinfo(page),
            u'</div>',
            self.emit_custom_html(self.cfg.page_footer2),
        ]
        return u''.join(parts)

    def sidebar(self, d, **keywords):
        """ Display page called SideBar as an additional element on every page

        @param d: parameter dictionary
        @rtype: string
        @return: sidebar html
        """
        request = self.request
        _ = self.request.getText
        sidebar = request.getPragma('sidebar') or u'SideBar'
        page = Page(request, sidebar)
        if not page.exists():
            return u""
        import StringIO
        buff = StringIO.StringIO()
        request.redirect(buff)
        try:
            try:
                page.send_page(content_only=1, content_id="sidebar")
            except TypeError:
                page.send_page(request, content_only=1, content_id="sidebar")
        finally:
            request.redirect()
        return u'<div class="sidebar">%s</div>' % buff.getvalue()

    def editbar(self, d, **keywords):
        if not self.shouldShowEditbar(d['page']):
            return u''
        parts = [
            u'<div class="editbar">',
            self.edit_link(d),
            self.revert_link(d),
            self.info_link(d),
            self.admin_link(d),
            u'</div>',
        ]
        return u' '.join(parts)

    def edit_link(self, d):
        page = d['page']
        if not (page.isWritable() and
                self.request.user.may.write(page.page_name)):
            return self.login_link(d)
        _ = self.request.getText
        params = (wikiutil.quoteWikinameURL(page.page_name) +
                  '?action=edit')
        text = _('Edit', formatted=False)
        return wikiutil.link_tag(self.request, params, text, css_class="edit", name="texteditlink")

    def login_link(self, d):
        page = d['page']
        _ = self.request.getText
        params = (wikiutil.quoteWikinameURL(page.page_name) +
                  '?action=login')
        text = _('Locked', formatted=False)
        return wikiutil.link_tag(self.request, params, text, css_class="password")

    def info_link(self, d):
        page = d['page']
        _ = self.request.getText
        params = (wikiutil.quoteWikinameURL(page.page_name) +
                  '?action=info')
        text = _('History', formatted=False)
        return wikiutil.link_tag(self.request, params, text, css_class="history")

    def revert_link(self, d):
        try:
            rev = self.request.rev
        except AttributeError:
            return u""
        page = d['page']
        if not (self.request.rev and
                page.isWritable() and
                self.request.user.may.revert(page.page_name)):
            return u''
        _ = self.request.getText
        params = (wikiutil.quoteWikinameURL(page.page_name) +
                  '?action=revert&rev=%d' % self.request.rev)
        text = _('Revert', formatted=False)
        return wikiutil.link_tag(self.request, params, text, css_class="revert")

    def admin_link(self, d):
        page = d['page']
        _ = self.request.getText
        params = (wikiutil.quoteWikinameURL(page.page_name) +
                  '?action=PageActions')
        text = _('Actions', formatted=False)
        return wikiutil.link_tag(self.request, params, text, css_class="admin")

    def gotobar(self, d, **k):
        request = self.request
        found = {}
        items = []
        item = u'%s'
        current = d['page_name']
        if request.cfg.navi_bar:
            for text in request.cfg.navi_bar:
                #pagename, url = self.splitNaviurl(text)
                pagename, link = self.splitNavilink(text, localize=1)
                if pagename == current:
                    cls = 'wikilink current'
                else:
                    cls = 'wikilink'
                items.append(
                    '<li class="%s">%s</li>'%(cls, link)
                )
                found[pagename] = 1
        userlinks = request.user.getQuickLinks()
        for text in userlinks:
            #pagename, url = self.splitNaviurl(text, localize=0)
            pagename, link = self.splitNavilink(text, localize=0)
            if not pagename in found:
                if pagename == current:
                    cls = 'userlink current'
                else:
                    cls = 'userlink'
                items.append(
                    '<li class="%s">%s</li>' % (cls, link)
                )
                found[pagename] = 1
        return u'<ul class="gotobar">%s<li class="clear"></li></ul>' % u' '.join(items)

    def title(self, d):
        """ Assemble the title (now using breadcrumbs)

        @param d: parameter dictionary
        @rtype: string
        @return: title html
        """
        _ = self.request.getText
        if d['title_text'] == d['page'].split_title():
            # just showing a page, no action
            segments = d['page_name'].split('/')
            link_text = segments[-1]
            link_title = _('Click to do a full-text search for this title')
            link_query = { 'action': 'fullsearch', 'context': '180',
                            'value': 'linkto:"%s"' % d['page_name'], }
            link = d['page'].link_to(self.request, link_text,
                                     querystr=link_query, title=link_title,
                                     css_class='backlink', rel='nofollow')
            if len(segments) <= 1:
                html = link
            else:
                content = []
                curpage = ''
                for s in segments[:-1]:
                    curpage += s
                    content.append(Page(self.request,
                                        curpage).link_to(self.request, s))
                    curpage += '/'
                path_html = u'<span class="sep">/</span>'.join(content)
                html = u'<span class="pagepath">%s</span><span class="sep">/</span>%s' % (path_html, link)
        else:
            html = wikiutil.escape(d['title_text'])
        return u'<span id="pagelocation">%s</span>' % html

    def html_stylesheets(self, d):
        try:
            prefix = self.cfg.url_prefix_static
        except AttributeError:
            prefix = self.cfg.url_prefix
        url = '%s/%s/%s' % (prefix, self.name, 'style.css')
        return '<link rel="stylesheet" type="text/css" href="%s">' % url

    def searchform(self, d):
        _ = self.request.getText
        form = self.request.form
        updates = {
            'search_label' : _('Search:', formatted=False),
            'search_value': wikiutil.escape(form.get('value', [''])[0], 1),
            'search_full_label' : _('Text', formatted=False),
            'search_title_label' : _('Titles', formatted=False),
            }
        d.update(updates)

        return u'''
<form class="search" method="get" action="">
<p>
<input type="hidden" name="action" value="fullsearch">
<input type="hidden" name="context" value="180">
<label for="search">%(search_label)s</label>
<input id="search" type="text" name="value" value="%(search_value)s">
<input id="titlesearch" name="titlesearch" type="submit" value="%(search_title_label)s">
<input id="fullsearch" name="fullsearch" type="submit" value="%(search_full_label)s">
</p>
</form>''' % d

    def pageinfo(self, page):
        _ = self.request.getText
        html = ''
        if self.shouldShowPageinfo(page):
            info = page.lastEditInfo()
            if info:
                if info['editor']:
                    info = _("last edited %(time)s by %(editor)s", formatted=False) % info
                else:
                    info = _("last modified %(time)s", formatted=False) % info
                html = '<span class="time"%(lang)s>%(info)s</span>\n' % {
                    'lang': self.ui_lang_attr(),
                    'info': info
                    }
        return html

    def logo(self):
        logo = u''
        if self.cfg.logo_string:
            pagename = wikiutil.getFrontPage(self.request).page_name
            pagename = wikiutil.quoteWikinameURL(pagename)
            logo = wikiutil.link_tag(self.request, pagename, self.cfg.logo_string, css_class="logo")
        return logo

    def headscript(self, d):
        """Override the stupid default script with its hardcoded HTML structure"""
        return u'''<script type="text/javascript"><!--
function add_gui_editor_links() {
    // Add gui editor link after the text editor link

    // If the variable is not set or browser is not compatible, exit
    try {gui_editor_link_href}
    catch (e) {
        //alert("add_gui_editor_links: gui_editor_link_href not here");
        return
    }
    if (can_use_gui_editor() == false){
        //alert("add_gui_editor_links: can't use gui_editor");
        return;
    }
    var all = document.getElementsByName('texteditlink');
    for (i = 0; i < all.length; i++) {
        var textEditorLink = all[i];
        // Create a a link
        var guiEditorLink = document.createElement('a');
        guiEditorLink.href = gui_editor_link_href;
        guiEditorLink.className = "edit";
        var text = document.createTextNode(gui_editor_link_text);
        guiEditorLink.appendChild(text);
        // Insert in the editbar
        var editbar = textEditorLink.parentNode
        editbar.insertBefore(guiEditorLink, textEditorLink);
    }
}
--></script>
'''

    def recentchanges_entry(self, d):
        _ = self.request.getText
        if d['comments']:
            rccomm = ''
            for c in d['comments']:
                rccomm += ' <b>%d</b> ' % c[0];
                rccomm += c[1];
        else:
            rccomm = ''
        html = (u'''<li><b class="rctime">%s</b> %s %s . . . . <span class="rcauth">%s</span> <i class="rccomm">%s</i></li>''' % (
            d['time_html'],
            d['pagelink_html'],
            d['icon_html'],
            ', '.join(d['editors']),
            rccomm,
        ))
        return html

    def recentchanges_daybreak(self, d):
        return u'</ul><h3 class="rcdaybreak">%s</h3><ul>' % d['date']

    def recentchanges_header(self, d):
        return u'<div class="recentchanges"%s><ul>' % self.ui_lang_attr()

    def recentchanges_footer(self, d):
        return u'</ul></div>'


def execute(request):
    return Theme(request)

