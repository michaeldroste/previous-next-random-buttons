# CMS Prev Next

Previous / Next / Random navigation for RapidWeaver Elements CMS items. Drop it
into a CMS Item page and it finds the neighbouring post on its own — no hidden
collection, no page picker, no list to maintain.

Free, MIT licensed. Elements 3.0.9 or later.

**Works with Elements AI and the Elements MCP server.** Every setting carries the
description Elements AI reads, so the built-in Assistant, or an AI tool connected
through the MCP server, can find and change it from a plain-language request.

---

## Two requirements

Both of these are how the Elements CMS works, not choices this component makes.

1. **It has to sit inside a CMS Item**, in the Before or After drop zone. It
   needs to know which item is being viewed, and outside that context there is
   no current item to have neighbours. Placed anywhere else it renders nothing.
   Related Items behaves the same way for the same reason.

2. **The page has to be published with a `.php` extension**, like every CMS
   page. The neighbours are worked out when the page is requested, not when you
   publish, so the component is server-side. If the page is not `.php` the
   component renders nothing at all — deliberately. It will never print PHP
   source onto your page.

## What you get out of the box

**Previous**, **Random** and **Next**: three soft-cornered rectangles filled in
your theme's brand colour, turning to its accent colour under the pointer, body
font at large size in semibold with a bold arrow or a pair of dice beside it,
matched to each other's width and centred together as a well-separated row, with
clear space above them.

Random is on out of the box and **Buttons → Show Random Button** turns it off. It
sits between the other two and takes every one of their settings — the same
label font, size, weight and colour, the same box, border, padding and radius —
because it is the third of a set rather than a variation on one.

The hover colour is the accent at the *same* depth as the background rather than
a step darker, so hovering changes the hue and nothing else — which is what makes
the change unmistakable on a theme whose brand shades sit close together. If you
would rather the button simply darkened, set **Background (Hover)** to a step of
brand.

The box is deliberately shallow — the padding above and below the wording is 2,
not the 8 the sides use — because large semibold text does the work of making the
button look substantial, and a tall box around it starts to read as a banner. That
lands each button at 44px high, which is the smallest a tap target should be, so
that pairing is the floor: shrink the padding or the text much below it and you
are asking a thumb to hit something too small.

Corner Radius starts at 2xl rather than Full for the same reason. Full is not a
radius so much as an instruction to round as far as the height allows, so a button
changes shape whenever its padding does — raise the padding and the ends bow out
into a lozenge. A fixed radius holds the shape you chose. Set it to Full if you
want the pill.

Matched width is what **Button Width** is set to out of the box, because
"Previous" is twice the word "Next" is and a pair sized to its own wording comes
out visibly lopsided. Match grows the shorter button to the longer one's size, so
the pair reads as a pair. Fit text is still there if you want each button to hug
its own wording.

Switch **Align To Edges** on for the usual blog convention of one button at
each end of the content. It reads well in a narrow column; in a wide one it
throws the two buttons a long way apart, and it will fight anything else centred
below them — a "Return Home" button, say. Centred is the default for that reason.

The neighbouring item's headline is **off** by default — switch **Show Item
Titles** on to add it. Match keeps the two buttons the same size as each other
once they carry different-length titles; switch **Button Width** to Equal halves
instead if you would rather they spread across the whole width at that point.
**Show Labels** is the separate checkbox for the Previous / Next wording itself,
and both labels are editable.

Hover states preview in the Elements canvas as well as in a browser, so the
background, border and title hover colours can be judged without publishing.

## Setup

Add it below your Collection Item and publish. That is usually the whole job:
**Collection** is empty by default, and an empty Collection means "find the
folder yourself".

The automatic search is not a guess. It looks in the folders beside and above the
page — and two levels of subfolder within each, because the standard layout puts
the page at `/post/` and the content at `/cms/posts/` — for the Markdown file
named for the item in the address being viewed. The folder holding that file is
your collection by definition. It stops at the first match, looks no more than
three levels up and never above your site's web root, skips Elements' own `rw/`
and `resources/` trees, looks at a `cms/` folder first, and gives up after 120
directories (and after 12 subfolders of any one folder, then 8 inside each of
those), so it cannot turn a page request into a walk of your whole site — or of
the hosting account around it. With more than eight collections in one folder,
fill in **Collection**. A page's AI Markdown copy and an editor preview draft are never taken for
items along the way.

