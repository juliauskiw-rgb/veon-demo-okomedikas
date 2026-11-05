# Проверка сборки демо — Окомедікас

Дата: 2026-11-05. Сборка: `site/dist`, 493 КБ. Проверки в браузере — на `npm run preview` (порт 4391), Chromium из `~/.veon/tools`.
Сборок на этапе вёрстки было четыре, в цикле правок по finish-review ещё две. Типы (`astro check`) не проверялись: пакет @astrojs/check в базе не установлен.

## npm run build
```
14:17:23 [vite] [32m✓ built in 24ms[39m

 generating static routes 
14:17:23 ▶ src/pages/index.astro
14:17:23   └─ /index.html (+8ms) 
14:17:23 ✓ Completed in 15ms.

14:17:23 [build] 1 page(s) built in 745ms
14:17:23 [build] Complete!

> postbuild
> node scripts/veon-event.mjs demo_build
```

## html_audit.py site/dist
```
WARN    index.html: no canonical link

Pages: 1 | errors: 0
RESULT: PASS
```
Canonical намеренно нет: демо под noindex, основного адреса нет.

## link_check.py site/dist
```
Pages: 1 | broken internal: 0 | external links (not checked): 2
RESULT: PASS
```
Внешние ссылки: карта адреса и Instagram; не проверялись скриптом.

## contrast_check.py
`design/tokens.json` в проекте нет, поэтому скрипту передан временный файл с цветами из `concept.md`.
```
OK    white on wall: 11.15:1 (need 4.5:1)
OK    haze on wall: 9.61:1 (need 4.5:1)
OK    accent on wall: 7.21:1 (need 4.5:1)
OK    text on white: 15.43:1 (need 4.5:1)
OK    text on haze: 13.30:1 (need 4.5:1)
OK    text on accent: 9.98:1 (need 4.5:1)
OK    text on accent-hover: 11.07:1 (need 4.5:1)
OK    wall on white: 11.15:1 (need 4.5:1)
OK    wall on haze: 9.61:1 (need 4.5:1)
OK    line on white: 5.24:1 (need 3.0:1)
OK    line on haze: 4.52:1 (need 3.0:1)
RESULT: PASS
```

## Hallmark (hallmark_check.mjs, полная проверка)
Этап первого экрана (`--stage hero`) запускался на dev-сервере до остальных блоков; ревью первого экрана новым вызовом `ui-designer` не выполнялось.
# Hallmark check

Hallmark 0 FAIL, 0 REFLEX, 0 WARN, 20 waived, 4 notes · render: ran · lang: uk

render tier: 5 screenshots in .hallmark\shots (1280x800, 1440x900, 1920x1080 folds; 1440 and 375 full pages)

| Grade | Gate | Where | Evidence | Fix |
|---|---|---|---|---|
| — | — | — | nothing open | — |

RESULT: PASS

## Поведение на production-сборке
```
PASS menu opens at 320 
PASS A+ 320 raises text 20px -> 24px
PASS A+ pressed state 
PASS A+ 320 nothing past the edge {"sw":320,"W":320,"bad":[]}
PASS A+ remembered after reload 
PASS A returns 
PASS menu closes on anchor 
PASS anchor lands under header 64.234375
PASS call bar on after plate left 
PASS A+ keeps scroll position 208.015625 -> 208.484375
PASS header fits at A+ 
PASS route row opens 
PASS fold 1180x800 {"plateBottom":351,"h1Bottom":544,"telRight":1140,"cls":0}
PASS fold 1280x800 {"plateBottom":357,"h1Bottom":549,"telRight":1240,"cls":0}
PASS fold 1440x900 {"plateBottom":447,"h1Bottom":566,"telRight":1400,"cls":0}
PASS fold 390x844 {"plateBottom":435,"h1Bottom":164,"telRight":271,"cls":0}
PASS fold 375x812 {"plateBottom":431,"h1Bottom":161,"telRight":256,"cls":0}
PASS fold 320x568 {"plateBottom":418,"h1Bottom":150,"telRight":215,"cls":0}
PASS CLS after scroll 390 0
PASS reduced motion {"anim":"none","clip":"none","op":"1","sb":"auto"}
PASS no JS content visible 
{"small":[],"hrefs":["mailto:info@okomedikas.com","https://www.google.com/maps/search/?api=1&query=%D0%BF%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82%20%D0%9F%D0%B5%D1%80%D0%B5%D0%BC%D0%BE%D0%B3%D0%B8%2
```
Строка `fold` — плита и H1 на первом экране без прокрутки, значение `cls` измерено при загрузке.

## CLS по источникам, 5 загрузок (пустой массив — сдвигов нет)
```
1440 []
390 []
1440 []
390 []
1440 []
390 []
```
Измерено на локальном сервере. На медленной сети шрифты придут после первой отрисовки, запасные метрики сдвиг уменьшают, но ноль в таких условиях не проверен.

## Ширина и горизонтальная прокрутка
W — ширина окна, sw — ширина документа, H — высота, over — элементы за краем, small — текст мельче 18 px. Последняя строка — 320 px в режиме «А+».
```
320 {"W":320,"sw":320,"H":9661,"over":[],"small":[]} 
375 {"W":375,"sw":375,"H":8762,"over":[],"small":[]} 
768 {"W":768,"sw":768,"H":9548,"over":[],"small":[]} 
1024 {"W":1024,"sw":1024,"H":9626,"over":[],"small":[]} 
1440 {"W":1440,"sw":1440,"H":8433,"over":[],"small":[]} 
320 {"W":320,"sw":320,"H":10944,"over":[],"small":[]}
```
