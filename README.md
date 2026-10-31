# CMS Prev Next for RapidWeaver Elements

Previous / Random / Next navigation for [RapidWeaver Elements](https://www.realmacsoftware.com/elements) CMS items. Drop it into a CMS
Item page and it finds the neighbouring post on its own — no hidden collection,
no page picker, no list to maintain.

Free, MIT licensed. No libraries, no CDN, no third-party services.

Install: **Elements → Settings → Addons → Add Pack**. The component appears in
the **CMS** group.

---

## Two requirements

Both are how the Elements CMS works, not choices this component makes.

1. **It has to sit inside a CMS Item**, in the Before or After drop zone. It
   needs to know which item is being viewed, and outside that context there is no
   current item to have neighbours. Placed anywhere else it renders nothing.
   Related Items behaves the same way, for the same reason.

2. **The page has to be published with a `.php` extension**, like every CMS page.
   The neighbours are worked out when the page is requested, not when you publish.
   If the page is not `.php` the component renders nothing at all — deliberately.
   It will never print PHP source onto your page.

## What you get out of the box

**Previous**, **Random** and **Next**: three soft-cornered rectangles in your
theme's brand colour, turning to its accent colour under the pointer, body font at
large size in semibold, with a bold arrow or a pair of dice beside it — matched to
each other's width and centred together as a well-separated row.

Add it below your Collection Item and publish. That is usually the whole job.

The hover colour is the accent at the *same* depth as the background rather than
a step darker, so hovering changes the hue and nothing else — which is what makes
the change unmistakable on a theme whose brand shades sit close together.

Each button lands at 44px high, the smallest a tap target should be. Corner Radius
starts at 2xl rather than Full, because Full is less a radius than an instruction
to round as far as the height allows — so a button changes shape whenever its
padding does. Set it to Full if you want the pill.

Matched width is the default because "Previous" is twice the word "Next" is, and
a pair sized to its own wording comes out visibly lopsided.

## Finding your collection, without being told

**Collection is empty by default, and empty means "find the folder yourself."**

The search is not a guess. It looks in the folders beside and above the page — and
two levels of subfolder within each, because the standard layout puts the page at
`/post/` and the content at `/cms/posts/` — for the Markdown file whose slug
matches the address being viewed. The folder holding that file *is* your
collection, by definition.

It stops at the first match, looks no more than three levels up, skips Elements'
own `rw/` and `resources/` trees, and gives up after 120 directories, so it can
never turn a page request into a walk of your whole site.

Fill **Collection** in only if the search misses — a path relative to the page,
such as `posts` or `content/episodes`. **Levels Up** climbs that many folders
first, for content that sits above the page rather than beside it. A configured
path can never climb out on its own or point at an absolute location.

**Pretty URLs are detected, not asked about.** There's no switch to get out of
step: the neighbour links are written in whichever form the visitor's request
arrived in, whether that's a clean path or `?item=slug`.

## The one thing you must get right

**Order By**, **Order Direction**, **Status** and **Date** have to match the
Collection that lists these items. If they disagree the buttons will point at
real posts in the wrong order, which is worse than pointing nowhere.

The defaults match a stock Collection — Date Published, Descending, Published, In
the past — so if you haven't changed those on your Collection, you needn't change
them here.

**If your items have no `date:`**, order by **File Name** instead. A collection
with no dates reads as one identical 1970 timestamp, so "Date Published"
degenerates into whatever the tie-break happens to be and Older / Newer stop
meaning anything. Files named `0001-…`, `0002-…` sort into the order you intended.

## The Random button

On by default; **Buttons → Show Random Button** turns it off. It takes every one
of the other two buttons' settings, because it's the third of a set rather than a
variation on one.

**It works with scripting off.** The address in the button is a real item, chosen
by the server and written into the page, so it goes somewhere sensible in a text
browser or anywhere the markup is read rather than run.

A small script improves the *second* press. A page restored from the browser's
back/forward cache comes back with its markup intact, so without it, Back then
Random would lead straight back to the item just left. The script picks again in
the browser, and while it's there it skips the handful of items already seen this
visit. Those are remembered in `sessionStorage`, so they're forgotten when the tab
closes and never sent anywhere; a browser told to block storage simply gets the
plainer behaviour.

The button carries a shortlist of up to forty candidates rather than the whole
collection, drawn fresh on every request — so a large archive adds no weight to
every post page, and capping it costs nothing in evenness.

Three things about it look like omissions and are not. **It carries no item title
and no feature image**, whatever those switches say — either one would name the
destination, and a destination you can read before clicking is not a random one.
**The current item is always excluded**, because a random link to the page you're
on reads as broken. And it's marked **`rel="nofollow"`**, because a destination
that differs per request isn't a stable edge of your site, and every page it
points at is already reachable from the collection.

## Settings

The panel follows the same group names and running order as Elements' own Button
— Font and Text Styles, Layout, Sizing, Spacing, Transitions, Effects,
Background, Borders, Advanced — so the cosmetic half is where you already expect
it. Only the first two groups are particular to this component.

Three button styles: **Buttons**, **Links** or **Cards**. Item titles are off by
default; **Show Item Titles** adds the neighbouring headline, and **Show Labels**
is the separate switch for the Previous / Next wording. **Align To Edges** gives
the usual blog convention of one button at each end; centred is the default,
because at full width it throws the pair a long way apart and fights anything
else centred below them.

At the ends of a collection, **At The Ends** chooses hide, disable, or loop.

Hover states preview in the Elements canvas as well as in a browser, so the
background, border and title hover colours can be judged without publishing.

## Updating a navigation you already have

Elements writes every default into your project the moment a component is added,
so a changed default never reaches a navigation already on a page — it keeps what
it holds, and the setting has to be changed by hand. Two consequences are worth
knowing before you publish after an update.

**The Random button will appear on navigations you already have placed.** It is a
*new* setting, so there is no stored value for your project to keep and the usual
protection does not apply. If you do not want it, switch **Buttons → Show Random
Button** off on each placed instance first.

**Set Layout → Horizontal Gap to 10 by hand.** Its default dropped from 25 to 10
to make room for the third button, and that change follows the usual rule, so it
will *not* reach a navigation already placed. At 25 the three buttons spread much
too wide.

The version number jumps from 1 to 2 at build 18 and nothing in the component
changed because of that — the build number carries straight on from 17, so no
build went missing between them.

The full history, including the four defaults that were never arriving before
build 12, is in the README inside the pack.

## Limits worth knowing

Stated here because this README is the only support most people will get.

- **The Status and Date filters are this component's own work, not the CMS's.**
  Elements does not expose its item filtering to a third-party component at
  request time, so this reads the `status:` and `date:` front matter and applies
  the same rules the Collection documents. It matches a stock Collection, but it
  is not the same code — which is why the settings have to be kept in step by
  hand rather than inherited.

- **Front matter is read simply** — line by line, one nested level deep, which is
  enough for `title`, `date`, `status` and an `image:` block. Anything more
  elaborate is ignored rather than misread. It must use spaces, not tabs.

- **The slug is the whole filename**, minus `.md`. A file called `0001-my-song.md`
  is linked as `?item=0001-my-song`, prefix included, and that's the form this
  writes too.

- **It reads the folder on every request.** At tens or hundreds of items that is
  nothing. At several thousand it's a directory listing and a front-matter read
  per item on every page view, and you'd want caching this component does not do.

- **Random needs the page to reach the server.** If your host or a CDN serves a
  cached copy of a post page, every visitor gets whichever item was random when
  that copy was made. Nothing in a component can override a cache in front of it.
  On ordinary shared hosting, where PHP pages aren't cached, this doesn't arise —
  and the in-browser re-pick covers the same ground for anyone with JavaScript on.

- **Feature images**: a relative `image: src:` resolves against `/resources/`,
  where the CMS publishes them. If your images live elsewhere, switch Show Feature
  Image off.

- **The hover colours are desktop-only on an Elements 3.x site.** Tailwind 4
  compiles every `hover:` utility inside `@media (hover: hover)`, so Background
  (Hover), Border (Hover), Title (Hover) and the hover lift don't fire on touch,
  where Tailwind 3 used to fire them on tap. The buttons are ordinary links and
  behave identically; they just don't change colour under a finger. The old
  behaviour is a site-wide switch: **Project Settings → Advanced**, the legacy
  tap-to-hover option added in Elements 3.0.7.

- **No drop zones in this release.** Custom card layouts using `{{prev.title}}`
  and friends aren't in yet — Elements resolves such tokens from the CMS's own
  item context, and a third-party component cannot extend that context to
  components dropped inside it.

## If nothing appears

Switch **Diagnostics** on. It writes an HTML comment into the page source — never
anything visible — naming the folder it found, the slug it read from the address,
whether the URLs are pretty or query-string, how many items passed the filters,
and where the current item sits in the list. Turn it off before launch.

## Requirements

[RapidWeaver Elements](https://www.realmacsoftware.com/elements) 3.0.9 or later, a page published as `.php`, and placement
inside a CMS Item. No libraries, no build step, no external services.

## License

MIT. See [LICENSE](LICENSE) inside the pack.