**Author and tag profiles are a second choice.** The CMS keeps them in
`authors/` and `tags/` folders beside your posts, they are Markdown too, and
`authors/` sorts ahead of `posts/`. So they are used only when nothing else
answers, and never just because they came first. On a page that lives in a
folder named `author`, `authors`, `tag` or `tags` — Realmac's own examples put
those pages at `/author/` and `/tag/` — it is the other way round, and that
kind of profile folder comes first. An author or tag page in a folder named
anything else should have **Collection** filled in. Profiles rarely carry a
`date:`, so on those pages set **Order By** to **Title** or **File Name**, on
the Collection and here alike.

Only file *names* are compared in that search — reading every file it passes
would be exactly the walk those limits prevent. So if your items carry their own
`slug:` in their front matter, or the site has more than one collection, or you
simply want certainty, **fill Collection in**: a path relative to the page, such
as `posts` or `content/episodes`. **Levels Up** climbs that many folders first,
for the case where the content sits above the page rather than beside it. A
configured path can never climb out on its own or point at an absolute location.

### If your items have no `date:`

Check one of your Markdown files before choosing Order By. **A collection with no
`date:` in its front matter and no date in its filenames cannot be ordered by
date reliably.** This component
dates an item without a `date:` from a date at the start of its filename
(`2024-05-01-…`), as the CMS does, so a collection named that way needs nothing
more. An item with neither is read as the first second of 1970. The CMS does
something else there: it falls back to the file's modification time on the
server, which changes every time the file is uploaded, and nothing here can
match that. So for a collection whose files are named `0001-…` or `my-song.md`
and carry no `date:`, "Date Published" sorts the collection one way on the
Collection page and another way here, and Older / Newer stop meaning anything.

Order By **File Name** with the direction matching your list is the right answer
there, and it is exactly reproducible. Files named `0001-…`, `0002-…` sort into
the order you intended them to have.

### The one thing you must get right

**Order By**, **Order Direction**, **Status** and **Date** have to match the
Collection that lists these items. If they disagree, the buttons will point at
real posts in the wrong order, which is worse than pointing nowhere. The
defaults match a stock Collection (Date Published, Descending, Published, In the
past), so if you have not changed those on your Collection you need not change
them here either.

Everything else — Pretty URLs, which item is current, whether the address is a
clean path or `?item=slug` — is **detected, not asked about**. There is no
Pretty URLs switch to get out of step: the neighbour links are written in
whichever form the visitor's request arrived in. That includes a site using the
`.htaccess` (or nginx) rewrite from Elements' Pretty URLs instructions, which
hands the page `?item=` behind the scenes; from build 23 its links are clean
paths like the Collection's own.

## Settings

The panel follows the same group names and running order as Elements' own Button,
so the cosmetic half is where you already expect it: Font and Text Styles,
Layout, Sizing, Spacing, Transitions, Effects, Background, Borders, Advanced.
Only the first two groups are particular to this component.

**Collection** — the CMS wiring.
- **Collection** — folder of Markdown items, relative to the page. Empty finds it
  automatically.
- **Levels Up** — folders to climb before applying that path. Ignored while
  Collection is empty.
- **Order By** — Date Published, Title, File Name. Must match your Collection.
- **Order Direction** — Descending, Ascending. Must match your Collection.
- **"Previous" Means** — Older or Newer. See below.
- **Which Items Count** — **Status** and **Date**. These also must match your
  Collection. They live here rather than in a group of their own, because Elements
  uses "Filters" for CSS filters and two meanings of the word one panel apart is
  a trap.

