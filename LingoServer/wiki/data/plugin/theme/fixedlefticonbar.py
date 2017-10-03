# -*- coding: iso-8859-1 -*-
"""
    This is an example of how to sub-class the fixed left theme to create yet another
    theme with a unique set of sidebar panels.

    To use this theme, you must:
        Customize the sidebar links by defining fixedleftManagerViewPanels in wikiconfig.py/farmconfig.py.-
        See http://moinmo.in/ThemeMarket/FixedLeft
"""

from MoinMoin import wikiutil
import fixedleft

class Theme(fixedleft.Theme):
    """
        A CMS-like theme with a left sidebar.
    """


    def getViewPanelList(self):
        """return a list of view panels for sidebar."""

        return (
            'Logo',
            'Icon Bar',
            # 'Custom Panels', # custom panel from "#pragma sidebar SomePageName", wikiconfig.py "sidebar = SomePageName" or a wiki page named "SideBar"
            'Search',
            'Current Page',
            'Navigation',
            # 'Page Actions',
            # 'More Actions',
            'User',
            'Page Trail',
            'Page Contents',
            'Comments', # links to comments on page, toggles show/hide comments
            )

    # Uncomment this method to create a unique set of edit panels different from fixedleft.py
    # def getEditPanelList(self):
        # """return a list of edit panels for sidebar."""
        # return (
                # 'Current Page',
                # 'Editor Controls',
                # 'Editor Help',
                # 'Editor Hints',
                # 'Page Contents',
                # )
