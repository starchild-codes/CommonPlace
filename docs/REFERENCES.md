# Design references

Commonplace uses psychology and HCI as constraints on interaction design, not as marketing claims. It does not claim that using the product improves mental health, memory, or wellbeing.

## Cognitive load

Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. *Cognitive Science, 12*(2), 257–285. https://doi.org/10.1207/s15516709cog1202_4

**Design implication used here:** do not present the full editor vocabulary at once. Tools are grouped by stable task (“Write”, “Decorate”, “Paper”, “Photos”), and element-specific controls appear only after selection.

## External and distributed cognition

Hutchins, E. (1995). *Cognition in the Wild*. MIT Press.

Kirsh, D. (2010). Thinking with external representations. *AI & Society, 25*, 441–454. https://doi.org/10.1007/s00146-010-0272-8

**Design implication used here:** position, overlap, grouping, rotation, visual salience, and physical-seeming scraps are treated as part of the representation rather than as decoration around a text document.

## Autonomy and intrinsic motivation

Ryan, R. M., & Deci, E. L. (2000). Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being. *American Psychologist, 55*(1), 68–78. https://doi.org/10.1037/0003-066X.55.1.68

**Design implication used here:** Commonplace avoids mandatory goals, streaks, and completion meters. This is a product stance favoring autonomy; it is not a claim that streaks are universally harmful.

## Recognition and visible affordances

Norman, D. A. (2013). *The Design of Everyday Things: Revised and Expanded Edition*. Basic Books.

**Design implication used here:** materials are visually previewed; important actions use persistent labels; manipulation happens directly on the page; destructive actions are separated from routine styling.

## Caveat

These references motivate broad design principles. They do not validate every individual UI choice in Commonplace, and the current repository does not include a user study. A future usability study should test whether the intended low-pressure, low-friction interaction actually produces the experience described in the design documents.

## Affect labeling and emotion differentiation

Lieberman, M. D., Eisenberger, N. I., Crockett, M. J., Tom, S. M., Pfeifer, J. H., & Way, B. M. (2007). Putting feelings into words: Affect labeling disrupts amygdala activity in response to affective stimuli. *Psychological Science, 18*(5), 421–428. https://doi.org/10.1111/j.1467-9280.2007.01916.x

**Design implication used here:** Commonplace offers optional emotion vocabulary rather than a numeric mood score. The app does not claim that choosing an emotion word reproduces the experimental effect in this paper.

Van der Gucht, K., Dejonckheere, E., Erbas, Y., Takano, K., Vandemoortele, M., Maex, E., Raes, F., & Kuppens, P. (2019). An experience sampling study examining the potential impact of a mindfulness-based intervention on emotion differentiation. *Emotion, 19*(1), 123–131. [Emotion-differentiation literature is broader and method-dependent; Commonplace does not treat specificity as an “accuracy” score.]

## Self-distancing and perspective

Ayduk, Ö., & Kross, E. (2010). From a distance: Implications of spontaneous self-distancing for adaptive self-reflection. *Journal of Personality and Social Psychology, 98*(5), 809–829. https://doi.org/10.1037/a0019205

**Design implication used here:** a few prompts offer a future-self, friend, or observer perspective as an optional way to construe an event. The UI does not imply that distance is always better or that emotional closeness is a problem.

## Self-compassionate writing

Johnson, E. A., & O'Brien, K. A. (2013). Self-compassion soothes the savage ego-threat system: Effects on negative affect, shame, rumination, and depressive symptoms. *Journal of Social and Clinical Psychology, 32*(9), 939–963.

A number of later trials have adapted compassionate letter-writing around kindness, common humanity, and broader perspective. Commonplace borrows those *prompt shapes* conservatively: it does not reproduce a clinical protocol and does not make treatment claims.

## Expressive-writing evidence is mixed

Mogk, C., Otte, S., Reinhold-Hurley, B., & Kröner-Herwig, B. (2009). Health effects of expressive writing on stressful or traumatic experiences — a meta-analysis. *GMS Psycho-Social-Medicine, 6*, Doc06.

The review included randomized controlled trials and reported no significant average effects on the main psychological or somatic health outcomes.

**Design implication used here:** Commonplace never says “journal for your mental health,” never instructs users to disclose trauma, and never makes deep emotional writing the default. Users can write about a ticket stub, weather, a joke, a book, or nothing at all.

## Evidence boundary for v0.2

The Reflect drawer is best understood as **psychology-informed interaction design**, not evidence that Commonplace itself changes wellbeing. The repository has no clinical trial or efficacy study. A future evaluation should focus first on usability, perceived pressure, autonomy, and whether users understand that prompts are optional.
