// Import custom styles
import "@/src/css/main.scss";

import "@/src/assets/static/part1.jpg";
import "@/src/assets/static/part2.jpg";
import "@/src/assets/static/part3.jpg";
import "@/src/assets/static/serempre.png";
import "@/src/assets/static/noise_cancellation.svg";
import "@/src/assets/static/shopping-cart.svg";
import "@/src/assets/static/studio_monitoring.svg";
import "@/src/assets/static/touch.svg";

const totalPrice = 295.95;
const articleImgs = document.querySelectorAll("#carrusel .flex");
const articleTabs = document.querySelectorAll(".tablinks");
const articleWarranty = document.querySelectorAll(
    "#warranty .border-gray-200"
);
const articleFeatures = document.querySelectorAll(
    "#features .border-gray-200"
);
const articleColor = document.querySelectorAll(
    "#color-list .border-gray-200"
);

const calPrice = () => {
    let price = 0;
    const articuleActive = document.querySelectorAll(
        ".border-blue-400"
    );
    articuleActive.forEach((tab) => {
        if (tab.attributes["data-price"]) {
            price += parseFloat(tab.attributes["data-price"].value);
        }
    });
    price += parseFloat(totalPrice);
    document.getElementById("priceTotal").innerHTML = "$" + price;
};
const imagenPreView = (e) => {
    const targetImg = e.target;
    const parentElement = targetImg.closest("#carrusel .flex");
    articleImgs.forEach((ima) => {
        ima
            .closest("#carrusel .flex")
            .classList.remove("hover:border-blue-600");
        ima
            .closest("#carrusel .flex")
            .classList.remove("border-blue-400");
    });
    document.getElementById("imageShow").src = targetImg.src;
    parentElement.classList.add("hover:border-blue-600");
    parentElement.classList.add("border-blue-400");
};
const viewTab = (e) => {
    const targetTab = e.target;
    const tabLink = e.target.attributes["data-link"].value;
    const parentElement = targetTab.closest(".tablinks");
    articleTabs.forEach((tab) => {
        tab.closest(".tablinks").classList.add("hover:text-gray-700");
        tab.closest(".tablinks").classList.add("text-gray-600");
        tab.closest(".tablinks").classList.remove("text-black");
        tab.closest(".tablinks").classList.remove("border-black");
        tab.closest(".tablinks").classList.remove("border-b");
    });
    document.querySelectorAll(".tabcontent").forEach((Content) => {
        Content.closest(".tabcontent").classList.add("hidden");
    });
    document.getElementById(tabLink).classList.remove("hidden");
    parentElement.classList.remove("hover:text-gray-700");
    parentElement.classList.add("text-black");
    parentElement.classList.remove("text-gray-600");
    parentElement.classList.add("border-black");
    parentElement.classList.add("border-b");
};
const selectColor = (e) => {
    const targetTab = e.target;
    const parentElement = targetTab.closest(".border-gray-200");
    articleColor.forEach((tab) => {
        tab
            .closest(".border-gray-200")
            .classList.remove("border-blue-400");
        tab
            .closest(".border-gray-200")
            .classList.remove("hover:border-blue-500");
        tab
            .closest(".border-gray-200")
            .classList.add("hover:border-gray-400");
    });
    parentElement.classList.add("border-blue-400");
    parentElement.classList.add("hover:border-blue-500");
    parentElement.classList.remove("hover:border-gray-400");
};
const selectWarra = (e) => {
    const targetTab = e.target;
    const parentElement = targetTab.closest(".border-gray-200");
    articleWarranty.forEach((tab) => {
        tab
            .closest(".border-gray-200")
            .classList.remove("border-blue-400");
        tab
            .closest(".border-gray-200")
            .classList.remove("hover:border-blue-500");
    });
    parentElement.classList.add("border-blue-400");
    parentElement.classList.add("hover:border-blue-500");
    calPrice();
};
const selectFea = (e) => {
    const targetTab = e.target;
    const parentElement = targetTab.closest(".border-gray-200");
    articleFeatures.forEach((tab) => {
        tab
            .closest(".border-gray-200")
            .classList.remove("border-blue-400");
        tab
            .closest(".border-gray-200")
            .classList.remove("hover:border-blue-500");
    });
    parentElement.classList.add("border-blue-400");
    parentElement.classList.add("hover:border-blue-500");
    calPrice();
};
const verify = () => {
    const articuleActive = document.querySelectorAll(
        ".border-blue-400"
    );
    if (articuleActive.length < 4) {
        document
            .querySelector("#message-color")
            .classList.remove("hidden");
    } else {
        document.querySelector("#message-color").classList.add("hidden");
        document
            .querySelector("#miModal")
            .classList.add("pointer-events-auto");
        document.querySelector("#miModal").classList.add("opacity-100");
        setTimeout(() => {
            document
                .querySelector("#miModal")
                .classList.remove("pointer-events-auto");
            document
                .querySelector("#miModal")
                .classList.remove("opacity-100");
        }, 2000);
    }
};

document.querySelector(".buy-now").addEventListener("click", verify);

articleImgs.forEach((ima) => {
    ima.addEventListener("click", imagenPreView);
});
articleTabs.forEach((tab) => {
    tab.addEventListener("click", viewTab);
});
articleWarranty.forEach((warranty) => {
    warranty.addEventListener("click", selectWarra);
});
articleFeatures.forEach((feactures) => {
    feactures.addEventListener("click", selectFea);
});
articleColor.forEach((color) => {
    color.addEventListener("click", selectColor);
});
document.getElementById("priceTotal").innerHTML = "$" + totalPrice;
// Accept HMR as per: https://webpack.js.org/api/hot-module-replacement#accept
if (module.hot) {
    module.hot.accept();
}