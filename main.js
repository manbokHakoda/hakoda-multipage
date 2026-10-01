const __noopClassList = {
  add(){}, remove(){}, toggle(){ return false; }, contains(){ return false; }
};
const __noopElement = new Proxy({
  value:"",
  textContent:"",
  innerHTML:"",
  classList:__noopClassList
},{
  get(target, prop){
    if(prop in target) return target[prop];
    if(prop === "style") return {};
    if(prop === "querySelectorAll") return ()=>[];
    if(prop === "querySelector") return ()=>__noopElement;
    if(prop === "matches") return ()=>false;
    return ()=>{};
  },
  set(target, prop, value){
    target[prop] = value;
    return true;
  }
});

const $ = (selector, root=document) =>
  root.querySelector(selector) || __noopElement;

const $$ = (selector, root=document) =>
  [...root.querySelectorAll(selector)];



/* =========================================================
   BASIC HELPERS
========================================================= */




/* =========================================================
   THEME
========================================================= */

const savedTheme =
  localStorage.getItem("hakoda-theme") || "dark";

function setTheme(theme){

  document.documentElement.classList.toggle(
    "light",
    theme === "light"
  );

  localStorage.setItem(
    "hakoda-theme",
    theme
  );

  $("#themeButton").textContent =
    theme === "light" ? "☀" : "☾";
}

setTheme(savedTheme);

$("#themeButton").addEventListener(
  "click",
  ()=>{

    const light =
      document.documentElement.classList.contains("light");

    setTheme(
      light ? "dark" : "light"
    );

  }
);


/* =========================================================
   MOBILE MENU
========================================================= */

$("#menuButton").addEventListener(
  "click",
  ()=>{
    $("#navLinks").classList.toggle("open");
  }
);

$$(".nav-links a").forEach(
  link=>{

    link.addEventListener(
      "click",
      ()=>{
        $("#navLinks").classList.remove("open");
      }
    );

  }
);


/* =========================================================
   LANGUAGE SYSTEM
========================================================= */

const languageData = {

mn:{
hero:
"Хакода гэр бүлийн түүх → Монголын 13-р зуун → Япон–Монголын түүх → 日蒙家庭 → Pure Water → ирээдүй.",

rootsTitle:
"Хакода гэр бүлийн түүх",

rootsText:
"Нэг хүний намтар бус, үе үеэр дамжсан дурсамж, гэр бүлийн түүх, Япон ба Монголын хоёр талын уулзвар."
},

ja:{
hero:
"箱田家の歴史 → モンゴル13世紀 → 日本とモンゴルの歴史 → 日蒙家庭 → Pure Water → 未来。",

rootsTitle:
"箱田家の歴史",

rootsText:
"一人の人物だけではなく、世代を越えて受け継がれる家族の記憶と、日本・モンゴルの二つの背景をたどります。"
},

en:{
hero:
"The Hakoda family story → 13th-century Mongolia → Japan–Mongolia history → Japan–Mongolia family → Pure Water → Future.",

rootsTitle:
"The Hakoda Family Story",

rootsText:
"More than a biography: a journey through family memory, generations, and the meeting point of Japan and Mongolia."
}

};

function setLanguage(lang){

  localStorage.setItem(
    "hakoda-language",
    lang
  );

  $("#languageSelect").value=lang;

  $("#heroText").textContent =
    languageData[lang].hero;

  $("#rootsTitle").textContent =
    languageData[lang].rootsTitle;

  $("#rootsText").textContent =
    languageData[lang].rootsText;

  renderEssay(lang);
}

$("#languageSelect").addEventListener(
  "change",
  e=>setLanguage(e.target.value)
);


/* =========================================================
   FAMILY TREE
========================================================= */

