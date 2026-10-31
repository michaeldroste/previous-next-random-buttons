/**
 * Prev / Next - build-time hook.
 *
 * The division of labour the API intends: the hook decides and normalises, the
 * template ingests. Everything the request-time PHP needs crosses the boundary
 * exactly once, as JSON, in configJson - so the Inspector, this hook and the
 * server agree on one set of keys.
 *
 * Styling deliberately does NOT pass through here. Every class string
 * interpolates straight from its own control into the template, so there is no
 * second copy of a default in this file to drift out of step with the
 * Inspector. The only values read below are the ones the PHP has to act on,
 * the layout classes that depend on more than one control at once, and the two
 * values that are not classes at all - the arrow's stroke width and the dice
 * outline's, both of which land in an SVG attribute and so have to be checked
 * against a known list before they are written. An unrecognised stroke-width is
 * read by browsers as 1, which is thinner than any choice the control offers.
 *
 * Nothing here may consult the clock. Hooks run at publish time in a closed
 * sandbox, so a date computed here would freeze into the page; the "in the
 * past" item filter is therefore evaluated by the PHP when the page is
 * requested, against the server's clock.
 */

/* Absent and deliberately empty are different answers. `??` keeps them apart -
   an author who clears the Previous label wants no label, not the default back.
   `||` would silently restore it. */
const numOr = (v, d) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : d;
};

/* Entity-encode anything that lands in an attribute or in edit-canvas markup.
   Values insert verbatim, so an author's stray angle bracket or quote would
   otherwise reshape the element around it. */
const esc = (s) => String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const CLAMP = {
    "1": "line-clamp-1",
    "2": "line-clamp-2",
    "3": "line-clamp-3",
    none: "line-clamp-none"
};

/* Arrow stroke widths, keyed by the value the control stores. This is the one
   setting that reaches the page as a bare attribute rather than a class, so it
   is looked up rather than interpolated: anything not on this list is not a
   number and would give the SVG an invalid stroke-width, which browsers read as
   1 - a thinner arrow than any of the choices offered. */
const STROKE = {
    "1.5": "1.5",
    "2": "2",
    "2.5": "2.5",
    "3": "3"
};

/* The dice outline, keyed by the same control. A chevron is one open stroke
   crossing most of the icon, so it carries the weight the label asks for; a die
   is a small closed box with pips inside it, and the arrow's own weight laid on
   a 12-unit square closes the corners in and turns the pair into two dark blobs
   at the size these render. Two thirds of it, to the nearest quarter unit, is
   what makes the two icons look drawn by the same hand. Derived rather than
   fixed, so Arrow Weight still reaches the dice instead of quietly applying to
   two buttons out of three. */
const DICE_STROKE = {
    "1.5": "1",
    "2": "1.25",
    "2.5": "1.75",
    "3": "2"
};

/* Representative neighbours for the edit canvas. PHP cannot run there, so the
   component draws real structure rather than an empty box the author has to
   imagine their way through. */
const PLACEHOLDERS = {
    prev: "An Earlier Post Title Sits Here",
    next: "The Following Post Title Sits Here"
};

