---
name: frontend-design
description: Guidance for distinctive, intentional visual design when building new UI or reshaping existing web interfaces. Helps establish unique aesthetic direction, custom typography, and bespoke layouts.
---

# Frontend Design

Approach this as the design lead at a small studio known for giving every client a visual identity that could not be mistaken for anyone else's[cite: 3]. This client has already rejected proposals that felt templated, and is paying for a distinctive point of view: make deliberate, opinionated choices about palette, typography, and layout that are specific to this brief, and take one real aesthetic risk you can justify[cite: 3].

## Ground it in the subject

If the brief does not pin down what the product or subject is, pin it yourself before designing: name one concrete subject, its audience, and the page's single job, and state your choice[cite: 3]. Use any provided context about the user's project or target brand as a hint[cite: 3]. The subject's own world, its materials, instruments, artifacts, and vernacular, is where distinctive choices come from[cite: 3]. Build with the brief's real content and subject matter throughout[cite: 3].

## Design principles

For web designs, the hero is a thesis[cite: 3]. Open with the most characteristic thing in the subject's world, in whatever form makes sense for it: a headline, an image, an animation, a live demo, an interactive moment[cite: 3]. Be deliberate with your choice: a big number with a small label, supporting stats, and a gradient accent is the template answer—only use if that's truly the best option[cite: 3].

Typography carries the personality of the page[cite: 3]. Pair display and body faces deliberately, avoiding default system families or overused design pairs unless explicitly requested[cite: 3]. Set a clear type scale with intentional weights, widths, and line heights[cite: 3]. Make the type treatment itself a memorable part of the design, not a neutral delivery vehicle for content[cite: 3].

Structure is information[cite: 3]. Structural devices—numbering, eyebrows, dividers, labels—should encode something true about the content, not decorate it[cite: 3]. Many generic designs use numbered markers (01 / 02 / 03), but that's only appropriate if the content actually is a sequence, like a real process or a typed timeline[cite: 3]. Question whether structural choices clarify information before incorporating them[cite: 3].

Leverage motion deliberately[cite: 3]. Think about where and if animation can serve the subject: a page-load sequence, a scroll-triggered reveal, hover micro-interactions, or ambient atmosphere[cite: 3]. An orchestrated moment usually lands harder than scattered effects; choose what the direction calls for[cite: 3]. Sometimes less is more, as excessive animation can contribute to an artificial or templated feel[cite: 3].

Match complexity to the vision[cite: 3]. Maximalist directions need elaborate execution; minimal directions need precision in spacing, type, and detail[cite: 3]. Elegance is executing the chosen vision well[cite: 3].

Consider written content carefully[cite: 3]. Often a design brief may not contain real content, and it's up to you to come up with copy[cite: 3]. Copy can make a design feel as templated as the visual system itself[cite: 3].

## Process: brainstorm, explore, plan, critique, build, critique again

AI-generated UI designs often cluster around a few common defaults[cite: 3]:

1. Warm cream backgrounds (near `#F4F1EA`) with high-contrast serif displays and terracotta accents[cite: 3].
2. Near-black backgrounds with a single neon acid-green or bright accent[cite: 3].
3. Broadsheet layouts with hairline rules, zero border-radius, and dense newspaper columns[cite: 3].

Where the brief specifies a direction, follow it exactly[cite: 3]. Where it leaves an axis open, make deliberate choices rather than falling back to these defaults[cite: 3].

Work in two passes[cite: 3]:

1. **Plan & Token System:** Brainstorm a compact token system covering color (4–6 named hex values), typography (display, body, utility roles), layout concept (using prose and ASCII wireframes), and a single signature element that makes the design memorable[cite: 3].
2. **Review & Execute:** Review the plan against the brief before building[cite: 3]. If any part reads like a generic template answer, adjust it before writing code[cite: 3]. Maintain clear CSS specificity and derive all styles directly from your token system[cite: 3].

## Restraint and self-critique

Spend your boldness in one place[cite: 3]. Let the signature element be the one memorable thing, keep everything around it quiet and disciplined, and cut decoration that does not serve the brief[cite: 3]. Build to a strict quality floor: fully responsive, clear keyboard focus states, and respected `prefers-reduced-motion` settings[cite: 3].

## Interface Copy Writing

Words in a design exist to make the interface understandable and usable[cite: 3]. Treat copy as essential design material[cite: 3]:

- Write from the end user's perspective, naming elements by what users control rather than underlying backend systems[cite: 3].
- Use plain terms and active voice (`Save changes`, `Publish`)[cite: 3]. Ensure actions match their resulting states (`Publish` button -> `Published` toast)[cite: 3].
- Handle empty states and errors with clarity and direction, explaining what happened and how to proceed without generic filler or vague language[cite: 3].