const people={

rokusuke:{
title:"箱田六輔",
text:
"1850–1888. Фүкүока болон Мэйжийн үеийн 自由民権運動-ийн хүрээнд дурдагддаг түүхэн хүн. 向陽社 болон 玄洋社-ийн түүхтэй холбоотой."
},

tatsuma:{
title:"箱田辰馬",
text:
"Хакода гэр бүлийн дараагийн үеийн холбоос болгон тэмдэглэгддэг нэр."
},

gensuke:{
title:"箱田源輔",
text:
"Хакода гэр бүлийн угсааны дараагийн үе."
},

yousuke:{
title:"箱田洋輔",
text:
"Хакода гэр бүлийн дараагийн үеийн хүн."
},

ryousuke:{
title:"箱田良輔 / Hakoda Ryousuke",
text:
"Манбокийн эцэг. Япон талын гэр бүлийн түүхийг 日蒙家庭-тэй холбох чухал үе."
},

mother:{
title:"箱田ウーレンソロンゴ / Hakoda Uulensolongo",
text:
"Манбокийн ээж Монгол хүн. Монгол хэл, соёлын тал нь 日蒙家庭-ийн нөгөө үндэс."
},

manbok:{
title:"箱田満福 / Hakoda Manbok",
text:
"2005 онд төрсөн. Япон–Монгол гэр бүлийн хоёр талын түүхийг холбож, digital history project хэлбэрээр хадгалж буй шинэ үе."
}

};

$$(".person").forEach(
  person=>{

    person.addEventListener(
      "click",
      ()=>{

        const data =
          people[person.dataset.person];

        $$(".person").forEach(
          p=>p.classList.remove("selected")
        );

        person.classList.add("selected");

        $("#treeInfo").innerHTML=`

          <strong>
            ${data.title}
          </strong>

          <p class="muted">
            ${data.text}
          </p>

        `;

      }
    );

  }
);


/* =========================================================
   MONGOLIA MAP
========================================================= */

const mapData={

core:{
title:"Монголын төв",
description:
"1206 онд Тэмүжин Чингис хаан болж, Их Монгол улсын түүхэн суурь тавигдсан төв бүс.",
fact:"1206 — Чингис хаан ба Их Монгол улс."
},

west:{
title:"Баруун бүс",
description:
"Монголын эзэнт гүрний баруун тийш тэлэлт нь Төв Ази, Иран болон цааш Европын түүхтэй холбогдов.",
fact:"Евразийн баруун чиглэлийн түүхэн холболт."
},

central:{
title:"Төв Ази",
description:
"Төв Азийн замууд нь худалдаа, дипломат харилцаа, соёлын солилцооны чухал орон зай байв.",
fact:"Торгоны замын олон салаа замтай огтлолцоно."
},

east:{
title:"Зүүн бүс",
description:
"Зүүн Азийн бүс нь Хятадын Юань улсын түүх болон Японтой хийсэн харилцаатай холбогдоно.",
fact:"1274, 1281 — Японтой хийсэн цэргийн экспедицүүд."
},

north:{
title:"Хойд бүс",
description:
"Монголын хойд талын өргөн тал нутаг нь нүүдлийн мал аж ахуй, улс төрийн төвлөрлийн суурь орчин байв.",
fact:"Тал нутгийн нүүдлийн соёлын орон зай."
},

south:{
title:"Өмнөд бүс",
description:
"Өмнөд чиглэл нь Хятадын түүхэн улс төрийн орон зайтай шууд холбогдож байв.",
fact:"Юань улсын түүхтэй холбоотой."
}

};

function selectMap(key){

  const data =
    mapData[key];

  $("#mapTitle").textContent =
    data.title;

  $("#mapDescription").textContent =
    data.description;

  $("#mapFact").textContent =
    data.fact;

  $$(".region").forEach(
    r=>r.classList.remove("selected")
  );

  const region =
    document.getElementById(
      "region-"+key
    );

  if(region)
    region.classList.add("selected");
}

$$(".region").forEach(
  region=>{

    region.addEventListener(
      "click",
      ()=>{
        selectMap(
          region.dataset.region
        );
      }
    );

  }
);

$$("[data-map]").forEach(
  button=>{

    button.addEventListener(
      "click",
      ()=>{
        selectMap(
          button.dataset.map
        );
      }
    );

  }
);


/* =========================================================
   PURE WATER 14 DAYS
========================================================= */

