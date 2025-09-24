// questions.js
// Globalny export (bez import/export, bo strona nie używa ES Modules)
(function () {
  // 3 pytania bazowe – zawsze w zestawie
  window.BASE_QUESTIONS = [
    { id: 'base-food',  q: 'Jesteś bardziej…', a: ['Mięsożerca 🥩','Wege 🌱','Flexi 🍳','Fastfood 🍔'] },
    { id: 'base-polit', q: 'Twoje podejście do świata (politycznie/społecznie)…', a: ['Lewo ↔️','Środek ⚖️','Prawo 🏛','Nie wiem / bez znaczenia 🤷'] },
    { id: 'base-date',  q: 'Idealny pierwszy spot:', a: ['Kawa ☕','Spacer 🌳','Kino 🎬','Kolacja 🍝'] },
  ];

  // Pula losowa – 24 szt. (w tym 1 „pikantne”)
  window.RANDOM_POOL = [
    {id:'r-1',  q:'Weekend marzeń:', a:['Góry 🏔','Morze 🌊','Miasto nocą 🌃','Chill w domu 🛋']},
    {id:'r-2',  q:'Poranek czy noc?', a:['Wcześniak ☀️','Nocny marek 🌙','Różnie 🤷','Zależy od pracy 💼']},
    {id:'r-3',  q:'Ulubiona kuchnia:', a:['Włoska 🇮🇹','Azjatycka 🇯🇵','Polska 🇵🇱','Mieszanka świata 🌍']},
    {id:'r-4',  q:'Kawa czy herbata?', a:['Kawa ☕','Herbata 🍵','Yerba 🤠','Woda 💧']},
    {id:'r-5',  q:'Transport w mieście:', a:['Pieszo 🚶‍♀️','Rower 🚴','Auto 🚗','Komunikacja 🚇']},
    {id:'r-6',  q:'Sport a Ty:', a:['Regularnie 💪','Okazjonalnie 🙂','Tylko kibic 🎽','Nie moje 😴']},
    {id:'r-7',  q:'Zwierzaki:', a:['Pies 🐶','Kot 🐱','Mam inne 🐾','Nie teraz 🙅']},
    {id:'r-8',  q:'Praca:', a:['Biuro 🏢','Zdalnie 🏠','Hybryda 🔄','Student 📚']},
    {id:'r-9',  q:'Muzyka w aucie:', a:['Hip-Hop 🎧','Pop 🎤','Rock 🎸','Podcast 🎙']},
    {id:'r-10', q:'Planszówki czy gry wideo?', a:['Planszówki 🎲','Gry wideo 🎮','Obie 💥','Wolę książki 📚']},
    {id:'r-11', q:'Wyjazd last minute?', a:['Jasne ✈️','Zależy 💸','Wolę planować 📅','Home sweet home 🏠']},
    {id:'r-12', q:'Impreza vs. chill:', a:['Klub 🔊','Domówka 🏠','Kolacja 🍷','Netflix 📺']},
    {id:'r-13', q:'Słodycze:', a:['Czekolada 🍫','Lody 🍨','Ciasto 🍰','Nie jem 🙅']},
    {id:'r-14', q:'Języki obce:', a:['Angielski 🇬🇧','Niemiecki 🇩🇪','Hiszpański 🇪🇸','Inne 🌐']},
    {id:'r-15', q:'Podróż idealna:', a:['City break 🏙','Roadtrip 🚗','All inclusive 🏖','Góry i plecak 🎒']},
    {id:'r-16', q:'Czytasz książki?', a:['Regularnie 📚','Czasem 🙂','Rzadko 😅','Audiobooki 🎧']},
    {id:'r-17', q:'Seriale:', a:['Kryminalne 🕵️','Komedia 😂','Fantasy 🐉','Dokumenty 🎬']},
    {id:'r-18', q:'Gotowanie:', a:['Uwielbiam 👨‍🍳','Daję radę 🙂','Wolę zamawiać 📱','Ktoś inny gotuje 😅']},
    {id:'r-19', q:'Relacje ze znajomymi:', a:['Duża paczka 👥','Kilka bliskich 💬','Rodzina ❤️','Samotny wilk 🐺']},
    {id:'r-20', q:'Aktywizm/wolontariat:', a:['Działam aktywnie ✊','Wspieram okazjonalnie 🤝','Interesuję się 📰','Raczej nie teraz ⏳']},
    {id:'r-21', q:'Dzień bez telefonu:', a:['Dam radę ✅','Trudne, ale spróbuję 😅','No way 😬','Tylko na wakacjach 🏝']},
    {id:'r-22', q:'Domowe zwroty akcji:', a:['Planer 📅','Spontan 💥','Pół na pół ⚖️','Zależy od nastroju 🙂']},
    {id:'r-23', q:'Pikantnie: tempo w relacji?', a:['Wolno i uważnie 🔑','Iskry od razu 🔥','Różnie 🤷','Nie mówię publicznie 😏']},
    {id:'r-24', q:'Kontakt z naturą:', a:['Las 🌲','Woda 🌊','Park 🌿','Balkon 🌞']},
  ];

  // Ile losowych pytań dokładamy w kreatorze (obok bazowych)
  window.RANDOM_COUNT = 3;
})();
