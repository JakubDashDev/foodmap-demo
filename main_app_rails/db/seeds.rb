# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

ReviewNote.delete_all
Review.delete_all
Location.delete_all
ContentCreator.delete_all

LOCATIONS = [
  { name: "Sklep Karolinka", address: "ul. Kościuszki 25, 66-436 Lemierzyce, Polska",
    cuisine_type: "Sklep spożywczy / Delikatesy",
    description: "Lokalny, niezwykle popularny w internecie sklep spożywczy oferujący świeżą " \
                  "garmażerkę, domowe wypieki oraz regionalne wędliny i sery.",
    latitude: 52.5936, longitude: 14.8863 },
  { name: "Kuchnia Polska pod Kogutem (Jarmark Świętego Dominika)", address: "Targ Węglowy, 80-836 Gdańsk, Polska",
    cuisine_type: "Kuchnia polska",
    description: "Budka na jarmarku serwująca tradycyjne, polskie potrawy na gorąco, takie jak " \
                  "karkówka z grilla i bigos.",
    latitude: 54.3508, longitude: 18.6479 },
  { name: "Focaccia Pistachio Mortadella (Jarmark Świętego Dominika)", address: "Targ Węglowy, 80-836 Gdańsk, Polska",
    cuisine_type: "Włoska",
    description: "Stoisko na jarmarku serwujące bogato zdobioną focaccię z kremem pistacjowym, " \
                  "włoską mortadelą i serem burrata.",
    latitude: 54.3508, longitude: 18.6479 },
  { name: "Ruchanki z fiutem (Jarmark Świętego Dominika)", address: "Targ Węglowy, 80-836 Gdańsk, Polska",
    cuisine_type: "Desery regionalne",
    description: "Budka oferująca tradycyjne kaszubskie placki (ruchanki) smażone w głębokim " \
                  "tłuszczu i obficie polewane syropem z buraka cukrowego (zwanym fiutem).",
    latitude: 54.3508, longitude: 18.6479 },
  { name: "Stołówka Gdańska", address: "ul. Długie Ogrody 27, 80-754 Gdańsk, Polska",
    cuisine_type: "Bar mleczny / Kuchnia polska",
    description: "Klasyczny polski bar mleczny serwujący obfite, tradycyjne domowe obiady w " \
                  "niezwykle przystępnych cenach.",
    latitude: 54.3496, longitude: 18.6651 },
  { name: "Macho Kebab", address: "ul. Żmigrodzka 6, 51-118 Wrocław, Polska",
    cuisine_type: "Kebab",
    description: "Popularny wśród uczniów i studentów lokal z tanim kebabem, znany ze specjalnych " \
                  "zniżek na legitymację.",
    latitude: 51.1340, longitude: 17.0270 },
  { name: "Cheesy Kebab", address: "Parking Selgros, ul. Krakowska 71, 50-426 Wrocław, Polska",
    cuisine_type: "Kebab",
    description: "Food truck influencera Tomka Olejnika. Menu opiera się na pozycjach zasypanych " \
                  "górą ciągnącego się sera, sosem serowym i frytkami.",
    latitude: 51.0850, longitude: 17.0670 },
  { name: "Plackarnia", address: "al. Armii Krajowej 2A/1, 50-541 Wrocław, Polska",
    cuisine_type: "Kuchnia polska",
    description: "Niewielki, wieloletni punkt gastronomiczny prowadzony rodzinnie, " \
                  "specjalizujący się w jednym daniu: świeżych plackach ziemniaczanych prosto z patelni.",
    latitude: 51.0820, longitude: 17.0390 },
  { name: "Książulu Kebab (Amal Kebab)", address: "ul. Romualda Millera 16A, 01-496 Warszawa, Polska",
    cuisine_type: "Kebab",
    description: "Najniżej oceniana kebabownia w Warszawie, która w kontrowersyjnych " \
                  "okolicznościach zmieniła szyld na łudząco przypominający ksywkę youtubera.",
    latitude: 52.2590, longitude: 20.9170 },
  { name: "Grecki Fast Food (polecany przez lokalnego przewodnika Alexa)", address: "Ateny, Grecja",
    cuisine_type: "Grecka / Fast Food",
    description: "Lokalny street-foodowy punkt w sercu Aten, polecany przez miejscowych, serwujący " \
                  "tradycyjne, greckie jedzenie na szybko.",
    latitude: 37.9838, longitude: 23.7275 },
  { name: "Restauracja z polecenia widza (nazwa nieujawniona wprost)", address: "Polska",
    cuisine_type: "Kuchnia polska / Restauracyjna",
    description: "Lokal polecony przez jednego z widzów kanału, w którym Wojek sprawdzał jakość " \
                  "serwowanych dań.",
    latitude: 52.0693, longitude: 19.4803 },
  { name: "Kanapka z Ośmiornicą i Pizzeria (Lokale z przewodnikiem)", address: "Bari, Apulia, Włochy",
    cuisine_type: "Włoska / Owoce Morza",
    description: "Legendarne kanapki z ośmiornicą oraz rzemieślnicza włoska pizza testowane podczas " \
                  "wycieczki kulinarnymi uliczkami Bari pod okiem lokalnej przewodniczki.",
    latitude: 41.1171, longitude: 16.8719 },
  { name: "Bar u Stacha", address: "Nowy Kiełbów 19, 26-804 Stary Gózd, Polska",
    cuisine_type: "Kuchnia polska / Bar przydrożny",
    description: "Kultowy, całodobowy bar przy trasie S7, który od 1995 roku serwuje tanie, obfite, " \
                  "tradycyjne, polskie obiady domowe dla kierowców i podróżnych.",
    latitude: 51.5833, longitude: 20.9667 },
].freeze