**Buttons** — the behaviour.
- **Style** — Buttons (a filled box), Text (no box or border), Cards (adds the
  item's feature image).
- **Show** — Both, or One. See "One button" below.
- **Which One** — Next only or Previous only, when showing one.
- **At The Ends** — what the first and last item do when there is no neighbour
  that way: **Hide** the missing button, show it **Disabled**, or **Loop** round
  to the other end. Loop suits an archive meant to be browsed in a circle. It
  covers Random too: with one item in the collection there is nowhere random to
  go, so Random has an end of its own.
- **Show Random Button** — the third button. On by default. See "The Random
  button" below.
- **What Each Button Shows** — **Show Labels** plus editable **Previous Label**,
  **Next Label** and **Random Label** (clear one and it is genuinely gone, not
  reset to the default), **Show Item Titles**, **Show Icons**, **Show Feature
  Image**.

**Show Icons** was called Show Arrows up to build 13. It is the same switch and
your stored value carries across; it covers the dice as well as the two chevrons,
which is why the wording changed.

**Font and Text Styles** — Font, Size, Weight, Letter Spacing, Capitalisation and
colour for the **Label**; Font, Size, Weight, Line Height, **Maximum Lines** and
colour with a hover colour for the **Item Title**; and the arrow's **Weight** and
colour, which the dice take too. Maximum Lines trims a long headline with an
ellipsis instead of letting one button grow taller than the other.

**Arrow Weight** is the one to reach for when the arrow looks like it was drawn
by a different hand than the wording next to it. It offers the same four steps
the Label and Item Title offer — Regular, Medium, Semibold, Bold — named after
them so the two can be talked about in one vocabulary.

It starts at **Bold**, one step above the Semibold label, and that is deliberate
rather than a mismatch: a chevron is an open stroke and a letter is a solid
shape, so an arrow drawn to the label's nominal weight comes out visibly thinner
than the word beside it. A step up is what makes the two look equal. Match it to
your Label weight exactly if you would rather the arrow sat back a little, and
drop it to Medium for the light drawing every build up to 8 used.

**The dice follow the same control at two thirds of it**, and for the opposite
reason. A die is a closed box with pips inside rather than one open stroke, so a
line drawn to the arrow's weight thickens the corners until the pair reads as two
smudges. Two thirds is what makes the arrow and the dice look drawn by the same
hand, and the setting still reaches all three buttons rather than quietly
applying to two of them.

Both the Label and the Item Title start at **large**, one step up from the body
copy above them, which is what makes a bare "Previous / Next" pair read as
navigation rather than as a sentence someone forgot to finish. Switch **Show Item
Titles** on and the two arrive at the same size, so you will probably want to
swap the emphasis round — the headline is the thing being pointed at, so drop the
Label back to base and let it act as a small overline above it.

**Layout** — **Horizontal Gap** (space between the buttons side by side),
**Align To Edges**, **Stack On Mobile**, and **Vertical Gap** (space between them
once they stack, so it only appears while Stack On Mobile is on). Both gaps run
0–50 in steps of the spacing scale, the same numbers Padding and Margin use — 4
here is the same distance as a padding of 4. See "Stacking on a narrow screen"
below.

Both are emitted as an exact measurement rather than a scale class, which matters
more than it sounds: Tailwind's built-in spacing scale has holes in it above 12
— there is no 13, no 25, no 50 — so a gap set to one of those numbers would
compile to nothing at all under a Tailwind 3 theme and read as zero. Every step
from 0 to 50 lands on the distance the number says under both Tailwind 3 and 4.

**Sizing** — **Button Width** (Match, Fit text or Equal halves) and **Minimum
Width**, a floor in rem for giving both buttons more room than their wording
needs.

- **Match** — both buttons take the width of whichever one needs more room. The
  default.
- **Fit text** — each button is only as wide as its own wording.
- **Equal halves** — both stretch across the full width of the content.

All three apply to whatever buttons are showing, Random included — it is a button
like any other as far as width goes, so Previous plus Random has two things to
match in exactly the way Previous plus Next always did.

Two combinations behave in a way worth knowing about, and neither greys a control
out. **Align To Edges** needs the full width to push the row apart, and equal
buttons filling the full width *are* equal shares, so Match resolves to Equal
halves under it. And with one button showing there is nothing to match, so Match
behaves as Fit text.

**Where the Random button actually lands.** On **Match** and on **Equal halves**
the three are the same width, so Random sits exactly on the centre line of your
content — measured, not assumed. On **Fit text** each button is only as wide as
its own wording and "Previous" is a longer word than "Next", so the row is
centred but Random sits about half that difference off centre — roughly 17px at
the default size. That is Fit text doing what Fit text is for, not a bug, and
Match is the default for this among other reasons.

**Spacing** — **Margin** (the top value is what separates the buttons from the
content above) and **Padding**.

**Transitions** — Hover Transition, Duration, Easing. Applied through Tailwind's
`motion-safe` variant, so a visitor who has asked their system for reduced motion
gets the colour change with no animation.

**Effects** — Shadow, **Hover Lift** (how far the button rises under the pointer),
**Opacity** for the whole navigation, and **Disabled Opacity** for a button with
no neighbour that way.

**Background** — Background and Background (Hover), from your theme, with
independent light and dark choices.

**Borders** — Show Border, Width, Style, colour and hover colour, then **Corners**
— Corner Radius and Image Radius.

**Advanced** — Diagnostics, CSS Classes, ID.

Not carried over from Elements' Button: **Transforms** and CSS **Filters** (blur,
saturate and friends). Hover Lift covers the one transform a navigation button
actually wants; the rest would be a dozen controls that no prev/next button has
ever needed. Say the word if you disagree — they are cheap to add.