const days=[

["1","Эхлэл",
"“Би хаанаас ирсэн бэ?” гэсэн асуултаар өөрийгөө эргэн харах."],

["2","Roots",
"Өвөг дээдэс, гэр бүлийн нэр, үе дамжсан дурсамжийг эргэн харах."],

["3","Japan",
"Япон талын гэр бүлийн түүх болон Хакода овгийн түүхийг судлах."],

["4","Mongolia",
"Монгол хэл, соёл, түүхтэйгээ дахин холбогдох."],

["5","13-р зуун",
"Монголын 13-р зуун, Чингис хаан, Евразийн түүхийг эргэцүүлэх."],

["6","Japan × Mongolia",
"Япон–Монголын түүхэн уулзваруудыг харах."],

["7","Family",
"日蒙家庭 гэдэг өөрийн амьдрал дахь утгыг бодох."],

["8","青坡洞",
"Залбирч, дурсамжтайгаа нүүр тулсан өдөр."],

["9","孝情天苑",
"Гэр бүл, хамтын амьдрал, итгэлийн холбоог эргэцүүлэх."],

["10","天苑宮",
"Нэгэн гэр бүл мэт ах эгч, дүү нартайгаа холбогдох."],

["11","Growth",
"“成長” — дотоод өсөлт гэж юу болохыг тодорхойлох."],

["12","Training",
"清平で精誠を積みながら自分を鍛えている гэсэн бодлыг хэрэгжүүлэх."],

["13","Future",
"Ирээдүйд ямар гүүр болохыг хүсэж байгаагаа тодорхойлох."],

["14","Ocean",
"一滴の水→川→海 — өөрийн жижиг алхмыг хүн төрөлхтний том түүхтэй холбох."]

];

const dayGrid =
  $("#dayGrid");

days.forEach(
  (day,index)=>{

    const button =
      document.createElement("button");

    button.className =
      "day"+(
        index===0 ? " active" : ""
      );

    button.innerHTML=`

      <strong>
        ${day[0]}
      </strong>

      <small>
        ${day[1]}
      </small>

    `;

    button.addEventListener(
      "click",
      ()=>{

        $$(".day").forEach(
          d=>d.classList.remove("active")
        );

        button.classList.add("active");

        $("#dayDetail").innerHTML=`

          <strong>
            ${day[0]}-р өдөр · ${day[1]}
          </strong>

          <p class="muted">
            ${day[2]}
          </p>

        `;

      }
    );

    dayGrid.appendChild(button);

  }
);


/* =========================================================
   ESSAY — THREE LANGUAGES
========================================================= */

