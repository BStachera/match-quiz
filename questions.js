// questions.js
// Globalny export (bez import/export, bo strona nie używa ES Modules)
(function () {
  const freezeQuestion = (q) => Object.freeze({
    id: q.id,
    q: q.q,
    a: Object.freeze(q.a.slice())
  });

  // Pytania bazowe – zawsze w zestawie
  const BASE = [
    { id: 'base-food', q: 'Jesteś bardziej…', a: ['Mięsożerca 🥩', 'Wege 🌱', 'Flexi 🍳', 'Fastfood 🍔'] },
    { id: 'base-vibe', q: 'Twój vibe na co dzień to…', a: ['Ekstrawertyk z planem 🎉', 'Spokojny obserwator 👀', 'Mieszanka zależnie od dnia 🌦', 'Zobaczymy razem 🤝'] },
    { id: 'base-date', q: 'Pierwsze wspólne spotkanie wolisz…', a: ['Kawę i rozmowę ☕', 'Spacer z odkrywaniem miasta 🌳', 'Coś kreatywnego (np. warsztaty) 🎨', 'Kolację z klimatem 🍝'] },
    { id: 'base-communicate', q: 'Jak najchętniej utrzymujesz kontakt?', a: ['Szybkie wiadomości w ciągu dnia 💬', 'Długie rozmowy telefoniczne 📞', 'Spotkania na żywo jak najczęściej ☕', 'Memy + głosówki, gdy mamy czas 🎧'] },
    { id: 'base-weekend', q: 'Idealny wspólny weekend to…', a: ['City break i odkrywanie miasta 🏙', 'Wypad w naturę 🌲', 'Domowy chill i seriale 📺', 'Mieszanka spontanu i planu 🎲'] },
    { id: 'base-values', q: 'W relacji najbardziej liczy się dla Ciebie…', a: ['Chemia i śmiech 😂', 'Wspólne cele i rozwój 🚀', 'Spokój i wsparcie 🤗', 'Przygody i spontany ✈️'] }
  ].map(freezeQuestion);

  // Pula losowa – pytania o styl życia, relacje i poznawanie się
  const RANDOM = [
    { id: 'r-1', q: 'Wakacje planujemy…', a: ['Z dokładnym planem 🗺', 'Lekko szkicując ✏️', 'Totalnie spontanicznie 🎲', 'Zależnie od okazji 📆'] },
    { id: 'r-2', q: 'Poranki razem to raczej…', a: ['Śniadanie w łóżku 🛌', 'Wspólny trening 🏃', 'Kawa i rozmowa ☕', 'Każdy ma swój rytm 🙃'] },
    { id: 'r-3', q: 'Gdy pojawia się konflikt…', a: ['Siadam i gadam od razu 💬', 'Potrzebuję chwili ciszy 🧘', 'Piszę, żeby się nie pogubić 📱', 'Rozładowuję humorem 😂'] },
    { id: 'r-4', q: 'Wspólne gotowanie to dla mnie…', a: ['Ulubiony rytuał i eksperymenty 🍳', 'Proste dania i pogaduchy 🥗', 'Zamawiamy i jest chill 📦', 'Raz Ty, raz ja 🔄'] },
    { id: 'r-5', q: 'Wieczór w weekend najchętniej…', a: ['Koncert lub wydarzenie 🎟', 'Planszówki z ekipą 🎲', 'Domowe kino 🎬', 'Spontaniczny wypad za miasto 🚗'] },
    { id: 'r-6', q: 'Jak często piszemy?', a: ['Codziennie po trochu 💬', 'Co kilka dni 👍', 'Głównie na żywo 🤝', 'Elastycznie jak czujemy ⏱'] },
    { id: 'r-7', q: 'Poznawanie nowych miejsc…', a: ['Plan i lista must-see 🗺', 'Idziemy przed siebie 🧭', 'Smaki lokalne 🍽', 'Ludzie i rozmowy 🗣'] },
    { id: 'r-8', q: 'Prezent idealny od drugiej osoby?', a: ['Wspólne przeżycie 🎁', 'Coś praktycznego 🔧', 'List lub coś własnoręcznego ✍️', 'Totalna niespodzianka 🎉'] },
    { id: 'r-9', q: 'Aktywność fizyczna we dwoje?', a: ['Tak, regularnie 💪', 'Czasem rekreacyjnie 🙂', 'Kibicujemy z kanapy 🛋', 'Każdy w swoim tempie 🧭'] },
    { id: 'r-10', q: 'Wieczorne rozmowy najczęściej o…', a: ['Marzeniach i planach 🌠', 'Codzienności i emocjach 🗓', 'Ciekawostkach świata 🌍', 'Wszystkim po trochu 💬'] },
    { id: 'r-11', q: 'Jak świętujesz sukcesy?', a: ['Duże wyjście 🍾', 'Kameralnie z bliskimi 🕯', 'Prezencik dla siebie 🎁', 'Nowy cel od razu 🎯'] },
    { id: 'r-12', q: 'Relacja z rodziną partnera?', a: ['Chętnie poznaję 👋', 'Spokojnie, krok po kroku 🚶', 'Z dystansem, prywatność 🧱', 'Zobaczymy jak wyjdzie 🤷'] },
    { id: 'r-13', q: 'Wspólne mieszkanie?', a: ['Szybko, jeśli czuję chemię 🏠', 'Po czasie testowym 🗓', 'Zależnie od sytuacji 🔄', 'Lubię mieć swoją przestrzeń 🧘'] },
    { id: 'r-14', q: 'Finanse w związku…', a: ['Wspólny budżet 📊', 'Podział na kategorie ⚖️', 'Luźno, bez tabelek 🌀', 'Każdy osobno 💼'] },
    { id: 'r-15', q: 'Co Cię najbardziej inspiruje?', a: ['Ludzie z pasją 🔥', 'Sztuka i kultura 🎨', 'Podróże i światy ✈️', 'Technologie i nowinki 🤖'] },
    { id: 'r-16', q: 'Jak okazujesz czułość?', a: ['Dotyk i gesty 🤗', 'Słowa i wiadomości 💌', 'Drobne niespodzianki 🎁', 'Wspólny czas ⏳'] },
    { id: 'r-17', q: 'Twoje tempo życia to…', a: ['Zawsze w biegu ⚡', 'Zbalansowane ⚖️', 'Slow life 🌿', 'Fale energii 🌊'] },
    { id: 'r-18', q: 'Styl podróżowania?', a: ['Plecak i hostel 🎒', 'Komfortowy hotel 🏨', 'Van / camper 🚐', 'Staycation w mieście 🏙'] },
    { id: 'r-19', q: 'Najlepiej pracuję…', a: ['Wcześnie rano 🌅', 'Po południu 🌞', 'W nocy 🌙', 'Elastycznie 🔁'] },
    { id: 'r-20', q: 'Najchętniej uczysz się…', a: ['Przez praktykę 🛠', 'Czytając 📚', 'Słuchając ludzi 🎧', 'Testując i psując 🔧'] },
    { id: 'r-21', q: 'Niespodzianki w związku?', a: ['Uwielbiam i chcę więcej 🎉', 'Najpierw pytam o plan 🤔', 'Wolę wiedzieć wcześniej 👀', 'Zależy od dnia 🌦'] },
    { id: 'r-22', q: 'Wieczór tylko we dwoje?', a: ['Kolacja na mieście 🍽', 'Spacer i lody 🍦', 'Serial / gra w domu 🎬', 'Wspólna aktywność (np. taniec) 💃'] },
    { id: 'r-23', q: 'Spontaniczność w relacji…', a: ['To sól relacji 🧂', 'Lubię miks z planem ⚖️', 'Kilka niespodzianek w roku 🎁', 'Wolę przewidywalność 📅'] },
    { id: 'r-24', q: 'Gdy partner ma gorszy dzień…', a: ['Przytulam i słucham 🤗', 'Zabieram na wyjście 🚶', 'Daję przestrzeń 🫧', 'Wysyłam miłe wiadomości 💬'] },
    { id: 'r-25', q: 'Najciekawsze tematy rozmów?', a: ['Psychologia i emocje 🧠', 'Kultura i sztuka 🎭', 'Biznes i pomysły 💡', 'Życie codzienne i memy 😄'] },
    { id: 'r-26', q: 'Poranki w weekend?', a: ['Długi sen 😴', 'Aktywnie od rana 🏃', 'Śniadanie na mieście 🥐', 'Czytanie w łóżku 📖'] },
    { id: 'r-27', q: 'Idealny prezent dla Ciebie?', a: ['Czas tylko dla nas ⏰', 'Coś zrobionego ręcznie 🧵', 'Bilet na wydarzenie 🎫', 'Coś z listy marzeń ✅'] },
    { id: 'r-28', q: 'Dbasz o zdrowie…', a: ['Plan treningowy 📅', 'Balans i intuicja ⚖️', 'Małe kroki bez presji 🐢', 'Jeszcze szukam motywacji 🔍'] },
    { id: 'r-29', q: 'Gdzie czujesz się najlepiej?', a: ['Wśród ludzi 🎈', 'W kameralnej grupie 🪟', 'Z jedną bliską osobą ❤️', 'Sam/a dla resetu 🌌'] },
    { id: 'r-30', q: 'Domowe obowiązki dzielimy…', a: ['Lista i rotacja 📋', 'Każdy robi co lubi 💡', 'Razem przy muzyce 🎶', 'Zewnętrzna pomoc / zamawiamy 📦'] },
    { id: 'r-31', q: 'Randka po pracy?', a: ['Szybki spacer po mieście 🌆', 'Kolacja i rozmowa 🍝', 'Aktywność (np. ścianka) 🧗', 'Chill u kogoś w domu 🛋'] },
    { id: 'r-32', q: 'Twój styl komunikacji?', a: ['Prosto z mostu 🎯', 'Delikatnie i empatycznie 💗', 'Z humorem 😄', 'Zależnie od osoby 🔄'] },
    { id: 'r-33', q: 'Jak często podróżujemy razem?', a: ['Mały wypad co miesiąc 🚆', 'Kilka razy w roku ✈️', 'Raz w roku wystarczy 🌍', 'Gdy czas pozwoli ⏳'] },
    { id: 'r-34', q: 'Rocznice najlepiej świętować…', a: ['Romantyczna kolacja 🍷', 'Nowa przygoda 🚁', 'Chill i wspomnienia 📸', 'Niespodzianka dla partnera 🎁'] },
    { id: 'r-35', q: 'Gdy plany się zmieniają…', a: ['Luz, jedziemy dalej 😌', 'Potrzebuję chwili na nowe ustalenia ⏱', 'Szukam alternatywy od razu 🔄', 'Wolę trzymać się planu 📅'] },
    { id: 'r-36', q: 'Co Cię najbardziej relaksuje?', a: ['Sport lub ruch 🧘', 'Kreatywne zajęcia 🎨', 'Seriale i gry 🎮', 'Cisza i książka 📚'] },
    { id: 'r-37', q: 'Jak dzielisz się planami na przyszłość?', a: ['Od razu mówię wszystko 🗣', 'Powoli, gdy czuję się bezpiecznie 🌱', 'Pokazuję czynami 💪', 'Najpierw układam je w głowie 🤫'] },
    { id: 'r-38', q: 'Tempo relacji najbardziej lubię…', a: ['Powoli i stabilnie 🐢', 'Naturalnie, bez presji 🌿', 'Szybko, gdy jest chemia ⚡', 'Zależnie od drugiej osoby 🔁'] },
    { id: 'r-39', q: 'Randka tematyczna – co wybierasz?', a: ['Warsztaty kulinarne 🍲', 'Escape room 🔐', 'Koncert / stand-up 🎤', 'Wspólny wolontariat 🤝'] },
    { id: 'r-40', q: 'Czułe wiadomości w ciągu dnia…', a: ['Uwielbiam i odpisuję od razu 💌', 'Czytam i wracam gdy mogę ⏳', 'Wolę zobaczyć się wieczorem 🌙', 'Odpowiadam memem 😂'] }
  ].map(freezeQuestion);

  window.BASE_QUESTIONS = Object.freeze(BASE);
  window.RANDOM_POOL = Object.freeze(RANDOM);
  window.RANDOM_COUNT = 6;
})();
