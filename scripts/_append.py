"""Dev helper: append HTML to the end of a page body (before the closing backtick of body)."""
import sys, re
def append(path, html, imports=None):
    s = open(path).read()
    i = s.rfind("`,\n  related:")
    assert i > 0, path
    s = s[:i] + "\n" + html.strip() + s[i:]
    if imports:
        m = re.search(r"import \{([^}]*)\} from '../../lib/kit';", s)
        names = [x.strip() for x in m.group(1).split(',')]
        for n in imports:
            if n not in names: names.append(n)
        s = s.replace(m.group(0), "import { " + ", ".join(names) + " } from '../../lib/kit';")
    open(path, 'w').write(s)
def sub(path, a, b):
    s = open(path).read(); assert a in s, (path, a[:50]); open(path, 'w').write(s.replace(a, b, 1))
def faq(path, q, a):
    s = open(path).read()
    i = s.find("  ],\n  body:")
    assert i > 0, path
    s = s[:i] + "    { q: " + repr(q) + ", a: `" + a + "` },\n" + s[i:]
    open(path, 'w').write(s)