const essays={

mn:`Анх танилцаж байна. Би, Япон–Монгол гэр бүлийн адислагдсан хоёр догч үеийн хүүхэд, Хакода Манбок буюу япон хэлээр 箱田満福（はこだ・まんぼく） гэдэг.

Миний эцэг Япон хүн, эх Монгол хүн. Миний эцэг, эх 1998 оны 6-р сарын 13-нд Нью-Йоркийн Madison Square Garden-д болсон 3億6千万組国際祝福結婚式-д оролцож, адислагдсан нэгэн гэр бүлийг байгуулсан.

2026 оны 8-р сарын 13-наас 8-р сарын 26-ны хооронд HJ Cheonju Cheonbo Training Center-д болсон Pure Water Assembly-д оролцохдоо би “成長 — өсөлт” гэдэг үгийг өөрийн 14 өдрийн гол түлхүүр болгосон.

Энэ 14 өдрийн турш би өөрийн өнөөдрийн амьдрал санамсаргүй бий болоогүй гэдгийг улам гүн ойлгосон. Энэ нь өвөг дээдсээс үргэлжилсэн гэр бүлийн түүх, Япон ба Монгол хоёр ард түмний түүх, мөн өөрийн туулж буй замтай холбоотой.

Хүн төрөлхтний түүхийг эргэн харахад Ноагийн үер, Бабелийн цамхагийн тухай түүхээр дамжин хүмүүсийн тархалт, хэл, ард түмний ялгаа бий болсон тухай ойлголтыг эргэцүүлдэг. Ялгаа бий болсон ч хүн төрөлхтөн нэг гэр бүл гэсэн хүсэл алга болоогүй.

Монголын түүхийг судлахад 13-р зуун онцгой байр суурь эзэлдэг. 1206 онд Тэмүжин Чингис хаан болж, Их Монгол улсын түүхэн суурь тавигдсан. Дараа нь Евразийн өргөн уудам орон зай улс төр, худалдаа, соёлын холбоогоор холбогдсон. Юань улсын үед 1274 болон 1281 онд Япон руу цэргийн экспедицүүд хийгдсэн нь Япон–Монголын түүхийн нэгэн огтлолцол болсон.

Энэ түүхийг өөрийн гэр бүлийн түүхтэй холбож бодоход би “түүх бол зөвхөн өнгөрсөн зүйл биш” гэдгийг ойлгосон. Өнгөрсөн түүх өнөөдрийн биднийг ойлгох нэг түлхүүр болдог.

Миний эцгийн талд 箱田六輔 хэмээх хүн байсан. Түүний дараах гэр бүлийн шугамыг 辰馬 → 源輔 → 洋輔 → 良輔 → 満福 гэж тэмдэглэн судалж байна. 箱田六輔 нь Фүкүока болон Мэйжийн үеийн 自由民権運動-ийн түүхтэй холбоотой хүн бөгөөд 向陽社 болон 玄洋社-ийн түүхийн хүрээнд дурдагддаг.

Гэхдээ гэр бүлийн түүхийг судлахдаа баримт болон гэр бүлийн дурсамжийг ялгаж харах хэрэгтэй гэж би боддог. Зарим зүйл нь албан ёсны баримттай, зарим нь гэр бүлээс дамжин ирсэн яриа юм. Тиймээс би аль алиныг нь хүндэтгэн хадгалахыг хүсдэг.

Миний хувьд хамгийн чухал зүйл бол Япон ба Монгол гэсэн хоёр өөр тал миний амьдралд хэрхэн нэгэн гэр бүл болон уулзсаныг ойлгох явдал юм. Би ялгааг арилгахыг хүсдэггүй. Харин ялгааг ойлгож, нэгэн зорилгын төлөө хамт алхахыг хүсдэг.

Pure Water Assembly-ийн үеэр 青坡洞原本部教会-д очиход би залбирч, уйлсан. Тэр үед True Parents намайг угтаж, намайг хүлээж байгаа мэт хүчтэй мэдрэмж төрсөн. Мөн 孝情天苑 болон 天苑宮・天一聖殿-д очихдоо ах эгч, дүү нартайгаа нэгэн гэр бүл мэт холбогдож байгаагаа мэдэрсэн.

Миний 14 өдрийн түлхүүр үг “成長” байсан. Өөрөөр хэлбэл зөвхөн мэдлэг нэмэх бус, өөрийгөө дотроосоо хөгжүүлэх тухай байлаа. Би 清平で精誠を積みながら自分を鍛えている гэсэн бодлыг өөрийн замын нэг хэсэг гэж хардаг.

Миний хувьд “一滴の水→川→海” гэдэг дүрслэл маш чухал. Нэг дусал ус ганцаараа жижиг мэт боловч олон дусал нийлж гол болж, эцэст нь далайтай нийлдэг. Нэг хүн → гэр бүл → ард түмэн → хүн төрөлхтөн гэсэн зам ч мөн адил.

Миний ирээдүйн мөрөөдөл бол Япон–Монголын хооронд, мөн 韓民族–モンゴル民族 хоорондын гүүр болох. Өөрийн хоёр талын түүхийг ойлгож, дараагийн үед илүү их ойлголцол, хүндлэл, итгэл найдвар үлдээхийг хүсдэг.

真のお母様と一つになり、2世・3世が価値と才能で世界中を驚かせ、地上天国に希望を知らせる。

「真の父母によって誕生した多くの祝福家庭を通して、二世・三世・四世圏のピュアウォーターたちが、あなたの地上天国の姿を世界中に知らせるために世界へ出ています。」

Миний түүх энд дуусахгүй. Нэг дусал ус гол болж, гол далай болдог шиг миний өнөөдрийн жижиг алхам ирээдүйд илүү том холбоосын нэг хэсэг болно гэж би хүсдэг.`,

ja:`初めまして。私は、日蒙家庭の祝福二世、箱田満福（はこだ・まんぼく）です。

私の父は日本人、母はモンゴル人です。私の両親は、1998年6月13日にニューヨークのマディソン・スクエア・ガーデンで行われた3億6千万組国際祝福結婚式に参加し、祝福によって一つの家庭を築きました。

2026年8月13日から8月26日まで、HJ Cheonju Cheonbo Training Centerで行われたPure Water Assemblyに参加し、私は14日間のキーワードを「成長」としました。

この14日間を通して、私は自分が今ここにいることは決して偶然ではないと、以前より深く感じるようになりました。それは、先祖から続いてきた家族の歴史、日本とモンゴルという二つの民族の歴史、そして自分自身が歩んでいる道とつながっていると思います。

人類の歴史を振り返ると、ノアの洪水やバベルの塔の物語を通して、人々が広がり、言語や民族の違いが生まれていったことを考えます。違いが生まれたとしても、人類が一つの家族になるという願いがなくなったわけではないと思います。

モンゴルの歴史を学ぶと、13世紀は特に重要な時代です。1206年、テムジンがチンギス・ハーンとなり、モンゴル帝国の基礎が築かれました。その後、ユーラシアの広い地域が政治、交易、文化などのつながりを通して結ばれていきました。さらに元朝の時代には、1274年と1281年に日本への遠征が行われ、日本とモンゴルの歴史が交差しました。

この歴史を自分の家族の歴史と重ねて考えると、私は「歴史は単なる過去ではない」と感じます。過去を知ることは、今の自分がどこから来たのかを理解する一つの鍵になるからです。

私の父方には、箱田六輔という人物がいます。その後の家族の系譜を、辰馬 → 源輔 → 洋輔 → 良輔 → 満福として調べています。箱田六輔は福岡の歴史や明治期の自由民権運動と関係する人物として知られ、向陽社や玄洋社の歴史の中でも語られています。

しかし、家族史を調べる中で、私は史料によって確認できる事実と、家族から受け継いだ記憶を区別することも大切だと考えるようになりました。どちらも自分のルーツを理解するための大切な一部として、丁寧に残していきたいと思います。

私にとって特に大切なのは、日本とモンゴルという二つの背景が、私の人生の中で一つの家庭として出会った意味を考えることです。私は違いを消したいのではありません。違いを理解しながら、一つの大きな目的に向かって一緒に歩みたいと思っています。

Pure Water Assemblyの中で、青坡洞原本部教会を訪れた時、私は祈りながら涙を流しました。その時、真の父母が私を迎え、私を待ってくださっているような強い感覚を持ちました。また、孝情天苑、天苑宮・天一聖殿を訪れた時には、兄弟姉妹と一つの家族のようにつながっていることを感じました。

私の14日間のキーワードは「成長」でした。それは単に知識を増やすことではなく、自分自身を内面から成長させることでした。清平で精誠を積みながら自分を鍛えているという思いを、自分の歩みの一部として大切にしています。

私にとって「一滴の水→川→海」というイメージはとても大切です。一滴の水は小さく見えても、多くの水滴が集まれば川となり、やがて海につながります。一人の人から家庭へ、家庭から民族へ、民族から人類へという流れも、同じように考えることができます。

私の夢は、日本とモンゴルの間、そして韓民族とモンゴル民族の間に立つ橋となることです。二つの背景を持つ自分だからこそできることを考え、次の世代に理解、尊重、希望を伝えていきたいと思います。

真のお母様と一つになり、2世・3世が価値と才能で世界中を驚かせ、地上天国に希望を知らせる。

「真の父母によって誕生した多くの祝福家庭を通して、二世・三世・四世圏のピュアウォーターたちが、あなたの地上天国の姿を世界中に知らせるために世界へ出ています。」

私の物語はここで終わりません。一滴の水が川となり、川が海へつながるように、今日の小さな一歩も、未来の大きなつながりの一部になっていくことを願っています。`,

en:`Nice to meet you. My name is Hakoda Manbok, a second-generation blessed child from a Japan–Mongolia family.

My father is Japanese and my mother is Mongolian. My parents participated in the International Blessing Marriage Ceremony for 360 million couples held at Madison Square Garden in New York on June 13, 1998, and built a family through the Blessing.

I participated in the Pure Water Assembly held at HJ Cheonju Cheonbo Training Center from August 13 to August 26, 2026. I chose “成長 — Growth” as my keyword for the fourteen days.

Through those fourteen days, I came to feel more deeply that my being here today is not something I should see as an isolated coincidence. I see it in connection with the family history that came before me, the histories of Japan and Mongolia, and the path I am walking today.

When I look back at human history, I reflect on the stories of Noah’s flood and the Tower of Babel, and on how people spread out and developed different languages and peoples. Even when differences appeared, I believe the hope for humanity to become one family did not disappear.

When I study Mongolian history, the thirteenth century has a special significance. In 1206, Temüjin became Genghis Khan and the foundations of the Mongol Empire were established. Over time, large parts of Eurasia became connected through political, commercial, cultural, and diplomatic networks. During the Yuan period, expeditions were also launched against Japan in 1274 and 1281, creating one of the important historical intersections between Japan and the Mongol world.

When I connect this history with my own family history, I realize that history is not simply something that belongs to the past. Understanding the past can be one of the keys to understanding where we come from today.

On my father’s side, there is a historical figure named Hakoda Rokusuke, written 箱田六輔. I am tracing the family line as Tatsuma → Gensuke → Yousuke → Ryousuke → Manbok. Rokusuke is associated with the history of Fukuoka and the Freedom and People’s Rights Movement of the Meiji period, and is discussed in connection with the histories of Koyosha and Genyosha.

At the same time, studying family history has taught me to distinguish between documented historical facts and memories passed down within a family. I want to preserve both carefully while making clear which is which.

For me, one of the most important questions is what it means that two different backgrounds — Japan and Mongolia — met in my life as one family. I do not want to erase differences. I want to understand differences and learn how to walk together toward a larger purpose.

During the Pure Water Assembly, when I visited the original headquarters church in Cheongpa-dong, I prayed and cried. I felt strongly as if True Parents were welcoming me and waiting for me. At Hyojeong Cheonwon and Cheonwon Palace and Cheon Il Sanctum, I also felt connected with my brothers and sisters as one family.

My keyword for the fourteen days was “成長 — Growth.” For me, this was not simply about gaining knowledge. It was about developing myself from within. I value the thought that I am training myself while accumulating sincere devotion in Cheongpyeong.

The image “一滴の水→川→海 — One drop of water → River → Ocean” is especially meaningful to me. A single drop may look small, but many drops come together to form a river, and a river eventually reaches the ocean. In the same way, one person can connect to a family, a family to a people, and peoples to humanity.

My dream is to become a bridge between Japan and Mongolia, and also between the Korean and Mongolian peoples. Because I have two backgrounds, I want to think about what I can contribute and pass on greater understanding, respect, and hope to the next generation.

真のお母様と一つになり、2世・3世が価値と才能で世界中を驚かせ、地上天国に希望を知らせる。

I also carry the following passage as part of my vision for the future:

「真の父母によって誕生した多くの祝福家庭を通して、二世・三世・四世圏のピュアウォーターたちが、あなたの地上天国の姿を世界中に知らせるために世界へ出ています。」

My story does not end here. Just as a drop of water becomes part of a river and a river connects to the sea, I hope that the small steps I take today will become part of a larger connection in the future.`
};


