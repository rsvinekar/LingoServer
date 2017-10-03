import json
import csv

'''
##
 # Class reading a given file (Google Base taxonomy file in this example)
 # and able to return direct descendands of a given line.
 #
 # This class is a part of:
 #
 # jQuery optionTree Plugin
 # version: 1.1
 # @requires jQuery v1.3 or later
 #
 # Dual licensed under the MIT and GPL licenses:
 #   http://www.opensource.org/licenses/mit-license.php
 #   http://www.gnu.org/licenses/gpl.html
 #
 # @version $Id: LazyTaxonomyReader.php 5 2010-09-23 17:26:23Z kkotowicz@gmail.com $
 # @author  Krzysztof Kotowicz <kkotowicz at gmail dot com>
##
 
# Translated from LazyTaxonomyReader.php and get-subtree.php to python below for moinmoin standalone server. --- Rithvik.
'''

def execute(pagename, request): 
    reader = LazyTaxonomyReader('./MoinMoin/web/static/htdocs/Lingo_tax.txt')
    line_no=request.values.get('id',None) 
    try: 
        line_no=int(line_no)
    except ValueError:
        line_no=None
    except TypeError:
        line_no=None
    request.write(json.dumps(reader.getDirectDescendents(line_no), sort_keys=True))




class LazyTaxonomyReader:
    _base = None
    _separator = ' > '
    __lines = ''

    def __init__(self, file='./MoinMoin/web/static/htdocs/Lingo_tax.txt'):
        with open(file, 'r') as f:
            self.__lines = [line.replace('\n', '') for line in f]

    def setbaseNode(self,line_no):
        if line_no is None:
            self._base = None
            return        
        if line_no in self.__lines:
            raise ValueError("Invalid line number.")
        self._base = self.__lines[line_no]

    def getDirectDescendents(self,line_no):
        self.setbaseNode(line_no)
        direct = dict((k, self.__lines[k]) for k in range(len(self.__lines)) if self.__isDirectlyBelow_base(self.__lines[k]))
        for x in direct:
        	direct[x]=self.__getLastNode(direct[x])
        return direct
    
    def __getLastNode(self,line):
        if self._separator not in line:
            return line
        posn = line.rfind(self._separator)
        return line[posn + len(self._separator): len(line)]

    def __isDirectlyBelow_base(self,someline):
        if self._base is None:
            start = ''
        else:
            start = self._base + self._separator

        if start in someline:
            starts_at_base = (someline.find(start) == 0)
            if not starts_at_base:
                return False
            someline = someline.replace(start, '')
            if self._separator in someline:
                return False
            return True
