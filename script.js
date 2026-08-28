/* =================================
   🎨 MAGIC GIFT - Optimized JS
================================= */

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

/* =================================
   🎨 رسم الاسم بالرموز
================================= */

function makeArt(text) {

    const isArabic = /[\u0600-\u06FF]/.test(text);

    canvas.width = 900;
    canvas.height = 280;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    /*
       مهم:
       direction = rtl للعربي
       لكن الـ ASCII نفسه يظل ltr
       حتى لا يتشقلب الشكل.
    */
    ctx.direction = isArabic ? "rtl" : "ltr";

    let fontSize = isArabic ? 180 : 175;

    while (fontSize > 60) {

        ctx.font = `900 ${fontSize}px Arial`;

        if (ctx.measureText(text).width <= 800) {
            break;
        }

        fontSize -= 5;
    }

    ctx.font = `900 ${fontSize}px Arial`;

    ctx.fillText(
        text,
        canvas.width / 2,
        canvas.height / 2
    );

    const data = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const symbols = ["•", "▪", "●", "✦"];

    const stepX = 11;
    const stepY = 12;

    const lines = [];

    for (let y = 0; y < canvas.height; y += stepY) {

        let line = "";

        for (let x = 0; x < canvas.width; x += stepX) {

            const index =
                (y * canvas.width + x) * 4;

            const alpha =
                data.data[index + 3];

            if (alpha > 140) {

                line += symbols[
                    Math.floor(
                        Math.random() * symbols.length
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

    if (!container) return;

    container.innerHTML = "";

    /*
       كان 45 نجمة.
       25 كفاية جدًا وتعطي نفس الإحساس
       مع ضغط أقل على المتصفح.
    */

    const starCount =
        window.innerWidth < 600 ? 16 : 25;

    const fragment =
        document.createDocumentFragment();

    for (let i = 0; i < starCount; i++) {

        const star =
            document.createElement("span");

        star.textContent =
            Math.random() > 0.65
                ? "✦"
                : "•";

        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        star.style.animationDelay =
            `${Math.random() * 6}s`;

        star.style.animationDuration =
            `${4 + Math.random() * 4}s`;

        fragment.appendChild(star);
    }

    container.appendChild(fragment);
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

    /*
       عدد أقل على الموبايل
    */

    const count =
        window.innerWidth < 600 ? 16 : 22;

    const fragment =
        document.createDocumentFragment();

    const particles = [];

    for (let i = 0; i < count; i++) {

        const particle =
            document.createElement("div");

        particle.className =
            "celebration";

        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];

        particle.style.left =
            `${50 + (Math.random() * 30 - 15)}%`;

        particle.style.top =
            `${45 + (Math.random() * 20 - 10)}%`;

        particle.style.setProperty(
            "--x",
            `${Math.random() * 400 - 200}px`
        );

        particle.style.setProperty(
            "--y",
            `${Math.random() * -400 - 100}px`
        );

        fragment.appendChild(particle);

        particles.push(particle);
    }

    document.body.appendChild(fragment);

    setTimeout(() => {

        particles.forEach(
            particle => particle.remove()
        );

    }, 1600);
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

    if (!input || !result) return;

    const name =
        input.value.trim();

    if (!name) {

        input.classList.add("shake");

        setTimeout(() => {
            input.classList.remove("shake");
        }, 450);

        input.focus();

        return;
    }

    const safeName =
        escapeHTML(name);

    /*
       الرسم يحصل مرة واحدة فقط
       عند الضغط على الزر.
    */

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

    result.classList.remove("show");

    /*
       requestAnimationFrame أفضل من
       setTimeout هنا للـ rendering.
    */

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            result.classList.add("show");

            celebration();

        });

    });
}


/* =================================
   🪄 3D CARD
================================= */

function setupCard3D() {

    const card =
        document.querySelector(".card");

    /*
       لا نشغل 3D على الشاشات الصغيرة.
       الموبايل يستفيد أكثر من الأداء.
    */

    if (
        !card ||
        !window.matchMedia("(pointer: fine)").matches
    ) {
        return;
    }

    let rafId = null;

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    function animateCard() {

        currentX +=
            (mouseX - currentX) * 0.08;

        currentY +=
            (mouseY - currentY) * 0.08;

        card.style.transform =
            `perspective(1000px)
             rotateX(${currentY}deg)
             rotateY(${currentX}deg)`;

        rafId =
            requestAnimationFrame(
                animateCard
            );
    }

    document.addEventListener(
        "mousemove",
        (event) => {

            mouseX =
                ((event.clientX /
                window.innerWidth) - 0.5) * 4;

            mouseY =
                ((event.clientY /
                window.innerHeight) - 0.5) * -4;

            if (!rafId) {
                rafId =
                    requestAnimationFrame(
                        animateCard
                    );
            }
        },
        { passive: true }
    );

    document.addEventListener(
        "mouseleave",
        () => {

            mouseX = 0;
            mouseY = 0;

            if (!rafId) {
                rafId =
                    requestAnimationFrame(
                        animateCard
                    );
            }
        }
    );
}


/* =================================
   🚀 التشغيل
================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        createStars();

        setupCard3D();

        const nameInput =
            document.getElementById("name");

        if (nameInput) {

            nameInput.addEventListener(
                "keydown",
                (event) => {

                    if (event.key === "Enter") {

                        event.preventDefault();

                        showGift();
                    }

                }
            );
        }

    }
);