/* =========================================================
   ESSAY RENDER
========================================================= */

function renderEssay(language){

  $("#essayContent").textContent =
    essays[language];

  $$(".essay-tab").forEach(
    tab=>{
      tab.classList.toggle(
        "active",
        tab.dataset.essay === language
      );
    }
  );
}

$$(".essay-tab").forEach(
  tab=>{

    tab.addEventListener(
      "click",
      ()=>{
        renderEssay(
          tab.dataset.essay
        );
      }
    );

  }
);

const savedLanguage =
  localStorage.getItem(
    "hakoda-language"
  ) || "mn";

$("#languageSelect").value =
  savedLanguage;

setLanguage(savedLanguage);


/* =========================================================
   GALLERY MODAL
========================================================= */

function openModal(
  title,
  body,
  label="DETAIL"
){

  $("#modalTitle").textContent =
    title;

  $("#modalBody").textContent =
    body;

  $("#modalEyebrow").textContent =
    label;

  $("#modal").classList.add(
    "open"
  );

  document.body.classList.add(
    "modal-open"
  );
}

function closeModal(){

  $("#modal").classList.remove(
    "open"
  );

  document.body.classList.remove(
    "modal-open"
  );
}

$("#modalClose").addEventListener(
  "click",
  closeModal
);

$("#modal").addEventListener(
  "click",
  event=>{

    if(
      event.target ===
      event.currentTarget
    ){
      closeModal();
    }

  }
);

