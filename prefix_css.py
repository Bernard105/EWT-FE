from pathlib import Path
import sys

PREFIX = sys.argv[1]
SRC = Path(sys.argv[2])
DST = Path(sys.argv[3])
text = SRC.read_text()

# naive recursive parser for blocks / at-rules

def split_top_level_commas(selector):
    parts=[]; cur=''; depth=0
    for ch in selector:
        if ch in '([':
            depth += 1
        elif ch in ')]':
            depth = max(depth-1,0)
        if ch == ',' and depth == 0:
            parts.append(cur)
            cur=''
        else:
            cur += ch
    if cur:
        parts.append(cur)
    return parts


def prefix_selector(selector):
    sel = selector.strip()
    if not sel:
        return sel
    if PREFIX in sel:
        return sel
    replacements = {'html': PREFIX, 'body': PREFIX, '#root': PREFIX, ':root': PREFIX}
    if sel == '*':
        return f'{PREFIX} *'
    # replace standalone root-ish selectors in compounds separated by spaces? keep simple
    if sel in replacements:
        return replacements[sel]
    return f'{PREFIX} {sel}'


def transform_chunk(s):
    out=''; i=0; n=len(s)
    while i<n:
        # copy whitespace
        if s[i].isspace():
            out += s[i]; i += 1; continue
        if s.startswith('@media', i) or s.startswith('@supports', i):
            j = s.find('{', i)
            header = s[i:j+1]
            depth=1; k=j+1
            while k<n and depth:
                if s[k]=='{': depth += 1
                elif s[k]=='}': depth -= 1
                k += 1
            inner = s[j+1:k-1]
            out += header + transform_chunk(inner) + '}'
            i = k
            continue
        if s.startswith('@', i):
            # pass through other at-rules / keyframes unchanged
            j = s.find('{', i)
            if j == -1:
                out += s[i:]
                break
            header = s[i:j+1]
            depth=1; k=j+1
            while k<n and depth:
                if s[k]=='{': depth += 1
                elif s[k]=='}': depth -= 1
                k += 1
            out += s[i:k]
            i = k
            continue
        # selector block
        j = s.find('{', i)
        if j == -1:
            out += s[i:]
            break
        selector = s[i:j].strip()
        depth=1; k=j+1
        while k<n and depth:
            if s[k]=='{': depth += 1
            elif s[k]=='}': depth -= 1
            k += 1
        body = s[j+1:k-1]
        selectors = split_top_level_commas(selector)
        prefixed = ', '.join(prefix_selector(sel) for sel in selectors)
        out += prefixed + '{' + body + '}'
        i = k
    return out

DST.write_text(transform_chunk(text))