## "Previous" means Older or Newer

This is the actual confusion in every blog navigation ever built, so it is a
setting rather than an assumption. Older is the default and is what most readers
expect: Previous goes back in time.

It is decided **separately from the sort order**, so flipping your Collection to
Ascending does not silently swap your buttons. Which item sits on the older side
is derived from the sort at request time.

With **Order By** set to Title or File Name there is no older or newer to speak
of, so Previous and Next simply follow the list your readers can see. The
setting stays visible — it still applies the moment you order by date again —
but it has nothing to act on meanwhile.

## One button

A single button is not the default, because a pair is what readers expect and
what most people want. But at the end of a set of show notes, one
"Next Episode →" is a stronger call to action than a symmetrical pair, because
it points somewhere instead of offering a choice. Set **Show** to One and pick
the direction.

## The Random button

A third button, on out of the box, that opens another item from the same
collection chosen at random. It is what turns a set of posts into something that
can be wandered through rather than only walked end to end — an archive, a
recipe index, a set of tunes, anything where the next thing to read does not have
to be the next thing in the list.

**It is chosen when the page is requested.** Not when you publish — a destination
picked at publish time would be the same destination for every visitor until the
next publish, which is random exactly once. Every reader who loads the page gets
a different one.

**It never picks the item being read.** A random link back to the page you are
already on reads as a broken button rather than as bad luck.

**It obeys the same filters as the neighbours.** Status, Date and your Collection
folder all apply, so a draft or a scheduled item cannot be reached this way any
more than it can be reached by Next.

**It carries no item title and no feature image**, whatever those switches are
set to, and that is the point rather than an oversight: either one would name the
item behind the button, and a destination you can read before you click it is not
a random one. The dice and the label are the whole button.

**With one item in the collection there is nowhere to go**, so Random follows
**At The Ends** exactly as Previous and Next do — hidden, disabled, or, under
Loop, disabled as well, since looping round a single item is the item you are on.

### The dice

Two dice, drawn rather than typed. A text glyph would take the label's font and
the label's colour and would answer to none of the Arrow controls, so it would
drift out of step with the two chevrons the first time either was changed. Drawn,
it takes the arrow's colour and two thirds of the arrow's weight, and stands
exactly as tall as the chevron beside it.

**Show Icons** covers it along with the arrows. Turn Show Icons and Show Labels
both off and the Random button has nothing left in it — unlike the other two it
carries no item title to fall back on — so it would publish as an empty box that
is still a link. The Elements canvas says so when that happens.

### It works with scripting off

The address in the button is a real item, chosen by the server, written into the
page. Press it with JavaScript disabled, in a text browser, or through anything
that reads the markup rather than running it, and it goes somewhere sensible.

