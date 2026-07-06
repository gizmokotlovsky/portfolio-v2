KOTLOVSKY PORTFOLIO v18 HOTFIX

Nie jest to nowy layout. To mała paczka naprawcza do v17.

Zawartość:
1. kotlovsky_logo_transparent_v18.png
   - logo kota z usuniętym białym tłem i cropem pod header.
   - wrzuć do assets/ albo images/ i podmień src w headerze.

2. v18-hotfix.css
   - doklej NA KOŃCU obecnego style.css.
   - nie rusza zaakceptowanej transparencji sliderów.
   - naprawia: social icons bez czerwonych ramek, write me bez niebieskiego,
     lekko czytelniejsze black brick, logo display, miniatury YouTube bez cropa.

3. v18-hotfix.js
   - doklej NA KOŃCU obecnego script.js.
   - ustawia stabilne miniatury YouTube i fallback maxres -> hq -> mq.

4. contact-social-block.html
   - podmień nim stary blok social/contact, jeśli nadal masz czerwone placeholdery.

Po wrzuceniu:
- podbij query cache: ?v=18
- sprawdź Pages z branch/root, GitHub Actions failed można ignorować, jeśli strona działa.
- deployment v18: commit message np. "v18 hotfix contact logo video thumbnails"