LOCATIONS.each do |attributes|
  Location.find_or_create_by!(name: attributes[:name], address: attributes[:address]) do |location|
    location.assign_attributes(attributes)
  end
end

CONTENT_CREATORS = [
  { name: "Książulo", channel_url: "https://youtube.com/@ksiazulo",
    avatar_url: "https://unavatar.io/youtube/ksiazulo",
    description: "Uczciwe, bezkompromisowe recenzje jedzenia z całej Polski – od jarmarków po budki z kebabem." },
  { name: "Wojek", channel_url: "https://www.youtube.com/@BIGWOJEK",
    avatar_url: "https://unavatar.io/youtube/BIGWOJEK",
    description: "Kulinarne podróże po Polsce i świecie – od barów przydrożnych po greckie i " \
                  "włoskie uliczne jedzenie." },
].freeze

CONTENT_CREATORS.each do |attributes|
  ContentCreator.find_or_create_by!(name: attributes[:name]) do |content_creator|
    content_creator.assign_attributes(attributes)
  end
end

REVIEWS = [
  { location: "Sklep Karolinka", content_creator: "Książulo", rating: "worth_a_special_trip",
    source_type: "youtube", source_url: "http://www.youtube.com/watch?v=AfLUwMCCBGU",
    description: "Twórca był całkowicie zachwycony asortymentem i smakiem produktów. Szczególnie " \
                  "polecał unikalny chrzan z miodem, wybitne swojskie wędliny oraz wiralowe, " \
                  "puszyste pączki i rogaliki nafaszerowane świeżymi owocami.",
    published_at: "2026-08-09" },
  { location: "Kuchnia Polska pod Kogutem (Jarmark Świętego Dominika)", content_creator: "Książulo", rating: "avoid",
    source_type: "youtube", source_url: "http://www.youtube.com/watch?v=52y3FntRtB0",
    description: "Twórca ocenił stoisko jako ekstremalnie drogie i fatalne jakościowo (określił to " \
                  "mianem 'skamu'). Karkówka kosztowała aż 70 zł, a bigos był rozwodnioną, bardzo " \
                  "kwaśną kapustą bez odrobiny mięsa. Mocno odradza to miejsce.",
    published_at: "2026-08-05" },
  { location: "Focaccia Pistachio Mortadella (Jarmark Świętego Dominika)", content_creator: "Książulo",
    rating: "worth_if_nearby", source_type: "youtube", source_url: "http://www.youtube.com/watch?v=52y3FntRtB0",
    description: "Zdecydowanie jedno z najsmaczniejszych dań na jarmarku. Focaccia była wypełniona " \
                  "luksusowymi składnikami, jednak twórca zauważył, że całość bywa niesamowicie " \
                  "ciężka i przesadnie tłusta do zjedzenia. Wytykał też zaporową cenę (59 zł).",
    published_at: "2026-08-05" },
  { location: "Ruchanki z fiutem (Jarmark Świętego Dominika)", content_creator: "Książulo", rating: "worth_a_detour",
    source_type: "youtube", source_url: "http://www.youtube.com/watch?v=52y3FntRtB0",
    description: "Absolutny, pozytywny faworyt twórcy na całym jarmarku. Gorące, wybitnie chrupiące " \
                  "z zewnątrz i puszyste w środku placki w połączeniu z gęstym syropem buraczanym " \
                  "skradły jego serce.",
    published_at: "2026-08-05" },
  { location: "Stołówka Gdańska", content_creator: "Książulo", rating: "worth_a_special_trip",
    source_type: "youtube", source_url: "http://www.youtube.com/watch?v=rBhvGkLCux0",
    description: "Lokal jako pierwszy w historii kanału otrzymał wyróżnienie 'Podwójne Muala'. " \
                  "Twórca rozpływał się nad fenomenalnym kotletem schabowym w panko, idealnie " \
                  "kwaśną zupą szczawiową i niezwykle puszystymi naleśnikami napakowanymi farszem.",
    published_at: "2026-08-02" },
  { location: "Macho Kebab", content_creator: "Książulo", rating: "avoid",
    source_type: "youtube", source_url: "http://www.youtube.com/watch?v=iDjvIs3IGTc",
    description: "Test udowodnił bezczelną faworyzację – twórca z kamerą otrzymał porcję niemal " \
                  "dwukrotnie większą (i bogatszą) od ukrytego klienta. Samo mięso to sucha, tania " \
                  "mielonka w gumowej tortilli o bardzo słabym smaku.",
    published_at: "2026-05-24" },
  { location: "Cheesy Kebab", content_creator: "Książulo", rating: "avoid",
    source_type: "youtube", source_url: "http://www.youtube.com/watch?v=iDjvIs3IGTc",
    description: "Lokal miał wielkie problemy z organizacją. Wołowina okazała się suchą, twardą, " \
                  "fatalnie pokrojoną kostką przypominającą mrożonki. Wersja z kurczakiem była " \
                  "obiecująca na papierze, ale w praktyce tonęła w ekstremalnej, przytłaczającej " \
                  "ilości mdłego tłuszczu i sera.",
    published_at: "2026-05-24" },
  { location: "Plackarnia", content_creator: "Książulo", rating: "worth_a_special_trip",
    source_type: "youtube", source_url: "http://www.youtube.com/watch?v=iDjvIs3IGTc",
    description: "Zasłużone 'Muala'. Twórca określił je mianem jednych z najlepszych, o ile nie " \
                  "najlepszych placków na mieście. Był pod ogromnym wrażeniem perfekcyjnej " \
                  "chrupkości i idealnego wysmażenia placków, w jego ulubionej konfiguracji (ze " \
                  "śmietaną i cukrem). Bardzo docenił niskie ceny i 30-letnie doświadczenie kucharza.",
    published_at: "2026-05-24" },
  { location: "Książulu Kebab (Amal Kebab)", content_creator: "Książulo", rating: "avoid",
    source_type: "youtube", source_url: "http://www.youtube.com/watch?v=ejAl9llsDlY",
    description: "Abstrahując od niesmacznej otoczki z naśladowaniem nazwy, mięso okazało się " \
                  "tragiczne. Twórca twierdzi, że baranina to wyschnięta 'kula plastiku/pasztetu' o " \
                  "obrzydliwym zapachu, a kurczak był niezwykle tłusty i bardzo słony. Stanowczo " \
                  "radzi unikać tego lokalu.",
    published_at: "2024-08-21" },
  { location: "Grecki Fast Food (polecany przez lokalnego przewodnika Alexa)", content_creator: "Wojek",
    rating: "worth_a_detour", source_type: "youtube", source_url: "https://www.youtube.com/watch?v=k0V-zXznQgw",
    description: "Wojek ocenił to miejsce jako absolutną, lokalną 'perełkę'. Jedzenie, atmosfera oraz " \
                  "sam przewodnik Alex sprawili, że nazwał to najlepszym greckim fast foodem.",
    published_at: "2026-05-28" },
  { location: "Restauracja z polecenia widza (nazwa nieujawniona wprost)", content_creator: "Wojek",
    rating: "avoid", source_type: "youtube", source_url: "https://www.youtube.com/watch?v=Xz_n0he-BMA",
    description: "Tytułowy 'Totalny Zawód'. Wojek pojechał w to miejsce po licznych rekomendacjach, " \
                  "jednak na miejscu spotkał się z ogromnym rozczarowaniem, słabą jakością i wyraźnie " \
                  "odradza wizytę.",
    published_at: "2026-05-23" },
  { location: "Kanapka z Ośmiornicą i Pizzeria (Lokale z przewodnikiem)", content_creator: "Wojek",
    rating: "worth_a_special_trip", source_type: "youtube", source_url: "https://www.youtube.com/watch?v=W4YNZZuR0yI",
    description: "Wojek okrzyknął tę podróż kulinarną mianem 'Wielkiej Włoskiej Uczty'. Kanapki z " \
                  "ośmiornicą nazwał legendarnymi, a same Włochy przedstawił jako fenomenalny kierunek " \
                  "na tego typu jedzenie.",
    published_at: "2026-06-03" },
  { location: "Bar u Stacha", content_creator: "Wojek", rating: "worth_a_detour",
    source_type: "youtube", source_url: "https://www.youtube.com/watch?v=2Esho1GAdok",
    description: "Wojek był pozytywnie zaskoczony ogromnymi porcjami i niskimi cenami zważywszy na " \
                  "obecne czasy. Bardzo polecał świeże zupy, miękkie żeberka i kotleta schabowego. " \
                  "Mocno zrekomendował to miejsce dla każdego podróżującego wzdłuż S7.",
    published_at: "2026-05-04" },
].freeze

REVIEWS.each do |attributes|
  location = Location.find_by!(name: attributes[:location])
  content_creator = ContentCreator.find_by!(name: attributes[:content_creator])

  Review.find_or_create_by!(source_url: attributes[:source_url], location: location) do |review|
    review.location = location
    review.content_creator = content_creator
    review.rating = attributes[:rating]
    review.source_type = attributes[:source_type]
    review.description = attributes[:description]
    review.published_at = attributes[:published_at]
  end
end