A small script improves the *second* press, and only that. A page restored from
the browser's back / forward cache comes back with its markup intact, so without
the script, Back then Random would lead straight back to the item just left. The
script picks again in the browser, and while it is there it skips the handful of
items already seen this visit — the difference between a random walk and a coin
that keeps landing on the same three items out of five. It remembers those in
`sessionStorage`, so it is forgotten when the tab closes, it is never sent
anywhere, and a browser told to block storage simply gets the plainer behaviour.

The button carries a shortlist of up to forty candidates for the script to choose
between rather than the whole collection, which keeps a large archive from adding
weight to every post page. The shortlist is drawn fresh on every request, so
capping it costs nothing in evenness.

The link is marked `nofollow`, because a destination that changes on every
request is not a stable edge of your site for a crawler to record — and every
page it points at is already reachable from the collection that lists them.

## Stacking on a narrow screen

**Stack On Mobile** changes the direction and nothing else. Below the `sm`
breakpoint the two buttons sit one above the other; the wording keeps its size,
each button keeps its padding, and the width setting keeps meaning what it meant
on a wide screen. On **Match** the stacked pair is still matched to each other and
centred; on **Fit text** each one is as wide as its own wording; and **Equal
halves** is where they run the full width of the column.

**Vertical Gap** is the space between them there, and it starts at 5 against the
Horizontal Gap's 10. It is a separate setting for exactly that reason: the two
want different answers. Side by side the gap is what stops a centred pair reading
as one wide control, and it can be generous. Stacked, the buttons are read as a
short list, and the distance that looks right beside another button looks like a
gulf above it.

Before build 8 the buttons stretched to the full width of the content once they
stacked, which pushed the arrow and the label to opposite edges and read as
though the padding had changed. **If you have a Prev / Next already placed, check
both gaps after updating** — the old Gap control has been replaced by these two,
so a placed instance takes the new defaults rather than carrying your old value
across.

## If you already have one placed

Elements writes every default into your project the moment a component is added,
so a changed default only ever reaches a *new* Prev / Next. The rule throughout
is whether your project already had a stored value to keep: if it did, the update
cannot touch it, and the setting has to be changed by hand.

**The version number jumps from 1 to 2 at build 18, and nothing in the component
changed because of that.** It is a numbering change only — the build number
carries straight on from 17, so 1.17 is the build before 2.18 and no build went
missing between them. Read the build numbers below, not the version.

**Builds 17 and 18 need nothing from you.** 17 corrected the Random button's
skip-what-you-have-already-seen list, which was comparing two spellings of the
same address and so quietly never skipping anything on a site with Pretty URLs
off; the button itself always worked. 18 corrects one server-side fallback that
disagreed with its own switch — Show Item Titles read as *on* in the one
circumstance the fallback is consulted at all, which is a settings file that
failed to arrive. Neither is a setting, so there is nothing to change by hand and
nothing about a placed navigation looks different afterwards.

**Build 26 needs nothing from you unless you set Levels Up with Collection
empty.** Levels Up is now ignored while Collection is empty, as the Inspector
has always said. Before, it moved the automatic search that many folders
higher. If you set it that way and your buttons worked, they still find the same
folder; if they were blank, they may now work. It also changes three quieter
things:
- The automatic search no longer climbs above your site's web root. A visitor
  who guessed the name of a Markdown file elsewhere in your hosting account
  could make that folder's titles and file names appear in the buttons.
- A scheduled item whose `date:` has a time without seconds
  (`2026-10-31 09:00`), or a quoted time, is now read in your server's time
  zone, as the CMS reads it, so it no longer appears in the buttons hours before
  the Collection shows it.
- A link can no longer be built on an address of the form `//host/…`.

**Build 24 needs nothing from you either, but some links can change.** It
brings the buttons in line with the Collection in five places, each described
under **Limits worth knowing**:
- Items that share a date are now walked in the Collection's order.
- An undated item whose filename starts with a date is placed by that date,
  and is hidden while that date is in the future.