document.addEventListener(
  "keydown",
  event=>{

    if(event.key==="Escape"){
      closeModal();
    }

  }
);

$$(".gallery-item").forEach(
  item=>{

    item.addEventListener(
      "click",
      ()=>{

        openModal(
          item.dataset.gallery,
          "Энэ хэсэг нь gallery placeholder юм. Өөрийн зураг, видео материалаа дараа нь энэ хэсэгт холбож болно.",
          "GALLERY"
        );

      }
    );

  }
);


/* =========================================================
   SEARCH
========================================================= */

const searchData=[

[
"Roots",
"箱田六輔",
"1850 · Fukuoka · 向陽社 · 玄洋社"
],

[
"Family",
"辰馬 → 源助 → 洋助 → 亮介 → 満福",
"Hakoda family genealogy"
],

[
"Mongolia",
"1206",
"Temüjin · Genghis Khan · Mongol Empire"
],

[
"Japan–Mongolia",
"1274",
"元寇 · Japan · Yuan"
],

[
"Japan–Mongolia",
"1281",
"元寇 · Japan · Yuan"
],

[
"Family",
"日蒙家庭",
"Japanese father · Mongolian mother"
],

[
"Pure Water",
"2026-08-13 → 2026-08-26",
"HJ Cheonju Cheonbo Training Center"
],

[
"Pure Water",
"成長",
"14-day keyword"
],

[
"Pure Water",
"青坡洞原本部教会",
"Prayer · reflection"
],

[
"Pure Water",
"孝情天苑",
"Hyojeong Cheonwon"
],

[
"Pure Water",
"天苑宮・天一聖殿",
"Family connection"
],

[
"Theme",
"一滴の水→川→海",
"One drop · River · Ocean"
],

[
"Future",
"人類一家族世界",
"Humanity as one family"
]

];

