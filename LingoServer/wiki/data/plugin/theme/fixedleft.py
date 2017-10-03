# -*- coding: iso-8859-1 -*-
"""
    @copyright: 2003-2008 MoinMoin:ThomasWaldmann
    copyright: 2007-2013 by Roger Haase - changes for fixedleft theme
    @license: GNU GPL, see COPYING for details.
"""

import re

from MoinMoin import wikiutil
from MoinMoin.action import get_available_actions
from MoinMoin.Page import Page
from MoinMoin.theme import ThemeBase

from MoinMoin import log
logging = log.getLogger(__name__)

class Theme(ThemeBase):
    """
    This is the fixedleft theme.  The htdocs/css and /img directories were copied from
    the Moin 1.9.2 modernized theme and modified as needed.
    """

    name = "fixedleft"

    # a copy of the icons dict from Moin 1.9.2 modernized theme follows
    _ = lambda x: x     # We don't have gettext at this moment, so we fake it
    icons = {
        # key         alt                        icon filename      w   h
        # FileAttach
        'attach':     ("%(attach_count)s", "moin-attach.png", 16, 16),
        'info':       ("[INFO]", "moin-info.png", 16, 16),
        'attachimg':  (_("[ATTACH]"), "attach.png", 32, 32),
        # RecentChanges
        'rss':        (_("[RSS]"), "moin-rss.png", 16, 16),
        'deleted':    (_("[DELETED]"), "moin-deleted.png", 16, 16),
        'updated':    (_("[UPDATED]"), "moin-updated.png", 16, 16),
        'renamed':    (_("[RENAMED]"), "moin-renamed.png", 16, 16),
        'conflict':   (_("[CONFLICT]"), "moin-conflict.png", 16, 16),
        'new':        (_("[NEW]"), "moin-new.png", 16, 16),
        'diffrc':     (_("[DIFF]"), "moin-diff.png", 16, 16),
        # General
        'bottom':     (_("[BOTTOM]"), "moin-bottom.png", 16, 16),
        'top':        (_("[TOP]"), "moin-top.png", 16, 16),
        'www':        ("[WWW]", "moin-www.png", 16, 16),
        'mailto':     ("[MAILTO]", "moin-email.png", 16, 16),
        'news':       ("[NEWS]", "moin-news.png", 16, 16),
        'telnet':     ("[TELNET]", "moin-telnet.png", 16, 16),
        'ftp':        ("[FTP]", "moin-ftp.png", 16, 16),
        'file':       ("[FILE]", "moin-ftp.png", 16, 16),
        # search forms
        'searchbutton': ("[?]", "moin-search.png", 16, 16),
        'interwiki':  ("[%(wikitag)s]", "moin-inter.png", 16, 16),

        # smileys (this is CONTENT, but good looking smileys depend on looking
        # adapted to the theme background color and theme style in general)
        #vvv    ==      vvv  this must be the same for GUI editor converter
        'X-(':        ("X-(", 'angry.png', 16, 16),
        ':D':         (":D", 'biggrin.png', 16, 16),
        '<:(':        ("<:(", 'frown.png', 16, 16),
        ':o':         (":o", 'redface.png', 16, 16),
        ':(':         (":(", 'sad.png', 16, 16),
        ':)':         (":)", 'smile.png', 16, 16),
        'B)':         ("B)", 'smile2.png', 16, 16),
        ':))':        (":))", 'smile3.png', 16, 16),
        ';)':         (";)", 'smile4.png', 16, 16),
        '/!\\':       ("/!\\", 'alert.png', 16, 16),
        '<!>':        ("<!>", 'attention.png', 16, 16),
        '(!)':        ("(!)", 'idea.png', 16, 16),
        ':-?':        (":-?", 'tongue.png', 16, 16),
        ':\\':        (":\\", 'ohwell.png', 16, 16),
        '>:>':        (">:>", 'devil.png', 16, 16),
        '|)':         ("|)", 'tired.png', 16, 16),
        ':-(':        (":-(", 'sad.png', 16, 16),
        ':-)':        (":-)", 'smile.png', 16, 16),
        'B-)':        ("B-)", 'smile2.png', 16, 16),
        ':-))':       (":-))", 'smile3.png', 16, 16),
        ';-)':        (";-)", 'smile4.png', 16, 16),
        '|-)':        ("|-)", 'tired.png', 16, 16),
        '(./)':       ("(./)", 'checkmark.png', 16, 16),
        '{OK}':       ("{OK}", 'thumbs-up.png', 16, 16),
        '{X}':        ("{X}", 'icon-error.png', 16, 16),
        '{i}':        ("{i}", 'icon-info.png', 16, 16),
        '{1}':        ("{1}", 'prio1.png', 15, 13),
        '{2}':        ("{2}", 'prio2.png', 15, 13),
        '{3}':        ("{3}", 'prio3.png', 15, 13),
        '{*}':        ("{*}", 'star_on.png', 16, 16),
        '{o}':        ("{o}", 'star_off.png', 16, 16),
    }
    # end of icon copy from modernized theme
    # add fixedleft icons
    icons['newwindow'] = (_("[NEW WINDOW]"), "newwindow.png", 16, 13)
    icons['close'] = (_("[CLOSE]"), "close.png", 48, 16)
    icons['hide'] = (_("[HIDE]"), "hide.png", 10, 10)
    icons['show'] = (_("[SHOW]"), "show.png", 10, 10)
    icons['menu'] = (_("[MENU]"), "menu.png", 13, 16)
    icons['quicklink'] = (_("[QUICK LINK]"), "moin-quicklink.png", 16, 16)
    icons['quickunlink'] = (_("[QUICK UNLINK]"), "moin-quickunlink.png", 16, 16)
    icons['spellcheck'] = (_("[SPELL CHECK]"), "moin-spellcheck.png", 16, 16)
    icons['projection'] = (_("[PROJECTION]"), "moin-projection.png", 16, 16)
    icons['pdf'] = (_("[PDF]"), "moin-pdf.png", 16, 16)
    icons['slideleft'] = (_("[SLIDE LEFT]"), "slideleft.png", 16, 16)
    icons['slideright'] = (_("[SLIDE RIGHT]"), "slideright.png", 16, 16)
    icons['shown'] = (_("[LIST EXPANDED]"), "shown.png", 16, 16)
    icons['hidden'] = (_("[LIST HIDDEN]"), "hidden.png", 16, 16)
    icons['hidden-black'] = (_("[LIST HIDDEN-BLACK]"), "hidden-black.png", 16, 16)
    icons['more'] = (_("[MORE ACTIONS]"), "more.png", 16, 16)
    icons['comment'] = (_("[SHOW COMMENTS]"), "comment.png", 16, 16)
    icons['commentoff'] = (_("[HIDE COMMENTS]"), "commentoff.png", 16, 16)
    icons['discussion'] = (_("[DISCUSSION]"), "discussion.png", 16, 16)
    icons['revert'] = (_("[REVERT]"), "revert_16.png", 16, 16)

    #  add obsolete Classic Theme icons
    icons['diff'] = (_("DIFFS"), "moin-diff.png", 16, 16)
    icons['edit'] = (_("EDIT"), "moin-edit.png", 16, 16)
    icons['noedit'] = (_("Immutable Page"), "moin-noedit.png", 16, 16) # not a classic icon, edit icon with slash
    icons['unsubscribe'] = (_("UNSUBSCRIBE"), "moin-unsubscribe.png", 16, 16)
    icons['subscribe'] = (_("SUBSCRIBE"), "moin-subscribe.png", 16, 16)
    icons['raw'] = (_("RAW"), "moin-raw.png", 16, 16)
    # 'xml':         (_("XML"),                 "moin-xml.png",    20, 13),
    icons['print'] = (_("PRINT"), "moin-print.png", 16, 16)
    icons['view'] = (_("VIEW"), "moin-show.png", 16, 16)
    icons['favorite'] = (_("FAVORITE"), "star_on.png", 16, 16)
    icons['unfavorite'] = (_("UNFAVORITE"), "star_off.png", 16, 16)

    # list of icons that may appear in Icon Bar,  the icon-keys must be defined in the #icons" dict - see top of fixedleft.py
    # this overrides entry in MoinMoin/config/multiconfig.py - used only by Classic theme
    page_icons_table = {
        # key           pagekey, querystr dict, title, icon-key
        'diff': ('page', {'action': 'diff'}, _("Diffs"), "diff"),
        'info': ('page', {'action': 'info'}, _("Info"), "info"),
        'edit': ('page', {'action': 'edit'}, _("Edit"), "edit"),
        'noedit': ('page', {'action': 'noedit'}, _("Immutable Page"), "noedit"),
        'revert': ('page', {'action': 'revert', 'rev': None}, _("Revert"), "revert"), # visible only if viewing old revision of page
        'unsubscribe': ('page', {'action': 'unsubscribe'}, _("UnSubscribe"), "unsubscribe"),
        'subscribe': ('page', {'action': 'subscribe'}, _("Subscribe"), "subscribe"),
        'quicklink': ('page', {'action': 'quicklink'}, _("Add Quick Link"), "favorite"),
        'quickunlink': ('page', {'action': 'quickunlink'}, _("Remove Quick Link"), "unfavorite"),
        'spellcheck': ('page', {'action': 'SpellCheck'}, _("Spell Check"), "spellcheck"),
        'slideshow': ('page', {'action': 'SlideShow'}, _("Slide Show"), "projection"),
        'createpdf': ('page', {'action': 'CreatePdfDocument'}, _("Create PDF"), "pdf"),
        'attachments': ('page', {'action': 'AttachFile'}, _("Manage Attachments"), "attach"),
        'raw': ('page', {'action': 'raw'}, _("Raw Text"), "raw"),
        'xml': ('page', {'action': 'show', 'mimetype': 'text/xml'}, _("XML"), "xml"),
        'print': ('page', {'action': 'print'}, _("Print"), "print"),
        'view': ('page', {}, _("View"), "view"), # refresh uses same icon and produces similar and more useful result
        'refresh': ('page', {'action': 'refresh'}, _("Refresh Cache"), "view"),
        'pageactions': ('page', {'action': 'PageActions'}, _("More Actions"), "more"),
        'up': ('page_parent_page', {}, _("Up"), "up"),
        'discussion': ('page', {}, _("Discussion"), "discussion"),
        'comment': ('page', {}, _("Show Comments"), "comment"),
        'commentoff': ('page', {}, _("Hide Comments"), "commentoff"),
        }

    # possible choices for Icon Bar, use as many or as few as is desired, used by fixedlefticonbar
    # this overrides entry in /config/multiconfig.py
    page_iconbar = [
        # "diff",
        "edit",
        "revert", # visible when viewing an old version of a page
        "info",
        # "subscribe",  # makes subscribe/unsubscribe
        "quicklink",  # makes quicklink/quickunlink
        "attachments",
        "raw",
        "refresh",
        "spellcheck",
        # "slideshow",
        # "createpdf", # see /ActionMarket/PdfAction or CreatePdfDocument
        # "xml",
        # "print",
        # "up",
        "pageactions", # access to all actions
        # NOTE: show/hide comments icon will be included when page has comments
        # NOTE: discussion icon will be included when there is a discussion subpage
        ]


    del _

    def getViewPanelList(self):
        """
        Return a list of panels for sidebar.
        """
        return (
            'Logo',
            # 'Icon Bar',
            # 'Custom Panels', # from "#pragma sidebar SomePageName", wikiconfig.py "sidebar = SomePageName" or "SideBar"
            'Search',
            'Current Page',
            'Navigation',
            'Page Actions',
            'More Actions',
            'User',
            'Page Trail',
            'Page Contents', # page toc generated by javascript
            'Comments', # links to comments on page, toggles show/hide comments
            )


    # the methods below are in same order as in /theme/__init__.py -- to make it easy to do a diff


    def maxPagenameLength(self):
        """ Return maximum length for shortened page names

        modifications to ThemeBase method:
            - maximum length increased to 50 from 25, user can widen sidebar
        """
        return 50

    def navibar(self, d):
        """ Assemble the navibar

        modifications to ThemeBase method:
            - The fixedleft sidebar should remain stable when new pages are loaded
                - do not add current page to the navibar (aka editbar)
                - do not add sister pages to the navibar

        @param d: parameter dictionary
        @rtype: unicode
        @return: navibar html
        """
        request = self.request
        found = {} # pages we found. prevent duplicates
        items = [] # navibar items
        item = u'<li class="%s">%s</li>'
        current = d['page_name']

        # Process config navi_bar
        if request.cfg.navi_bar:
            for text in request.cfg.navi_bar:
                pagename, link = self.splitNavilink(text)
                if pagename == current:
                    cls = 'wikilink current'
                else:
                    cls = 'wikilink'
                items.append(item % (cls, link))
                found[pagename] = 1

        # Add user links to wiki links, eliminating duplicates.
        userlinks = request.user.getQuickLinks()
        for text in userlinks:
            # Split text without localization, user knows what he wants
            pagename, link = self.splitNavilink(text, localize = 0)
            if not pagename in found:
                if pagename == current:
                    cls = 'userlink current'
                else:
                    cls = 'userlink'
                items.append(item % (cls, link))
                found[pagename] = 1

        # Assemble html
        items = u''.join(items)
        html = u'''<ul id="navibar">%s</ul>''' % items
        return html

    def make_iconlink(self, which, d):
        """
        Make a link with an icon

        modifications to ThemeBase method:
            added 'revert' to list of things that have revisions
            use internal modified version of page_icons_table

        @param which: icon id (dictionary key)
        @param d: parameter dictionary
        @rtype: string
        @return: html link tag
        """
        qs = {}
        pagekey, querystr, title, icon = self.page_icons_table[which]
        qs.update(querystr) # do not modify the querystr dict in the cfg!
        d['icon-alt-text'] = d['title'] = title % d
        d['i18ntitle'] = self.request.getText(d['title'])
        img_src = self.make_icon(icon, d)
        rev = d['rev']
        if rev and which in ['raw', 'print', 'revert']:
            qs['rev'] = str(rev)
        attrs = {'rel': 'nofollow', 'title': d['i18ntitle'], }
        page = d[pagekey]
        if isinstance(page, unicode):
            # e.g. d['page_parent_page'] is just the unicode pagename
            # while d['page'] will give a page object
            page = Page(self.request, page)
        return page.link_to_raw(self.request, text=img_src, querystr=qs, **attrs)

    def trail(self, d):
        """ Assemble page trail

        modifications to ThemeBase method:
            - trail is reversed to add most recent on top and delete old items from bottom

        @param d: parameter dictionary
        @rtype: unicode
        @return: trail html
        """
        request = self.request
        user = request.user
        html = ''
        if not user.valid or user.show_page_trail:
            trail = user.getTrail()
            if trail:
                items = []
                for pagename in trail:
                    try:
                        interwiki, page = wikiutil.split_interwiki(pagename)
                        if interwiki != request.cfg.interwikiname and interwiki != 'Self':
                            link = (self.request.formatter.interwikilink(True, interwiki, page) +
                                    self.shortenPagename(page) +
                                    self.request.formatter.interwikilink(False, interwiki, page))
                            items.append('<li>%s</li>' % link)
                            continue
                        else:
                            pagename = page
                    except ValueError:
                        pass
                    page = Page(request, pagename)
                    title = page.split_title()
                    title = self.shortenPagename(title)
                    link = page.link_to(request, title)
                    items.append('<li>%s</li>' % link)
                items.reverse() # pages will drop off the bottom, not the top
                html = '''<ul id="pagetrail">%s</ul>''' % ''.join(items)
        return html

    def searchform(self, d):
        """
        assemble HTML code for the search forms

        modifications to ThemeBase method:
            - deleted javascript for form initialization and button disabling
            - wrap buttons in a div to position under search text box
            - add google search button if searchGoogle="www.myorg.org/mywiki" in wikiconfig.py
                - "&sitesearch=www.myorg.org/mywiki" will be appended to query

        @param d: parameter dictionary
        @rtype: unicode
        @return: search form html
        """
        _ = self.request.getText
        try:
            wikiUrl = '<input type="hidden" id="wikiUrl" name="wikiUrl" value="%s">' % self.cfg.searchGoogle
            searchGoogle = '''\n<input id="googlesearch" name="googlesearch" type="submit" onClick="return searchGoogle();"
value="Google" alt="Google">'''
        except:
            searchGoogle = wikiUrl = ''
        form = self.request.values
        updates = {
            'wiki_url':wikiUrl,
            'search_google': searchGoogle,
            'search_label': _('Search:'),
            'search_value': wikiutil.escape(form.get('value', ''), 1),
            'search_full_label': _('Text'),
            'search_title_label': _('Titles'),
            'url': self.request.href(d['page'].page_name)
            }
        d.update(updates)

        html = u'''%(wiki_url)s
<form id="searchform" method="get" action="%(url)s">
<input type="hidden" name="action" value="fullsearch">
<input type="hidden" name="context" value="180">
<input id="searchinput" type="text" name="value" value="%(search_value)s" size="25" alt="Search">
<div id="searchbuttons">
<input id="titlesearch" name="titlesearch" type="submit" value="%(search_title_label)s" alt="Search Titles">
<input id="fullsearch" name="fullsearch" type="submit" value="%(search_full_label)s" alt="Search Full Text">%(search_google)s
</div>
</form>
''' % d
        return html

    def html_head(self, d):
        """ Assemble html head

        modifications to ThemeBase method:
            - Add javascript source files and favicon to whatever ThemeBase creates.
            - insert a link to skip wiki navigation for screen readers.

        @param d: parameter dictionary
        @rtype: unicode
        @return: formatted header
        """
        head = [ThemeBase.html_head(self, d)]
        # font-awesome
        head.append('<link type="text/css" href="%s/%s/css/font-awesome.css" rel="stylesheet" />' % (self.cfg.url_prefix_static, self.name))
        # jQuery + jQuery-ui required for sidepanel changes
        head.append('<link type="text/css" href="%s/%s/js/jquery-ui-1.10.3.custom/css/redmond/jquery-ui-1.10.3.custom.css" rel="stylesheet" />' % (self.cfg.url_prefix_static, self.name))
        head.append('<script type="text/javascript" src="%s/%s/js/jquery-ui-1.10.3.custom/js/jquery-1.9.1.min.js"></script>' % (self.cfg.url_prefix_static, self.name))
        head.append('<script type="text/javascript" src="%s/%s/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>' % (self.cfg.url_prefix_static, self.name))
        # sortable feature -- use like this:   ||<tableclass="sortable">head1||head2||head3||
        head.append(u'\n<script type="text/javascript" src="%s/%s/js/Mottie-tablesorter.2.10.8/js/jquery.tablesorter.min.js"></script>' % (self.cfg.url_prefix_static, self.name))
        head.append(u'\n<script type="text/javascript" src="%s/%s/js/fixedleft.js"></script>' % (self.cfg.url_prefix_static, self.name))

        favicon = self.request.getPragma('favicon')
        if favicon:
            t = favicon.rindex(".")
            head.append(u'\n<link rel="icon" href="%s" type="%s">' % (favicon, "image/%s" % favicon[t + 1:]))
        # insert a link to skip wiki navigation for screen readers
        head = '\n'.join(head)
        head = head.replace(u'</title>',
            u''''</title>\n<link rel="Alternate" title="Wiki Page Content" href="#MainWikiPageContent">\n''', 1)
        return head

    def morePageActions(self, d, header = 'More Actions'): # not present in theme/__init__.py
        """
        Return more page actions menu.

        This is just to avoid changing the calling parameters of actionsMenu.
        Look at how this is called.
        """
        return self.actionsMenu(d['page'], header = header)

    def actionsMenu(self, page, header = 'More Actions'):
        """ Create actions menu list and items data dict

        The menu will contain the same items always, but items that are
        not available will be disabled (some broken browsers will let
        you select disabled options though).

        The menu should give best user experience for javascript
        enabled browsers, and acceptable behavior for those who prefer
        not to use Javascript.

        TODO: Move actionsMenuInit() into body onload - requires that the theme will render body,
              it is currently done in wikiutil/page.

        modifications to ThemeBase method:
            - the More Actions drop down box is replaced with an unordered list
            - separators and disabled items are eliminated to save vertical space

        @param page: current page, Page object
        @rtype: unicode
        @return: actions menu html fragment
        """
        request = self.request
        _ = request.getText
        rev = request.rev
        # rev was a hidden input within the more actions form
        # alternative will be to append it to anchor urls
        if rev:
            revision = '&amp;rev=%s' % rev
        else:
            revision = ''

        menu = [
            'raw',
            'print',
            'RenderAsDocbook',
            'refresh',
            '__separator__',
            'SpellCheck',
            'LikePages',
            'LocalSiteMap',
            '__separator__',
            'RenamePage',
            'CopyPage',
            'DeletePage',
            '__separator__',
            'MyPages',
            'SubscribeUser',
            '__separator__',
            'Despam',
            'revert',
            'PackagePages',
            'SyncPages',
            ]

        titles = {
            # action: menu title
            '__title__': _("More Page Actions:"),
            # Translation may need longer or shorter separator
            '__separator__': _('------------------------'),
            'raw': _('Raw Text'),
            'print': _('Print View'),
            'refresh': _('Delete Cache'),
            'SpellCheck': _('Check Spelling'), # rename action!
            'RenamePage': _('Rename Page'),
            'CopyPage': _('Copy Page'),
            'DeletePage': _('Delete Page'),
            'LikePages': _('Like Pages'),
            'LocalSiteMap': _('Local Site Map'),
            'MyPages': _('My Pages'),
            'SubscribeUser': _('Subscribe User'),
            'Despam': _('Remove Spam'),
            'revert': _('Revert to this revision'),
            'PackagePages': _('Package Pages'),
            'RenderAsDocbook': _('Render as Docbook'),
            'SyncPages': _('Sync Pages'),
            }

        options = []
        option = '<li><a href="%(baseurl)s?action=%(action)s%(revision)s">%(title)s</a></li>'
        disabledOption = '<li class="disabled">%(title)s</li>'

        # class="disabled" is a workaround for browsers that ignore
        # "disabled", e.g IE, Safari
        # for XHTML: data['disabled'] = ' disabled="disabled"'
        disabled = ' disabled class="disabled"'
        #  baseurl is full url as used here
        baseurl = self.request.getScriptname() + '/' + wikiutil.quoteWikinameURL(page.page_name)

        # Format standard actions
        available = get_available_actions(request.cfg, page, request.user)
        for action in menu:
            data = {'action': action, 'disabled': '', 'title': titles[action], 'baseurl': baseurl, 'revision': revision, }
            # removes excluded actions from the more actions menu
            if action in request.cfg.actions_excluded:
                continue

            # Enable delete cache only if page can use caching
            if action == 'refresh':
                if not page.canUseCache():
                    data['action'] = 'show'
                    data['disabled'] = disabled

            # revert action enabled only if user can revert
            if action == 'revert' and not request.user.may.revert(page.page_name):
                data['action'] = 'show'
                data['disabled'] = disabled

            # SubscribeUser action enabled only if user has admin rights
            if action == 'SubscribeUser' and not request.user.may.admin(page.page_name):
                data['action'] = 'show'
                data['disabled'] = disabled

            # Despam action enabled only for superusers
            if action == 'Despam' and not request.user.isSuperUser():
                data['action'] = 'show'
                data['disabled'] = disabled

            # Special menu items. Without javascript, executing will
            # just return to the page.
            if action.startswith('__'):
                data['action'] = 'show'

            # Actions which are not available for this wiki, user or page
            if (action == '__separator__' or
                (action[0].isupper() and not action in available)):
                data['disabled'] = disabled

            if data['disabled']:
                continue # eliminate disabled options and separators to save vertical space
                options.append(disabledOption % data)
            else:
                options.append(option % data)

        # Add custom actions not in the standard menu, except for
        # some actions like AttachFile (we have them on top level)
        more = [item for item in available if not item in titles and not item in ('AttachFile',)]
        more.sort()
        if more:
            # Add more actions (all enabled) from /plugin/actions
            for action in more:
                data = {'action': action, 'disabled': '', 'baseurl': baseurl, 'revision': revision, }
                title = action
                # Use translated version if available
                data['title'] = _(title)
                options.append(option % data)
        data = {
            'options': '\n'.join(options),
            'iconurl': self.cfg.url_prefix_static,
            'theme_name': self.name,
            'moreActions': _(header),
            'fixedLeftIcons': self.expandContractIcons()
            }
        # finally, create the list
        html = '''
<li class="sidepanel hideSidePanel" id="sidebarMoreActions"><div>%(fixedLeftIcons)s<span>%(moreActions)s</span></div>
<ul id="moreActions">
%(options)s
</ul>''' % (data)

        return html

    def editbarItems(self, page):
        """ Return list of items to show on the editbar

        This is separate method to make it easy to customize the
        edtibar in sub classes.

        Modification to ThemeBase:
            - remove ActionsMenu (will become More Page Actions - a sibling of Page Actions)
            - replace Add/Remove Link with Add/Remove Quick Link
        """
        _ = self.request.getText
        editbar_actions = []
        for editbar_item in self.request.cfg.edit_bar:
            if (editbar_item == 'Discussion' and
               (self.request.getPragma('supplementation-page', self.request.cfg.supplementation_page)
                                                   in (True, 1, 'on', '1'))):
                    editbar_actions.append(self.supplementation_page_nameLink(page))
            elif editbar_item == 'Edit':
                editbar_actions.append(self.editorLink(page))
            elif editbar_item == 'Info':
                editbar_actions.append(self.infoLink(page))
            elif editbar_item == 'Subscribe':
                editbar_actions.append(self.subscribeLink(page))
            elif editbar_item == 'Quicklink':
                editbar_actions.append(self.quicklinkLink(page).replace(' Link', ' Quick Link'))
            elif editbar_item == 'Attachments':
                editbar_actions.append(self.attachmentsLink(page))
            #~ elif editbar_item == 'ActionsMenu':
                #~ editbar_actions.append(self.actionsMenu(page))
        return editbar_actions

    def header(self, d):
        """ Assemble page header

        Default behavior is to start a page div. Sub class and add
        footer items.

        modifications to ThemeBase method:
            - put all wiki navigation into the sidebar

        @param d: parameter dictionary
        @rtype: string
        @return: page header html
        """
        _ = self.request.getText
        panelList = self.getViewPanelList()
        panelHtml = self.generateSidebarPanels(d, panelList)

        html = [
            # Sidebar
            u'<div id="sidebar">',
            self.hideSidebar(), # icon to hide sidebar
            u'<h1 id="wikinavigationheader">%s</h1>' % _(u'Wiki Navigation'), # hidden by common.css
            u'<div id="sidebarWikiMenu">',
            u'<ul id="wikiNavMenu">',
            panelHtml,
            u'</ul>',
            u'</div>', #sidebarWikiMenu
            # add thispage class name to all links pointing to the page currently loading, used to make current page name bold
            u'</div>', # end sidebar div

            # wiki page
            u'<div id="wikipagecontent">', # wikipagecontent div end is emitted by footer
            self.showSidebar(d), # creates wiki navigation for sideways mode
            u'<h1 id="wikipageheader">%s</h1>' % _(u'Wiki Page Content'), # hidden by common.css
            u'<a name="MainWikiPageContent"></a>', # accessibility anchor for screen readers
            # on this theme there is nothing to separate header1 from header2
            self.emit_custom_html(self.cfg.page_header1),
            self.emit_custom_html(self.cfg.page_header2),
            self.msg(d),
            self.startPage(),
            ]
        return u''.join(html)

    def footer(self, d, **keywords):
        """ Assemble page footer

        Default behavior is to end page div. Sub class and add
        footer items.

        modifications to ThemeBase method:
         - removed edit bar on bottom of page (is in sidepanel)
         - inserted end of div for wikipagecontent

        @param d: parameter dictionary
        @keyword ...:...
        @rtype: string
        @return: page footer html
        """

        page = d['page']
        html = [
            self.pageinfo(page),
            self.endPage(), # End of div#page

            # Pre footer custom html (not recommended!)
            self.emit_custom_html(self.cfg.page_footer1),

            # Footer
            u'<div id="footer">',
            self.credits(d),
            self.showversion(d, **keywords),
            u'</div>',

            # Post footer custom html
            self.emit_custom_html(self.cfg.page_footer2),
            # must write timings and auth method before we close wikipagecontent div
            self.send_closing_html_part1(),
            u'</div>', # end of div#wikipagecontent
            ]
        return u'\n'.join(html)

    def send_closing_html(self):
        """ generate timing info html and closing html tag,
            everyone calling send_title must call this at the end to close
            the body and html tags.

        modifications to ThemeBase method:
            - moved write of timings to send_closing_html_part1 (these must go into wikiPageContent div)
        """
        request = self.request
        request.write('</body>\n</html>\n\n')

    def send_closing_html_part1(self):
        """ generate timing info html and closing html tag
        """
        request = self.request

        # as this is the last chance to emit some html, we stop the clocks:
        request.clock.stop('run')
        request.clock.stop('total')
        html = []
        # Close html code
        if request.cfg.show_timings and request.action != 'print':
            html.append('<ul id="timings">')
            for t in request.clock.dump():
                html.append('<li>%s</li>' % t)
            html.append('</ul>')
        #~ html.append('<ul id="authmethod"><li>auth_method = %s </li></ul>' % repr(request.user.auth_method))
        return '\n'.join(html)

    def sidebar(self, d, **keywords):
        """ add custom sidebar panels defined in a wiki page

        @param d: parameter dictionary
        @rtype: string
        @return: sidebar html

        modifications for fixedleft theme
            - add option for specifying a sidebar page in wikiconfig.py
            - convert generated html into a valid sidebar panel
        """
        request = self.request
        _ = self.request.getText
        try:
            pageName = request.cfg.sidebar
        except:
            pageName = None
        sidebarPageName = request.getPragma('sidebar') or pageName or u'SideBar'
        if sidebarPageName == request.page.page_name:
            return u'<li class="sidepanel"><div><span>Current page is a sidebar panel.</span></div></li>'
        page = Page(request, sidebarPageName)
        if not page.exists():
            return u'<li class="sidepanel">Sidebar page "%s" not found.</li>' % sidebarPageName
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
        #
        # reformat wiki page content to look like fixedleft sidebar panel
        # expected raw page contents must look like (number of panel headers and links is unlimited, but many is too many):
        #  * panel header 1
        #    * link 1
        #    * link 2
        #  * panel header 2
        #    * link a
        #    * link b

        # make a copy of div that encloses sidepanel li text; span encloses panel name text
        icons = '<div>' + self.expandContractIcons() + '<span>' # closing span and div added later
        # get the custom sidebar panels
        customSidebar = buff.getvalue()
        # remove all line identifers similar to <span class="anchor" id="SideBar.line-1"></span>
        customSidebar = re.sub(r'<span class="anchor" id="\w+\.line-\d+"><\/span>', "", customSidebar)
        customSidebar = re.sub(r'<span class="anchor" id="\w+\.\w+"><\/span>', "", customSidebar) # top/bottom
        # remove outer div and ul wrapers
        customSidebar = re.sub(r'^<div [^>]+>\s*<ul>', "", customSidebar) # leading div and ul
        customSidebar = re.sub(r'</ul>\s*</div>\s*$', "", customSidebar) # trailing ul and div
        # add class of "sidepanel" and id placeholder to li parent(s) - e.g. panel headers
        customSidebar = re.sub(r'^\s*<li>', '<li class="sidepanel" id="%s">' + icons, customSidebar) # add class and id placeholder to first panel
        customSidebar = re.sub(r'</ul>\s*</li>\s*<li>', '</ul></li><li class="sidepanel" id="%s">' + icons, customSidebar) # add class and id placeholder to subsequent panels
         # add closing span and div after icons and before ul
        customSidebar = re.sub(r'<ul>', '</span></div><ul>', customSidebar)
        # create a list of unique ids
        numberIds = customSidebar.count('id="%s"')
        idList = []
        for i in range(numberIds):
            idList.append(sidebarPageName + str(i))
        customSidebar = customSidebar % tuple(idList)
        return customSidebar


    # the methods above are in same order as in /theme/__init__.py -- to make it easy to do a diff


    def generateSidebarPanels(self, d, panelList):
        """Return HTML fragment containing sidebar panels."""
        request = self.request
        knownPanels = {
            'Logo': self.logoName,
            #~ 'Custom Panels': self.userSidebarPage,
            'Custom Panels': self.sidebar,
            'Search': self.searchpanel,
            'Current Page': self.pageLinkTo,
            'Navigation': self.navipanel,
            'Page Actions': self.pagepanel,
            'More Actions': self.morePageActions,
            'User': self.userpanel,
            'Page Trail': self.trailpanel,
            'Page Contents': self.tocpanel,
            'Comments': self.commentspanel,
            'Edit Actions': self.editbuttons,
            'Edit Help': self.edithelp,
            'Edit Hints': self.edit_hints,
            'Icon Bar': self.iconbarpanel, # old style classic icons
            }
        html = []
        for panel in panelList:
            if knownPanels.get(panel, None):
                html.append(knownPanels[panel](d))
            else:
                html.append('<li class="sidepanel showSidePanel"><div><span>generateSidebarPanels config error</span></div></li>')
        return u'\n'.join(html)

    def popupWindow(self, pageName, translate = 0):
        """Return a link that will open in a popup window."""
        linkFormat = '''<li>%s</li>'''
        replaceFormat = '''<li>
<img src="%s/%s/img/newwindow.png" border="0" width="16" height="13" alt="New window" title="New window">
<a onClick="return newWikiWindow(this);" ''' % (self.cfg.url_prefix_static, self.name)
        popupLink = linkFormat % self.splitNavilink(pageName)[1]
        if translate:
            # moin splitNavilink translates ?, =, & and ; in wikipagename to %3F, %3D, %26, and %3b
            #   - translate them back to a query string in case a special theme or effect is wanted
            popupLink = popupLink.replace('%3F', '?')
            popupLink = popupLink.replace('%3D', '=')
            popupLink = popupLink.replace('%26', '&')
            popupLink = popupLink.replace('%3B', ';')
        popupLink = popupLink.replace('<li><a ', replaceFormat, 1)
        return popupLink

    def make_page_link(self, pageName):
        """
        Return a list item containing a link to a wiki page.
        """
        linkFormat = '<li>%s</li>'
        return linkFormat % self.splitNavilink(pageName)[1]

    def getEditPanelList(self):
        """return a list of panels for sidebar."""
        return (
                'Logo',
                'Current Page',
                'Edit Actions',
                'Edit Help',
                'Edit Hints',
                'Comments', # links to comments on page, toggles show/hide comments
                'Page Contents',
                )

    def editorheader(self, d):
        """
        Assemble editor header as a left sidebar.

        modifications:
            - write out all wiki navigation into the sidebar
            - write out custom hints

        @param d: parameter dictionary
        @rtype: string
        @return: page header html
        """
        _ = self.request.getText
        panelList = self.getEditPanelList()
        panelHtml = self.generateSidebarPanels(d, panelList)

        html = [
            # Sidebar
            u'<div id="sidebar" class="isEditor">',
            self.hideSidebar(), # icon for hiding sidebar
            u'<h1 id="wikinavigationheader">%s</h1>' % _(u'Wiki Navigation'), # hidden by common.css
            u'<div id="sidebarWikiMenu">',
            u'<ul id="wikiNavMenu">',
            panelHtml,
            u'</ul>',
            u'</div>', # end sidebar
            u'</div>', #sidebarWikiMenu
            u'<div id="wikipagecontent">', # wikipagecontent div end is emitted by footer
            self.showSidebar(d), # creates wiki navigation for sideways mode
            u'<h1 id="wikipageheader">%s</h1>' % _(u'Wiki Page Content'), # hidden by common.css
            u'<a name="MainWikiPageContent"></a>', # accessibility anchor for screen readers
            self.emit_custom_html(self.cfg.page_header1),
            self.emit_custom_html(self.cfg.page_header2),
            self.msg(d),
            self.startPage(),
            ]
        return u'\n'.join(html)

    def hideSidebar(self):
        """
        Return a html fragment with a hide button for the sidebar.
        """
        html = [
                    u'''<i id="hideSidebarIcon" class="icon-step-backward" title="hide sidebar"></i>''',
                    u'''<i id="optionsToolIcon" class="icon-wrench" title="sidebar options"></i>''',
                    ]
        return '\n'.join(html)

    def showSidebar(self, d):
        """
        Return a html fragment with a show icon and an icon for a sideways drop down menu.
        """
        html = [
            u'<div id="altWikiNavMenu">',
            self.sidewaysIcons(),
            u'</li></ul></div>',
            ]
        return '\n'.join(html)

    def sidewaysIcons(self):
        """Return html fragment to display show and menu icons."""
        html = [
                u'''<i id="showSidebarIcon" class="icon-step-forward" title="show sidebar"></i>''',
                u'''<ul class="sideways" id="menuIcon"><li id="contentWikiMenu"><i id="sidewaysMenuIcon" class="icon-list-alt"></i>''',
                ]
        return '\n'.join(html)

    def expandContractIcons(self, noAction=False):
        """Return html fragment to display show and menu icons."""
        if noAction:
            icon = 'hidden-black.png'
            klass = 'contractIcon noMouseoverAction'
        else:
            icon = 'hidden.png'
            klass = 'contractIcon'
        html = [
            u'''<img src="%s/%s/img/shown.png" class="expandIcon" width="16" height="16">''' % (self.cfg.url_prefix_static, self.name),
            u'''<img src="%s/%s/img/%s" class="%s"   width="16" height="16" >''' % (self.cfg.url_prefix_static, self.name, icon, klass),
            ]
        return ''.join(html)

    def editbuttons(self, d, header = 'Edit Actions'):
        """Place the input buttons for the text editor. These are outside the form element.

        The tickle function will click the corresponding form element button.
        Buttons can not tell the difference between a tickle and a click :-).

        @param d: parameter dictionary
        @rtype: unicode
        @return: html formatted edit buttons
        """
        _ = self.request.getText
        # put out GUI button if user preferences allow it
        if self.cfg.editor_default == 'text' and self.cfg.editor_force:
            guiButton = ''
        else:
            guiButton = '''<li id="xswitch2gui" ><a class="xbutton" name="xbutton_switch" onClick="tickle(this);" >GUI/Text Mode</a></li>\n'''
        html = [
            '<li class="sidepanel showSidePanel" id="editButtons"><div>%s<span>%s</span></div><ul>' % (self.expandContractIcons(), _(header)),
            # @@@ to eliminate the missing comment reminder, change checkComment to tickle on the line below
            u'''<li><a class="xbutton"  name="xbutton_save" onClick="checkComment(this);">Save Changes</a></li>\n
<li><a class="xbutton" name="xbutton_preview"  onClick="tickle(this);">Preview</a></li>\n
%s
<li  style="display: none;"><a class="xbutton" name="xbutton_load_draft" onClick="tickle(this);">Load Draft</a></li>\n
<li><a class="xbutton" name="xbutton_spellcheck" onClick="tickle(this);">Check Spelling</a></li>\n
<li><a class="xbutton" name="xbutton_cancel" onClick="tickle(this);">Cancel</a></li>\n
''' % (guiButton),
            u'</ul></li>',
            ]
        return u'\n'.join(html)

    def editpopup(self, hyperlink, windowName = 'popup'):
        """Return a hyperlink that will open a popup window.  Precede link with popup icon.

        The incoming hyperlink will look something like:
           <a href="/mywiki/HelpOnEditing">HelpOnEditing</a>
        Add an info icon and additional parameters  inside the "a" tag so a new window is opened.

        @param hyperink: string with valid anchor
        @rtype: unicode
        @return: modified anchor
        """
        # editor help windows are opened in new window, user is encouraged to read the help and close the window
        newParms = u''' onclick="window.open(this.href,'%s','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,copyhistory=no,resizable=yes,left=0,top=0').focus(); event.returnValue=false; return false;"
onkeypress="window.open(this.href,'%s','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,copyhistory=no,resizable=yes,left=0,top=0').focus(); event.returnValue=false; return false;" >
<img src="%s/%s/img/newwindow.png"
border="0" width="16" height="13" alt="New window" title="New window">''' % (windowName, windowName, self.cfg.url_prefix_static, self.name)
        return '<li>%s</li>' % hyperlink.replace('>', newParms, 1)

    def edithelp(self, d, header = 'Edit Help'):
        """Add a panel of help links.   To avoid losing edits, open links in a new window.

        @param d: parameter dictionary
        @rtype: unicode
        @return: formatted help
        """
        _ = self.request.getText
        html = [
            u'<li class="sidepanel showSidePanel" id="editHelp"><div>%s<span>%s</span></div><ul>' % (self.expandContractIcons(), _(header)),
            self.editpopup(_("HelpOnEditing", wiki = True), windowName = 'hoe'),
            self.editpopup(_("HelpOnMoinWikiSyntax", wiki = True), windowName = 'sr'),
            u'</ul></li>',
            ]
        return u'\n'.join(html)

    def hintline(self, s, divclass = 'hint'):
        """Return a formatted hint example.

        @param s: a hint line
        @rtype: unicode
        @return: formatted hint line
        """
        return u'<li class="%s">%s</li>' % (divclass, s)

    def edit_hints(self, d, header = 'Edit Hints'):
        """Add a panel of syntax quick references for new users.

        The editor_quickhelp defined in wikiconfig.py or multiconfig.py cannot be modified without
        effecting other themes, so define a new version here that will fit in a narrow column.

        @param d: parameter dictionary
        @rtype: unicode
        @return: html formatted edit hints
        """
        _ = self.request.getText
        html = [
            u'<li class="sidepanel showSidePanel" id="editHints"><div>%s<span>%s</span></div><ul>' % (self.expandContractIcons(), _(header)),
            self.hintline(_("Text Formatting"), divclass = 'hintheader'),
            self.hintline("''<span class='hintital'>%s</span>''" % _('italics')),
            self.hintline("'''<span class='hintbold'>%s</span>'''" % _('bold')),
            self.hintline("'''''<span class='hintboit'>%s</span>'''''" % _('bold italics')),
            self.hintline("`<tt class='backtick'>%s</tt>`" % _('monospace')),

            self.hintline(_("Horizontal Rules"), divclass = 'hintheader'),
            self.hintline("---- %s" % _('(use 4 to 10 hyphens)')),

            self.hintline(_("Headings"), divclass = 'hintheader'),
            self.hintline("== %s 2 == %s" % (_("Title"), _("(use 1 to 5 = chars)"))),
            #~ self.hintline("===== %s 5 =====" % _("Title")),

            self.hintline(_("Lists"), divclass = 'hintheader'),
            self.hintline(_("Start with space(s):")),
            self.hintline("&nbsp;* %s" % _("round bullet")),
            self.hintline("&nbsp;1 %s" % _("numbered bullet")),
            #~ self.hintline("&nbsp;I %s" % _("Roman bullet")),
            self.hintline("&nbsp;i %s" % _("roman bullet")),
            self.hintline("&nbsp;A %s" % _("Alpha bullet")),
            #~ self.hintline("&nbsp;a %s" % _("alpha bullet")),

            self.hintline(_("Hyperlinks"), divclass = 'hintheader'),
            self.hintline(_("JoinCapitalizedWords")),
            self.hintline("http://www.myorg.org"),
            #~ self.hintline("[[http://www.myorg.org]]"),
            self.hintline("[[http://myorg.org|%s]]" % _("my site")),
            self.hintline("user@example.com"),

            self.hintline(_("Not a Hyperlink"), divclass = 'hintheader'),
            self.hintline(_("!JoinCapitalizedWords")),

            self.hintline(_("Embedding"), divclass = 'hintheader'),
            self.hintline(_("{{attachment:animage.jpg}}")),
            self.hintline(_("{{http://myorg.org/pix.png}}")),

            self.hintline(_("Tables"), divclass = 'hintheader'),
            self.hintline("||%s 1||%s 2||" % (_("cell"), _("cell"))),
            self.hintline("||||%s||" % _("2-column cell")),

            self.hintline(_("Macros"), divclass = 'hintheader'),
            self.hintline("&lt;&lt;%s&gt;&gt;" % _("TableOfContents")),
            self.hintline("&lt;&lt;FootNote(%s)&gt;&gt;" % _("some text")),
            self.hintline("&lt;&lt;Include(%s)&gt;&gt;" % _("SomePage")),
            self.hintline("&lt;&lt;BR&gt;&gt; - %s" % _("hard line break")),

            self.hintline(_("Variables"), divclass = 'hintheader'),
            self.hintline("@SIG@ - %s" % _("signature with time")),
            #~ self.hintline("@USER@ - %s" % _("signature")),
            u'</ul></li>',
            ]
        return u'\n'.join(html)

    def navipanel(self, d, header = 'Quick Links'):
        """ Create a navigation panel.

        @param d: parameter dictionary
        @rtype: unicode
        @return: formatted navibar
        """
        _ = self.request.getText
        html = [
            u'<li class="sidepanel showSidePanel" id="sidebarNavigation"><div>%s<span>%s</span></div>' % (self.expandContractIcons(), _(header)),
            self.navibar(d),
            u'</li>',
            ]
        return u''.join(html)

    def pagepanel(self, d, header = 'Page Actions'):
        """ Create page actions panel .

        @param d: parameter dictionary
        @rtype: unicode
        @return: formatted actions panel
        """
        _ = self.request.getText
        if self.shouldShowEditbar(d['page']):
            html = [
                u'<li class="sidepanel showSidePanel" id="sidebarPageActions"><div>%s<span>%s</span></div>' % (self.expandContractIcons(), _(header)),
                self.editbar(d),
                u'</li>',
                ]
            return u''.join(html)
        return ''

    def userpanel(self, d, header = 'User Actions'):
        """ Create user panel.

        @param d: parameter dictionary
        @rtype: unicode
        @return: formatted user panel
        """
        _ = self.request.getText
        html = [
            u'<li class="sidepanel showSidePanel" id="sidebarUser"><div>%s<span>%s</span></div>' % (self.expandContractIcons(), _(header)),
            self.username(d),
            u'</li>'
            ]
        return u''.join(html)

    def trailpanel(self, d, header = 'Page Trail'):
        """ Create page trail panel.

        @param d: parameter dictionary
        @rtype: unicode
        @return: formatted page trail panel
        """
        _ = self.request.getText
        trail = self.trail(d)
        if trail:
            html = [
                u'<li class="sidepanel showSidePanel" id="sidebarTrail"><div>%s<span>%s</span></div>' % (self.expandContractIcons(), _(header)),
                trail,
                u'</li>'
                ]
        else:
            html = []
        return u''.join(html)

    def tocpanel(self, d, header = 'Page Contents'):
        """Create a place for a page table of contents - Javascript to populate at page load

        @param d: parameter dictionary
        @rtype: unicode
        @return: formatted page trail panel
        """
        _ = self.request.getText
        return u'<li class="sidepanel showSidePanel" id="sidebarTOC"><div>%s<span>%s</span></div></li>' % (self.expandContractIcons(), _(header))

    def commentspanel(self, d, header = 'Comments'):
        """Create a place for a list of page comments - Javascript to populate at page load

        @param d: parameter dictionary
        @rtype: unicode
        @return: formatted page trail panel
        """
        _ = self.request.getText
        return u'''<li class="sidepanel showSidePanel" id="sidebarComments">
            <div>%s<span id="putNbrHere">%s</span></div><ul id="putCommentLinksHere"></ul></li>''' % \
            (self.expandContractIcons(noAction=True), _(header))

    def searchpanel(self, d, header = 'Search Wiki'):
        """Create search panel.

        @param d: parameter dictionary
        @rtype: unicode
        @return: formatted search panel
        """
        _ = self.request.getText
        html = [
            u'<li class="sidepanel showSidePanel" id="sidebarSearch">',
            u'<div>%s<span>%s</span></div>' % (self.expandContractIcons(noAction=True), _(header)),
            self.searchform(d),
            u'</li>',
            ]
        return u''.join(html)

    def logoName (self, d):
        '''Return html fragment to display logo on sidepanel'''
        _ = self.request.getText
        html = [
            u'<li class="sidepanel showSidePanel" id="sidebarLogo">',
            self.logo().replace('></a></div>', ' title="%s"> %s</a><span>Logo</span></div>' % (self.cfg.page_front_page, self.cfg.sitename)),
            u'</li>',
            ]
        return u'\n'.join(html)

    def pageLinkTo (self, d, header = 'Current Page'):
        '''Return html fragment to display current page linkbacks on sidepanel.'''
        _ = self.request.getText
        html = [
            u'<li class="sidepanel showSidePanel" id="sidebarPageLink"><div>%s<span>%s</span></div>' % (self.expandContractIcons(), _(header)),
            u'%s' % self.title(d), # was d["page_name"],
            u'</li>'
            ]
        return u''.join(html)

    # This method used by fixedleftcms.py
    def valid_user(self):
        """
        Return true if this is a valid logged in user.  If true is returned, the fixedleft
        theme will be used, not fixedleftcms!

        @@@ toggle the tests below for testing/production.
        """
        #~ isValid = 0                                                        # @@@ use this for testing
        isValid = self.request.user.valid and self.request.user.name # @@@ use this for production
        return isValid

    def userMayEdit(self, d):
        """
        Return 0 if user may edit this page, else return 1.
        """
        if d['page'].isWritable() and self.request.user.may.write(d['page'].page_name):
            return 0
        return 1

    def iconbarpanel(self, d, header = 'Icon Bar'):
        """
        Assemble the iconbar

        @param d: parameter dictionary
        @rtype: string
        @return: iconbar html
        """
        _ = self.request.getText
        iconbar = [u'<li class="sidepanel showSidePanel" id="sidebarIconBar"><div><span>%s</span></div>' % (_(header)),]
        if self.page_iconbar: # and self.request.user.show_toolbar: # ignore user preferences if in config
            iconbar.append('<ul id="iconbar">')
            icons = self.page_iconbar[:]
            for icon in icons:
                if icon == "up":
                    if d['page_parent_page']:
                        iconbar.append('<li>%s</li>' % self.make_iconlink(icon, d))
                elif icon == "subscribe" and (self.cfg.mail_enabled or self.cfg.jabber_enabled):
                    iconbar.append('<li>%s</li>' % self.make_iconlink(
                        ["subscribe", "unsubscribe"][self.request.user.isSubscribedTo([d['page_name']])], d))
                elif icon == "quicklink":
                    iconbar.append('<li>%s</li>' % self.make_iconlink(
                        ["quicklink", "quickunlink"][self.request.user.isQuickLinkedTo([d['page_name']])], d))
                elif icon == "revert":
                    if d['rev']:
                        # show revert icon only if user is viewing an old revision
                        iconbar.append('<li>%s</li>' % self.make_iconlink(icon, d))
                elif icon == "edit":
                    iconbar.append('<li>%s</li>' % self.make_iconlink(
                        ["edit", "noedit"][self.userMayEdit(d)], d))
                else:
                    iconbar.append('<li>%s</li>' % self.make_iconlink(icon, d))
            # add comments icon, will be hidden by javascript if no comments
            pagekey, querystr, title, icon = self.page_icons_table['comment']
            d['icon-alt-text'] = d['title'] = title % d
            comment = self.make_icon('comment', d)
            pagekey, querystr, title, icon = self.page_icons_table['commentoff']
            d['icon-alt-text'] = d['title'] = title % d
            commentOff = self.make_icon('commentoff', d)
            iconbar.append('''<li><a href="#"  id="iconbarComments">%s%s</a></li>''' % (commentOff, comment))
            # add discussion icon if requested
            if (self.request.getPragma('supplementation-page') or self.request.cfg.supplementation_page) in (True, 1, 'on', '1'):
                page = d['page']
                suppl_name = self.request.cfg.supplementation_page_name
                suppl_name_full = "%s/%s" % (page.page_name, suppl_name)
                test = Page(self.request, suppl_name_full)
                if test.exists() or self.request.user.may.write(suppl_name_full):
                    pagekey, querystr, title, icon = self.page_icons_table['discussion']
                    d['icon-alt-text'] = d['title'] = title % d
                    img_src = self.make_icon('discussion', d)
                    iconbar.append('<li><a href="%s/%s">%s</a></li>' % (self.request.script_root, suppl_name_full, img_src))
            iconbar.append('</ul></li>\n')
        return '\n'.join(iconbar)

def execute(request):
    """
    Generate and return a theme object

    @param request: the request object
    @rtype: MoinTheme
    @return: Theme object
    """
    return Theme(request)
