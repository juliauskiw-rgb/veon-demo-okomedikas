# Hallmark check

Hallmark 0 FAIL, 1 REFLEX, 1 WARN, 19 waived, 4 notes · render: ran · lang: uk

render tier: 5 screenshots in .hallmark\shots (1280x800, 1440x900, 1920x1080 folds; 1440 and 375 full pages)

| Grade | Gate | Where | Evidence | Fix |
|---|---|---|---|---|
| REFLEX | 79 | http://127.0.0.1:4390/veon-demo-okomedikas/:1 | [1440px] 189px of nothing between the hero's last content (y 711) and the fold | Centre the content in the screen and grow the visual or the head (layout.md § 6); never fill it with copy |
| WARN | 49 | site\src\components\sections\Hero.astro:12 | long clickable label "Подзвонити: {CLINIC.label}" without nowrap | Shorten the label or set nowrap |

RESULT: PASS
