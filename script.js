
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");


/* =================================
   🎨 رسم الاسم بالرموز
================================= */

function makeArt(text) {

    const isArabic =
        /[\u0600-\u06FF]/.test(text);


    canvas.width = 900;
    canvas.height = 280;


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /* =========================
       إعداد النص
    ========================= */

    ctx.fillStyle = "#ffffff";

    ctx.textAlign = "center";

    ctx.textBaseline = "middle";

    ctx.direction =
        isArabic ? "rtl" : "ltr";


    let fontSize =
        isArabic ? 180 : 175;


    /* تصغير الاسم لو طويل */

    while (fontSize > 60) {

        ctx.font =
            `900 ${fontSize}px Arial`;

        if (
            ctx.measureText(text).width <= 800
        ) {
            break;
        }

        fontSize -= 5;
    }


    ctx.font =
        `900 ${fontSize}px Arial`;


    /* =========================
       رسم الاسم
    ========================= */

    ctx.fillText(
        text,
        canvas.width / 2,
        canvas.height / 2
    );


    /* =========================
       أخذ الـ Pixels
    ========================= */

    const data =
        ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        );


    /* =========================
       تحويله إلى Symbols
    ========================= */

    const symbols = [
        "•",
        "▪",
        "●",
        "✦"
    ];


    let lines = [];


    const stepX = 11;
    const stepY = 12;


    for (
        let y = 0;
        y < canvas.height;
        y += stepY
    ) {

        let line = "";


        for (
            let x = 0;
            x < canvas.width;
            x += stepX
        ) {

            const index =
                (
                    y *
                    canvas.width +
                    x
                ) * 4;


            const alpha =
                data.data[index + 3];


            if (alpha > 140) {

                line +=
                    symbols[
                        Math.floor(
                            Math.random() *
                            symbols.length
                        )
                    ];

            } else {

                line += " ";
            }
        }


        lines.push(line);
    }


    return lines.join("\n");
}


/* =================================
   ⭐ النجوم
================================= */

function createStars() {

    const container =
        document.querySelector(".stars-bg");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    for (let i = 0; i < 45; i++) {

        const star =
            document.createElement("span");


        star.textContent =
            Math.random() > 0.65
                ? "✦"
                : "•";


        star.style.left =
            Math.random() * 100 + "%";


        star.style.top =
            Math.random() * 100 + "%";


        star.style.animationDelay =
            Math.random() * 6 + "s";


        star.style.animationDuration =
            3 + Math.random() * 5 + "s";


        container.appendChild(star);
    }
}


/* =================================
   🎉 الاحتفال
================================= */

function celebration() {

    const symbols = [
        "✦",
        "♥",
        "✨",
        "★",
        "♡"
    ];


    for (let i = 0; i < 28; i++) {

        const particle =
            document.createElement("div");


        particle.className =
            "celebration";


        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        particle.style.left =
            50 +
            (Math.random() * 30 - 15)
            + "%";


        particle.style.top =
            45 +
            (Math.random() * 20 - 10)
            + "%";


        particle.style.setProperty(
            "--x",
            (Math.random() * 500 - 250)
            + "px"
        );


        particle.style.setProperty(
            "--y",
            (Math.random() * -500 - 100)
            + "px"
        );


        document.body.appendChild(
            particle
        );


        setTimeout(() => {

            particle.remove();

        }, 1800);
    }
}


/* =================================
   🛡️ حماية الاسم
================================= */

function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =================================
   🎁 إظهار الهدية
================================= */

function showGift() {

    const input =
        document.getElementById("name");


    const result =
        document.getElementById("result");


    const name =
        input.value.trim();


    if (!name) {

        input.classList.add("shake");


        setTimeout(() => {

            input.classList.remove(
                "shake"
            );

        }, 500);


        input.focus();

        return;
    }


    const safeName =
        escapeHTML(name);


    const art =
        makeArt(name);


    const messages = [

        "وجودك بيخلّي الدنيا أحلى ❤️",

        "في ناس وجودها لوحده هدية 🎁",

        "خليك دايمًا بنفس جمال قلبك ✨",

        "الدنيا أحلى بوجودك فيها 💖",

        "دي حاجة صغيرة مخصوص ليك 🌟"

    ];


    const message =
        messages[
            Math.floor(
                Math.random() *
                messages.length
            )
        ];


    result.innerHTML = `

        <div class="magic-title">
            ✦ ✧ ★ ✧ ✦
        </div>


        <div class="name-glow">
            ${safeName} ❤️
        </div>


        <div class="art-box">

            <pre class="ascii">${art}</pre>

        </div>


        <div class="magic-title">
            ✦ ✧ ★ ✧ ✦
        </div>


        <div class="message">
            ${message}
        </div>


        <div class="tiny-heart">
            ♥
        </div>

    `;


    result.classList.remove(
        "show"
    );


    setTimeout(() => {

        result.classList.add(
            "show"
        );


        celebration();

    }, 100);
}


/* =================================
   تشغيل النجوم
================================= */

createStars();


/* =================================
   Enter لإظهار الهدية
================================= */

const nameInput =
    document.getElementById("name");


if (nameInput) {

    nameInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                showGift();
            }

        }
    );

/* =================================
   🪄 3D Card Effect
================================= */

const card =
    document.querySelector(".card");


if (card && window.matchMedia(
    "(pointer: fine)"
).matches) {

    document.addEventListener(
        "mousemove",
        (event) => {

            const x =
                (event.clientX /
                window.innerWidth) - 0.5;


            const y =
                (event.clientY /
                window.innerHeight) - 0.5;


            const rotateX =
                y * -4;


            const rotateY =
                x * 4;


            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;
        }
    );


    document.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";
        }
    );
}


}