- A file saved with a byte order mark keeps its `status:`.
- An untitled item is named from its slug.
- On a site using the CMS's own `authors/` and `tags/` folders, a post page no
  longer lands on the author profiles. Before this build, Previous and Next
  could point at the authors on an item page opened without an item, and on
  one reached by its own `slug:`.

A collection of undated, number-named files walks exactly as it did.

**Build 21 needs nothing from you either.** It stops two kinds of Markdown file
that Elements writes itself from being taken for items — a page's AI Markdown
copy and the online editor's preview draft — and it now recognises an item that
carries its own `slug:` in its front matter, which used to get no buttons at
all. A collection without either looks exactly as it did; see **Limits worth
knowing** for the detail.

**Build 16 breaks that rule once, deliberately, and you will see it.** The Random
button is a *new* setting, so there is no stored value for your project to keep —
which means the usual protection does not apply and the button **will appear on
navigations you already have placed** the next time you publish. On by default is
what makes it worth adding. If you do not want it, switch **Buttons → Show Random
Button** off on each placed instance before you publish. **Random Label** arrives
the same way, as "Random".

Nothing else about a placed navigation changes on its own. The three buttons
share every existing setting, so whatever your Previous and Next look like now is
what the Random button will look like.

**One thing you should change by hand after updating: Horizontal Gap.** Its
default drops from 25 to 10 in build 16, and that follows the usual rule — it
will *not* reach a navigation you already have placed. The old 25 was picked to
hold a *pair* apart. With a third button between them the row spreads much too
wide, which is exactly what it looks like:

| Setting | Was | Set it to |
|---|---|---|
| Layout → Horizontal Gap | 25 | **10** |

**Build 12 fixed four defaults that were never arriving**, whatever build you
placed on. Label Size, Item Title Size, Corner Radius and Image Radius were
written in a shape Elements does not read a default from, so a new navigation
took the control's own starting point instead of the one this component intended
— base text and the theme's plain radius rather than large text and 2xl. They are
written properly now and a *newly added* navigation gets them. One already placed
holds whatever it was given, as always, so set these by hand there:

| Setting | Intended all along | You would have got |
|---|---|---|
| Font and Text Styles → Label → Size | large | base |
| Font and Text Styles → Item Title → Size | large | base |
| Borders → Corners → Corner Radius | 2xl | theme default |
| Borders → Corners → Image Radius | md | theme default |

**Build 16 adds the Random button** and moves **Layout → Horizontal Gap** from 25
to **10** to make room for it. Builds 14 and 15 were never released; 13 is the
build before this one.

**Build 12 also widened both gaps** to 0–50 and moved **Layout → Horizontal Gap**
from 4 to **25**, which was the one deliberate change of appearance at the time.
A placed instance holds 4 and keeps it.

**Build 11 moved three.** All are controls you already have, so a placed instance
keeps what it holds and looks exactly as it did:

| Setting | Was | Now |
|---|---|---|
| Font and Text Styles → Item Title → Size | base | **large** |
| Font and Text Styles → Arrow → Weight | Semibold | **Bold** |
| Background → Background (Hover) | brand, one step darker | **accent** |

The Item Title one is invisible unless **Show Item Titles** is on, since that
starts off. The one exception is a navigation placed at build 8 or earlier and
never touched since: Arrow Weight did not exist then, so there is nothing stored
and it takes Bold.

**Build 9 moved four**, and the same rule applied — your project held the old
value for every one of them, so a placed instance kept the build 8 look:

| Setting | Was | Now |
|---|---|---|
| Sizing → Button Width | Fit text | **Match** |
| Font and Text Styles → Label → Size | base | **large** |
| Spacing → Padding, top and bottom | 4 | **2** |
| Borders → Corners → Corner Radius | Full | **2xl** |

So if a placed navigation still looks like build 8 — small wording, a deep pill,
each button hugging its own text — nothing has gone wrong and no reinstall will
change it. Those four are the list to work through.

## Limits worth knowing

These are real and they are stated here because this README is the only support
most people will get.