const transformHook = (rw) => {
    const p = rw.props || {};
    const project = rw.project || {};
    const isEdit = project.mode === "edit";

    const buttonStyle = p.buttonStyle ?? "buttons";
    const pairing = p.pairing ?? "pair";
    const singleDirection = p.singleDirection ?? "next";
    const atEnds = p.atEnds ?? "hide";
    const titleClamp = p.titleClamp ?? "2";

    const isSingle = pairing === "single";
    const showsPrevious = !isSingle || singleDirection === "prev";
    const showsNext = !isSingle || singleDirection === "next";

    const showLabels = p.showLabels ?? true;
    const showTitles = p.showTitles ?? false;
    const showChevrons = p.showChevrons ?? true;
    const showFeatureImage = p.showFeatureImage ?? true;

    /* The Random button is not part of the Show pair, because it is not a
       direction - it is a third destination that happens to sit between the two
       and is switched on its own. So it survives Show set to One, which is the
       combination somebody will want: a single "Next Episode" with the dice
       beside it. */
    const showsRandom = (p.showRandom ?? true) === true;

    const styleIsCards = buttonStyle === "cards";
    const styleIsLinks = buttonStyle === "links";
    const styleIsButtons = buttonStyle === "buttons";

    /* An image only ever appears on the card style, so the two controls that
       govern it are combined here - @if takes a single condition. */
    const wantsImage = styleIsCards && showFeatureImage === true;

    const labelPrevious = String(p.labelPrevious ?? "Previous");
    const labelNext = String(p.labelNext ?? "Next");
    const labelRandom = String(p.labelRandom ?? "Random");

    const chevronWeight = String(p.chevronWeight ?? "3");
    const chevronStroke = STROKE[chevronWeight] || "3";
    const diceStroke = DICE_STROKE[chevronWeight] || "2";

    const alignsToEdges = (p.alignToEdges ?? false) === true;
    const stacksOnMobile = (p.stackOnMobile ?? true) === true;

    /* Three widths, but only two mechanisms.

       Match asks for the narrower button to grow to the wider one's size, and
       CSS can only answer that where the two share a shrink-to-fit parent: an
       inline-sized grid of equal columns takes its own width from the widest
       column, and both columns then take that. So Match needs the extra
       wrapper element the template draws, and the wrapper cannot be pushed to
       both edges of the content at once.

       Which is not a conflict to arbitrate, because at full width "equal, and
       one at each edge" IS equal halves - the same pixels by another name. So
       Align To Edges keeps its meaning and Match resolves to Equal halves under
       it, rather than one control silently disabling the other.

       With a single button there is nothing to match, so Match is Fit text
       there. Equal is left alone in that case: a lone button filling the row is
       long-standing behaviour and somebody's layout depends on it.

       "A single button" is a count, not a pair test. Random is a button like
       any other as far as width goes, so Previous plus Random has two things to
       match and gets the same treatment Previous plus Next always did. */
    const cellCount = (showsPrevious ? 1 : 0) + (showsRandom ? 1 : 0) + (showsNext ? 1 : 0);
    const widthMode = p.buttonWidth ?? "match";
    const wantsMatch = widthMode === "match" && cellCount > 1;
    const widthIsEqual = widthMode === "equal" || (wantsMatch && alignsToEdges);
    const widthIsMatch = wantsMatch && !alignsToEdges;

    /* Stacking is meant to change the direction and nothing else, and two class
       names were quietly changing a great deal more.

       In a column the cross axis is horizontal, so items-stretch - which on a
       wide screen only makes the two buttons match heights - blows each one out
       to the full width of the content. The button then dwarfs its own wording,
       and the flex-1 wrapper inside drives the arrow and the label to opposite
       edges, which reads as though the padding changed when it has not. Fit
       text therefore hugs its content until the row turns horizontal again.
       Equal halves keeps the stretch, because full width on either side of the
       fold is exactly what equal halves asks for.

       Match takes the fit-text answer for the same reason: what the row holds
       there is the shrink-to-fit wrapper, and stretching that to full width
       would undo the very thing it is for.

       Compiled names: items-center sm:items-stretch items-stretch */
    const rowAlign = (stacksOnMobile && !widthIsEqual)
        ? "items-center sm:items-stretch"
        : "items-stretch";

    /* flex-1 grows along the MAIN axis, so once the row is a column it stretches
       the buttons vertically instead of dividing the width - equal halves became
       equal heights, which is not a thing anyone asked for. Held back to the
       breakpoint where the row is horizontal again.
       Compiled names: flex-1 sm:flex-1 */
    let growClass = "";
    if (widthIsEqual) {
        growClass = stacksOnMobile ? "sm:flex-1" : "flex-1";
    }

    /* The Match wrapper. Equal columns in a container sized to its own content:
       the grid's max-content width is twice the widest button, so each 1fr
       column lands on that width and the short button grows to the long one.
       min-w-0 lets the whole thing shrink again rather than overflow a column
       too narrow for it, and the columns stay equal as it does.

       Stacked, the flow turns to rows: one column, still sized to the widest
       button, so the pair matches above the fold as well as beside it.
       Compiled names: grid min-w-0 auto-cols-fr items-stretch grid-flow-row sm:grid-flow-col grid-flow-col */
    const matchGrid = widthIsMatch
        ? "grid min-w-0 auto-cols-fr items-stretch "
            + (stacksOnMobile ? "grid-flow-row sm:grid-flow-col" : "grid-flow-col")
        : "";

    /* flex-1 on the text makes it swallow whatever room the button has spare,
       which is right everywhere the button is only as wide as its contents and
       wrong the moment Match widens one. There it would hold the arrow against
       one edge and the wording against the other, with the gap the two buttons
       differ by opened up in the middle - the pair would be the same width and
       look less alike than before. Without it the arrow and the wording stay a
       single centred group.
       Compiled names: min-w-0 flex-1 */
    const textWrapClass = widthIsMatch ? "min-w-0" : "min-w-0 flex-1";

    /* Four-way, so it cannot be a template condition. A lone Next button has to
       finish at the right edge; a lone Previous at the left. Written out in full
       rather than assembled from fragments so Tailwind's scanner sees each name.

       Anything with more than one button in it spreads, which is what puts
       Random in the middle of the full trio. A lone Random has no edge to go to
       - it is not a direction - so it stays centred, and that is why the test
       is a count rather than the old pair test with a third name bolted on.
       Compiled names: justify-between justify-center justify-start justify-end */
    let rowJustify = "justify-center";
    if (alignsToEdges) {
        if (cellCount > 1) {
            rowJustify = "justify-between";
        } else if (showsNext) {
            rowJustify = "justify-end";
        } else if (showsPrevious) {
            rowJustify = "justify-start";
        }
    }

    /* The PHP contract. Keys read by the server and nothing else; php_static.py
       compares this list against what the PHP actually reads. */
    const config = {
        collectionPath: String(p.collectionPath ?? ""),
        levelsUp: numOr(p.collectionLevelsUp, 0),
        orderBy: p.orderBy ?? "date",
        orderDirection: p.orderDirection ?? "desc",
        previousMeans: p.previousMeans ?? "older",
        status: p.statusFilter ?? "published",
        dateFilter: p.dateFilter ?? "past",
        atEnds: atEnds,
        showsPrevious: showsPrevious,
        showsNext: showsNext,
        showsRandom: showsRandom,
        showLabels: showLabels === true,
        labelPrevious: labelPrevious,
        labelNext: labelNext,
        labelRandom: labelRandom,
        showTitles: showTitles === true,
        showChevrons: showChevrons === true,
        wantsImage: wantsImage,
        diagnostics: (p.showDiagnostics ?? false) === true
    };

    rw.setProps({
        isEdit: isEdit,

        styleIsCards: styleIsCards,
        styleIsLinks: styleIsLinks,
        styleIsButtons: styleIsButtons,
        hasBorder: (p.showBorder ?? false) === true && !styleIsLinks,
        hasHoverTransition: (p.hasHoverTransition ?? true) === true,
        stacksOnMobile: stacksOnMobile,
        alignsToEdges: alignsToEdges,
        rowJustify: rowJustify,
        rowAlign: rowAlign,
        growClass: growClass,
        widthIsMatch: widthIsMatch,
        matchGrid: matchGrid,
        textWrapClass: textWrapClass,
        chevronStroke: chevronStroke,
        diceStroke: diceStroke,

        showsPrevious: showsPrevious,
        showsNext: showsNext,
        showsRandom: showsRandom,
        showsLabels: showLabels === true,
        showsTitles: showTitles === true,
        showsChevrons: showChevrons === true,
        wantsImage: wantsImage,

        endsDisable: atEnds === "disable",

        titleClampClass: CLAMP[titleClamp] || "line-clamp-none",

        /* Escaped for the edit canvas, where these land in markup directly.
           The published side takes the raw label out of configJson and runs it
           through htmlspecialchars at request time instead. */
        labelPreviousText: esc(labelPrevious),
        labelNextText: esc(labelNext),
        labelRandomText: esc(labelRandom),

        /* Previous and Next always have something to draw - an item title, or
           the label, or the arrow. Random has only two of those three, so
           turning both off leaves a button that is a live link to a page with
           nothing on it to click. Not silently corrected, because either switch
           on its own is a legitimate thing to want; flagged where the author can
           still see it. */
        randomIsEmpty: showsRandom && showLabels !== true && showChevrons !== true,
        placeholderPrevious: PLACEHOLDERS.prev,
        placeholderNext: PLACEHOLDERS.next,

        /* `<` escaped so no Inspector value can terminate the script element
           the JSON is interpolated into. Still valid JSON either way. */
        configJson: JSON.stringify(config).replace(/</g, "\\u003C")
    });

    const customId = String(p.customId ?? "").trim().replace(/["'\s<>]/g, "");

    rw.setRootElement({
        as: "nav",
        class: ["ts-prevnext", String(p.cssClasses ?? "").trim()]
            .filter(Boolean)
            .join(" "),
        args: {
            id: customId || undefined,
            "aria-label": "More items",
            "data-prevnext": rw.node.id
        }
    });
};

exports.transformHook = transformHook;