function search(){

  const query =
    $("#searchInput")
      .value
      .trim()
      .toLowerCase();

  const output =
    $("#searchResults");

  output.innerHTML="";

  if(!query){

    output.innerHTML=
      `<div class="search-result">
        Хайх үгээ оруулна уу.
      </div>`;

    return;
  }

  const results =
    searchData.filter(
      item=>
        item.join(" ")
          .toLowerCase()
          .includes(query)
    );

  if(!results.length){

    output.innerHTML=
      `<div class="search-result">
        Илэрц олдсонгүй.
      </div>`;

    return;
  }

  results.forEach(
    result=>{

      const div =
        document.createElement("div");

      div.className =
        "search-result";

      div.innerHTML=`

        <small>
          ${result[0]}
        </small>

        <strong>
          ${result[1]}
        </strong>

        <p class="muted">
          ${result[2]}
        </p>

      `;

      output.appendChild(div);

    }
  );

}

$("#searchButton").addEventListener(
  "click",
  search
);

$("#searchInput").addEventListener(
  "keydown",
  event=>{

    if(event.key==="Enter"){
      search();
    }

  }
);


/* =========================================================
   PRINT / PDF
========================================================= */

$("#printButton").addEventListener(
  "click",
  ()=>{
    window.print();
  }
);

