# Regular expressions

## regex special characters

```
[ \ ^ $ . | ? * + ( ).
```

- A dot . is a special character class that matches “any character except a newline”

- '/' is not a special character, but in JavaScript it is used to open and close the regexp

## Flags

- `i` case-insensitive
- `g` all matches (without it – only the first match is returned)
- `m` Multiline mode ??
- `s` dotall” mode (allows a dot . to match newline character \n)
- `u` Enables full Unicode support ??
- `y` ??

## Character classes

- `\d` digit
- `\s` white space
- `\w` letter of Latin alphabet or a digit or an underscore \_
- `\b` Word boundary(start , \W, end)

## Inverse classes

- `\D` not (digit)
- `\S` not (white space)
- `\W` not (letter of Latin alphabet or a digit or an underscore \_)

## Anchors: start ^ and end $

- The caret ^ matches at the beginning of the text, and the dollar $ – at the end.

- Testing for a full match
- console.log(/^\d\d:\d\d$/.test("12:89")) // output true;
- console.log(/^\d\d:\d\d$/.test("12:89")) // output false;

## Sets and ranges [...]

- A dot . inside square brackets means just a dot.
- A hyphen - is not escaped in the beginning or the end (where it does not define a range).
- A caret ^ is only escaped in the beginning (where it means exclusion).
- The closing square bracket ] is always escaped (if we need to look for that symbol).

### Sets

- [abk] any character of a or b or k

### Ranges

- [a-h] any character from a to h
- [0-9A-F] range from 0 to 9 or from A to
- \d – is the same as [0-9],
- \w – is the same as [a-zA-Z0-9_],
- \s – is the same as [\t\n\v\f\r ]

### Excluding ranges

- [^aeyo] – any character except 'a', 'e', 'y' or 'o'.
- [^0-9] – any character except a digit, the same as \D.
- [^\s] – any non-space character, same as \S.

## Quantifiers +, \*, ? and `{n}`

### Quantity `{n}`

- \d{5} denotes exactly 5 digits, the same as \d\d\d\d\d.
- \d{3, 6} numbers from 3 to 6 digits
- \d{3,} looks for sequences of digits of length 3 or more

### Shorthands

- - Means “one or more”, + == {1,}
- ? Means “zero or one”, ? == {0,1}
- _ Means “zero or more”, _ == {0,}

## Greedy and lazy quantifiers

- default is greedy mode
- to enable lazy mode add ? to quantifiers

## Capturing groups //////////////////////////////////

// let str = 'my@mail.com @ his@site.com.uk';

// let regexp = /[-\w]+@([-\w]+\.)+\w+/ig;

// console.log( str.match(regexp) );

## BackReferences in pattern: \N and \k<name>

```javascript
let str = `He 'said': "She's the one!".`;

let regexp = /(['"])(._?)\1/g; // /1 means “find the same text as in the first group”
let regexp = /(?<quotes>['"])(._?)\k<quotes>/g;

console.log(str.match(regexp)); // 'said', 'She's the one!'
```

## Alternation (OR) |

```javascript
let str = `i love html, i love css, css is fun`;
let regexp = /i love (?:html|css)/g;

console.log(str.replace(regexp, "javascript")); // javascript, javascript, css is fun
```

## Lookahead and lookbehind

- X(?=Y) Positive lookahead X if followed by Y
- X(?!Y) Negative lookahead X if not followed by Y
- (?<=Y)X Positive lookbehind X if after Y
- (?<!Y)X Negative lookbehind X if not after Y

```javascript
let regexp = /\w\*?Script/g;

let str = "JavaScriptScript";

str = str.match(regexp);

console.log(str); // JavaScript
```

///////////////////////////////////////////////////////////////////////////////
// function DNAStrand(dna) {
// return dna.replace(/./g, (match, patern1, patern2 , ..., offset, group) => DNAStrand.pairs[match]);
// }

// DNAStrand.pairs = {
// A: "T",
// T: "A",
// C: "G",
// G: "C",
// };

// let char = "AC";

// console.log(DNAStrand("AAAACCCGGTT"));
