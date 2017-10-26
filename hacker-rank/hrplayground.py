import sys
import re

def isFloat(inStr):
    return (re.match("^[+-]?\d*\.?\d*", inStr) != None)

# for line in raw_input('--> '):
#     print isFloat(line)
