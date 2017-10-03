# -*- coding: iso-8859-1 -*-
"""
    This is a theme suitable for a casual site visitor who knows nothing about wiki navigation.
    The usual wiki navigation links are suppressed, visitors will see a sidebar with links to
    the most important pages of your site.

    To use this theme, you must:
        Make fixedleftcms the default theme for your wiki.
        Optional:
            Create a wiki page named FixedLeftCmsSidebar (or any name of your choice).
            Un-comment, comment, reorder the list of panels returned in getViewPanelList below.

    Users who are not logged in will receive pages formatted with this theme.

    Logged in users will received pages formatted with their selected theme.  If no
    theme has been selected (or fixedleftcms is the user's selected theme),
    the page will be formatted with the fixedleft theme.
"""

from MoinMoin import wikiutil
import fixedleft

class Theme(fixedleft.Theme):
    """
        A CMS-like theme with a left sidebar.
    """

    #~ name = "fixedleft"     # just a reminder that css will be loaded from htdocs/fixedleft/css

    def getViewPanelList(self):
        """Return a list of panels for sidebar."""
        if self.valid_user():
            # user is logged in, give him the fixedleft theme
            return fixedleft.Theme.getViewPanelList(self)

        return (
            'Logo',
            # 'Icon Bar',
            'Custom Panels', # custom panel from "#pragma sidebar SomePageName", wikiconfig.py "sidebar = SomePageName" or a wiki page named "SideBar"
            'Search',
            # 'Current Page',
            'Navigation',
            # 'Page Actions',
            # 'More Actions',
            'User',
            # 'Page Trail',
            'Page Contents',
            # 'Comments', # links to comments on page, toggles show/hide comments
            )

    # Uncomment and modify this method to create a unique set of edit panels different from fixedleft.py
    # Depending upon wikiconfig, CMS users could edit a page without logging in by double-clicking
    # def getEditPanelList(self):
        # """return a list of edit panels for sidebar."""
        # return (
                # 'Current Page',
                # 'Editor Controls',
                # 'Editor Help',
                # 'Editor Hints',
                # 'Page Contents',
                # )

    def html_head(self, d):
        """
        If user is not logged in, add a tiny bit of css to whatever fixedleft creates.

        Hides last-edited page info from casual visitors.
        """
        head = fixedleft.Theme.html_head(self, d)
        if not self.valid_user():  # user is not logged in, add a bit of CSS
            head = u'\n'.join((head,
                u"""
<style type="text/css">
<!--
p#pageinfo {display: none;}
div#sidebar li.sidepanel  a:visited {color: purple;}
-->
</style>
""",
))
        return head



