# Psychology-informed interaction design

Commonplace does **not** claim to provide therapy or improve mental health. The psychology in this project is interaction-design psychology: how attention, memory, choice, motivation, and external representation affect the experience of making a journal page.

## 1. No streak architecture

Many journaling products borrow reinforcement patterns from fitness and habit apps. That can be useful for some people, but it changes the meaning of the activity: a journal can become a compliance task.

Commonplace therefore has no:

- daily streak
- missed-day warning
- leaderboard
- completion ring
- “you only wrote X words” message
- social proof counter

The intended return cue is *affection for the object*, not fear of breaking a chain.

## 2. Progressive disclosure reduces control overload

A freeform editor can easily become a cockpit.

Commonplace splits the workspace into four stable verbs:

- Write
- Decorate
- Paper
- Photos

The inspector remains mostly empty until an element is selected. This means the user sees controls in the context in which they are needed.

## 3. Recognition beats remembering tool syntax

Decorative materials are visual and browseable. Search is optional. A user does not need to remember the exact name of a sticker, command, or template.

The interface uses:
- object previews
- stable categories
- visible paper samples
- direct manipulation

rather than command-heavy workflows.

## 4. Spatial arrangement is treated as cognition

Physical journals are not only text containers.

A pasted receipt beside a sentence, an arrow between two scraps, an image partly covered by tape, or one phrase written unusually large can all change how a page is read.

Commonplace keeps:
- x/y position
- scale
- rotation
- overlap
- layering
- salience

as first-class state.

That makes the page closer to an external associative workspace than a document with decorations around the edges.

## 5. Blankness is not failure

Empty pages are common in physical notebooks. They may be intentional, unfinished, skipped, or simply waiting.

The interface uses language such as “blank pages are allowed” rather than framing empty state as something the user must correct.

## 6. Cheap experimentation encourages expression

The editor supports:
- undo
- redo
- duplicate
- layer movement
- lock/unlock
- reversible paper changes

These lower the cost of trying something aesthetically uncertain.

## 7. Personalization is front-loaded, complexity is not

The first meaningful action is designing a cover. This creates ownership before the user learns the editor.

The cover designer offers bounded palettes, patterns, and motifs. It provides enough choice to feel personal without presenting hundreds of settings on day one.

## 8. Memory cues can be nonverbal

Autobiographical recall can be cued by more than prose. Commonplace supports images, dates, repeated motifs, colors, and ephemera-like objects as possible retrieval cues.

The project does not infer or diagnose memory from those cues. It simply preserves them.

## 9. Focus mode supports attentional narrowing

Focus mode removes page thumbnails, material drawers, and the inspector while keeping the current page visible.

It is not a “productivity mode.” It exists because sometimes the useful move is to stop offering choices.

## 10. Calm mode is a product stance

Calm mode is on by default. In v0.1 it signals the design contract: Commonplace does not quantify the user's private writing.

Future features should be evaluated against that contract before being added.

## Design question

The core product question is:

> Can a digital journal provide the expressive freedom of a scrapbook without importing either the complexity of a professional design tool or the behavioral pressure of a habit tracker?

That is the standard new features should be judged against.

## 11. Reflection is optional, not a treatment claim

v0.2 adds a **Reflect** drawer. It is deliberately framed as a set of optional doorways into a page rather than a mental-health intervention.

The drawer does not:

- diagnose a condition
- score mood
- infer risk from writing
- prescribe a coping technique
- promise that journaling will improve wellbeing
- force gratitude, positivity, disclosure, or a daily reflection ritual

Every prompt can be skipped. “Not today” is a valid response.

This distinction matters because evidence on expressive writing is mixed. Some individual studies report benefits in particular groups or tasks, while larger reviews have found small, inconsistent, or null average effects. Commonplace therefore uses psychology to design *choices and prompts*, not to market journaling as therapy.

## 12. Emotion vocabulary without mood scoring

The Reflect drawer includes a small feeling-word palette. Its purpose is not to quantify emotion. It provides more vocabulary than “good / bad / fine” and allows several words to coexist.

Research on affect labeling suggests that naming emotional material can alter emotional processing, while emotion-differentiation research asks how specifically people distinguish their affective states. These literatures are not a license to claim that selecting a word in Commonplace improves mental health.

**Design implication:** provide optional words, allow mixed feelings, and never turn them into a score, graph, streak, or “emotional accuracy” metric.

## 13. Observation and interpretation are separate prompt families

Several prompts distinguish between:

- what a camera could have recorded
- what the user inferred
- what remains unknown
- one alternative explanation

This is a cognitive-flexibility affordance rather than a truth detector. The interface never tells the user that their interpretation is irrational or incorrect.

**Design implication:** make alternative interpretations available without privileging one as the “right” answer.

## 14. Perspective without minimizing experience

A small set of prompts invite users to imagine:

- what they would say to a friend
- what future-self would need to know
- how a caring observer might describe the scene

Self-distancing research has found associations between observer-like reflection and lower reactivity in some experimental and correlational settings. Commonplace treats that as a design inspiration, not a universal rule.

**Design implication:** offer perspective as an optional lens, never as “you are overreacting.”

## 15. Self-kindness without forced positivity

Prompts such as “rewrite this so it stays honest without being needlessly cruel to yourself” borrow the *structure* of self-compassion writing: kindness, perspective, and common humanity.

The wording avoids:

- body evaluation
- appearance reassurance
- “love yourself” demands
- compulsory optimism

The target is balanced language, not a happier answer.

## 16. Values instead of productivity goals

The Reflect drawer can ask what mattered in a situation or which values were in tension. It does not convert those values into goals, reminders, or achievement badges.

**Design implication:** meaning can be explored without becoming another productivity system.

## 17. Tiny-effort prompts reduce initiation cost

Prompts are filterable by rough effort:

- 30 seconds
- about 2 minutes
- deeper
- anything

These are not timers or quotas. They are expectations about cognitive effort, intended to make the first move easier when a blank page feels expensive.

## 18. “Close the page” is a first-class action

Some prompts explicitly permit stopping:

- leave one question unanswered
- decide that there is nothing to solve tonight
- mark the page “finished enough”

This is consistent with the broader Commonplace stance that journaling does not need to culminate in insight, catharsis, positivity, or a lesson.