- **The Status and Date filters are this component's own work, not the CMS's.**
  Elements does not expose its item filtering to a third-party component at
  request time, so this component reads the `status:` and `date:` front matter
  and applies the same rules the Collection documents. It matches a stock
  Collection. It is not the same code, so if Realmac changes those rules this
  will need updating — and it is why the settings have to be kept in step by
  hand rather than inherited.

- **On a Tailwind 4 theme the hover colours are desktop-only, and that is
  Tailwind rather than this component.** Tailwind 4 compiles every `hover:`
  utility inside `@media (hover: hover)`, so Background (Hover), Border (Hover),
  Title (Hover) and the hover lift do not fire on a phone or tablet — where
  Tailwind 3 fires them on tap. Elements 3 runs both: a theme is on Tailwind 4
  only when it declares it, and a site whose theme is still on Tailwind 3 keeps
  the tap behaviour. No component can override it, because the rule is written
  by the theme's own compiler. The old behaviour is a site-wide switch rather
  than a component one: **Project Settings → Advanced**, the legacy tap-to-hover
  option added in Elements 3.0.7. Nothing is unreachable either way — the buttons
  are ordinary links and behave identically; they just do not change colour under
  a finger. Worth knowing if you have set the hover background to carry the
  contrast rather than the resting one.

- **Front matter is read simply.** The block at the top of each file is parsed
  line by line, one nested level deep, which is enough for `title`, `date`,
  `status`, `slug` and an `image:` block. Anything more elaborate is ignored rather than
  misread. Front matter must use spaces, not tabs — a YAML rule, but this is
  where you would notice it.

- **A missing date is taken from the filename** when the filename starts with
  one, as the CMS does, so a scheduled `2099-01-01-launch.md` stays hidden under
  **In the past** even with no `date:` line. **Anything else undated sorts as
  1970**: it sits at the old end of the list (last when descending, first when
  ascending), and undated items are ordered among themselves by filename,
  reversed when descending. The CMS dates those from their file times instead
  (see *If your items have no `date:`* above), so when *no* item has a date,
  order by File Name on both sides.

- **Items that share a date keep the Collection's order.** The CMS leaves them
  in filename order whichever way the list runs, and from build 24 so does this,
  which matters most for the date-only `date:` lines the online editor writes.
  Titles also compare as the CMS compares them, with capitals first.

- **Odd encodings are read the way the CMS reads them.** A file saved with a
  byte order mark keeps its front matter, so its `status:` still counts, and
  text that is not UTF-8 is read as Windows-1252 — the CMS's own fallback —
  so an older file's accented title still shows. An item with no `title:` is
  named as the CMS names it, from its slug: `2024-05-01-my-song.md` reads
  "My song".

- **How items are named.** The CMS gives an item the `slug:` from its front
  matter when it has one; otherwise its filename minus `.md`, with a leading
  `YYYY-MM-DD-` date taken off, so `2024-05-01-my-song.md` is `my-song` and
  `0001-my-song.md` is `0001-my-song`. Looking an address up, it accepts the
  whole filename as well as the date-stripped one, and an authored slug only when
  no filename answers. This component follows the same rules when it decides
  which item is current. The links it writes use the item's own `slug:` where
  the CMS will bring that address back to the same item, and the whole filename
  otherwise, which always reaches its own file.

- **An authored `slug:` is used only if it is made of letters, digits, dots,
  hyphens and underscores.** Anything else — a space, an accented letter, a
  slash — is never written into a link, and an address carrying one is refused
  outright, the same as any other address that does not look like a slug. That
  page then shows the first item's buttons rather than its own, so keep authored
  slugs to those characters.

- **Only `.md` files are items here.** The CMS will also read items saved as
  `.markdown` or `.txt`, but Elements' own editor writes `.md` only, so this
  matters only for files you upload by hand. It is deliberately not widened: the
  automatic folder search would then take a `robots.txt` or `llms.txt` in a
  folder above the page for a collection. Rename such items to `.md`.