$("#printEssay").addEventListener(
  "click",
  ()=>{
    location.hash="essay";

    setTimeout(
      ()=>{
        window.print();
      },
      300
    );
  }
);


/* =========================================================
   COPY FUTURE URL
========================================================= */

$("#copyLink").addEventListener(
  "click",
  async()=>{

    const url =
      location.href.split("#")[0]
      + "#future";

    try{

      await navigator.clipboard
        .writeText(url);

      showToast(
        "Future хэсгийн холбоос хууллаа."
      );

    }catch(error){

      showToast(url);

    }

  }
);


/* =========================================================
   TOAST
========================================================= */

let toastTimer;

function showToast(message){

  const toast =
    $("#toast");

  toast.textContent =
    message;

  toast.classList.add(
    "show"
  );

  clearTimeout(
    toastTimer
  );

  toastTimer =
    setTimeout(
      ()=>{
        toast.classList.remove(
          "show"
        );
      },
      2200
    );
}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealObserver =
  new IntersectionObserver(
    entries=>{

      entries.forEach(
        entry=>{

          if(entry.isIntersecting){

            entry.target
              .classList
              .add("visible");

          }

        }
      );

    },
    {
      threshold:.08
    }
  );

$$(".reveal").forEach(
  element=>
    revealObserver.observe(
      element
    )
);


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
  $$("main section[id]");

const navigation =
  $$(".nav-links a");

const navObserver =
  new IntersectionObserver(
    entries=>{

      entries.forEach(
        entry=>{

          if(
            entry.isIntersecting
          ){

            navigation.forEach(
              link=>{

                link.classList.toggle(
                  "active",
                  link.dataset.section ===
                  entry.target.id
                );

              }
            );

          }

        }
      );

    },
    {
      rootMargin:
        "-25% 0px -60% 0px"
    }
  );

sections.forEach(
  section=>
    navObserver.observe(
      section
    )
);


/* =========================================================
   BACK TO TOP
========================================================= */

const backTop =
  $("#backTop");

window.addEventListener(
  "scroll",
  ()=>{

    backTop.classList.toggle(
      "show",
      window.scrollY > 600
    );

  }
);

backTop.addEventListener(
  "click",
  ()=>{
    window.scrollTo({
      top:0,
      behavior:"smooth"
    });
  }
);


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener(
  "keydown",
  event=>{

    if(
      event.target.matches(
        "input,textarea,select"
      )
    ){
      return;
    }


    /* L = change language */

    if(
      event.key.toLowerCase()
      === "l"
    ){

      const languages =
        ["mn","ja","en"];

      const current =
        languages.indexOf(
          $("#languageSelect").value
        );

      const next =
        languages[
          (current+1)
          %
          languages.length
        ];

      setLanguage(next);

      showToast(
        "Language: "
        + next.toUpperCase()
      );

    }


    /* / = search */

    if(event.key === "/"){

      event.preventDefault();

      location.hash =
        "search";

      setTimeout(
        ()=>{
          $("#searchInput")
            .focus();
        },
        200
      );

    }

  }
);


/* =========================================================
   DEEP LINKS
========================================================= */

function handleHash(){

  const id =
    location.hash.substring(1);

  if(!id){
    return;
  }

  const element =
    document.getElementById(id);

  if(element){

    setTimeout(
      ()=>{
        element.scrollIntoView({
          behavior:"smooth"
        });
      },
      150
    );

  }

}

window.addEventListener(
  "hashchange",
  handleHash
);

handleHash();


/* =========================================================
   CURRENT YEAR
========================================================= */

$("#currentYear")
  .textContent =
  new Date()
    .getFullYear();


/* =========================================================
   INITIAL MAP
========================================================= */

selectMap("core");


/* =========================================================
   CONSOLE INFO
========================================================= */

console.log(
  "HAKODA MANBOK — Digital History Project loaded."
);

console.log(
  "Shortcuts: L = language, / = search"
);