- **Files Elements writes for itself are not items.** With *Generate AI
  Markdown* on — the default for a new project — every published page gets a
  Markdown copy beside it (`about.md` beside `about.php`; older builds wrote
  `about.html.md`), and the online editor leaves `name.draft.md` behind while an
  author previews unsaved changes. A Markdown file with a page of the same name
  beside it, any name ending `.html.md`, `.htm.md` or `.php.md`, and any
  `.draft.md` are skipped, so none of them can make a page folder look like a
  collection. Filling in **Collection** avoids the question entirely.

- **Opening the Item Template page with no item in the address** shows the first
  item's navigation rather than nothing, which is what makes Preview useful.
  Elements' own Item behaves the same way. Match Order By and Order Direction to
  the Collection and both agree on which item "first" is.

- **Feature images.** A relative `image: src:` is resolved against
  `/resources/`, where the CMS publishes them. An absolute path or a full URL is
  used as it stands. If your images live elsewhere the card style will show a
  broken image, and Show Feature Image should be switched off.

- **It reads the folder on every request.** At tens or hundreds of items that is
  nothing. At several thousand it is a directory listing and a front-matter read
  per item on every page view, and you would want caching this component does
  not do.

- **Random needs the page to reach the server.** If your host or a CDN serves a
  cached copy of a post page, every visitor gets whichever item was random when
  that copy was made, until the cache expires. Nothing in a component can
  override a cache in front of it, and this component cannot send cache headers
  of its own either: it renders in the middle of a page, long after the response
  headers have gone out, which is too late for PHP to set one. On ordinary shared
  hosting, where PHP pages are not cached, this does not arise. The in-browser re-pick covers the same ground for anyone with
  JavaScript on, so a cached page still gives them a fresh item.

- **No drop zones in 1.0.** Custom card layouts using `{{prev.title}}` and
  friends are not in this release. Elements resolves such tokens from the CMS's
  own item context, and a third-party component cannot extend that context to
  components dropped inside it, so the mechanism has to be this component's own
  token substitution at request time. The design is settled but it needs a real
  publish to confirm how a drop zone declared in only one branch of an
  edit/published split behaves, and shipping an unverified guess into other
  people's sites is not worth it. Until then the Background, Borders and
  Font and Text Styles groups cover the styling.

- **Why not the CMS JSON API.** It would give exact filtering parity, but every
  `/api/*` route — public reads included — requires a Pro licence with JSON API
  access for the domain and returns `402 Payment Required` without one. This is
  a free component that has to work on hosting nobody controls, so it cannot
  depend on that.

## If nothing appears

Switch **Diagnostics** on and view the page source. It leaves an HTML comment
saying which folder it used, the slug it read from the address, whether the URLs
are pretty or query-string, how many items passed the filters, where the current
item sat in that list, what it chose either side, and which item Random landed on
out of how many it had to choose from. It writes a comment rather than anything
visible, so you can leave it on while a live page is being looked at. Switch it
off when you are done. Reload the page and the `random:` line should name a
different item most times; that is the quickest proof the component is running
server-side at all.

The usual causes, in order:

1. **The page is not `.php`.** Nothing renders, by design.
2. **The component is not inside a CMS Item.** There is no current item.
3. **The folder was not found.** Fill in Collection, and Levels Up if the
   content sits above the page. Diagnostics names the folder it settled on.
4. **Only one item passes the filters.** With one item there are no neighbours
   and nowhere random to go. Check Status and Date against your Collection.
5. **At The Ends is Hide** and you are on the first or last item. That is
   correct behaviour — try Disable or Loop to see it.

## Doing this without the component

If you would rather not add a server-side component, the same result can be had
in the browser: put a second Collection on the Item Template page pointing at
the same folder with the same sort and filters, hide it with CSS, and let a
small script find the current slug among its links and build the buttons from
the neighbours. Elements' own filtering then applies for free, which is the one
genuine advantage over this component.

The costs are that every filter and sort setting has to match by hand, Items Per
Page has to exceed your total item count or the chain breaks at the pagination
boundary, and the hidden collection renders one link per item on every post
page. It is a reasonable interim, and it is what this component replaces.

---

Michael Droste · [trumpetstudio.com](https://www.trumpetstudio.com)
