// Import custom styles
import "@/src/css/main.scss";

const totalPrice = 295.95;
const articleImgs = document.querySelectorAll(
    "#carrusel .ima-prev-view"
);
const articleTabs = document.querySelectorAll(".tablinks");
const articleWarranty = document.querySelectorAll(
    "#warranty .card-serempre"
);
const articleFeatures = document.querySelectorAll(
    "#features .card-serempre"
);
const articleColor = document.querySelectorAll(
    "#color-list .card-serempre"
);

const calPrice = () => {
    let price = 0;
    const articuleActive = document.querySelectorAll(".active");
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
    const parentElement = targetImg.closest("#carrusel .ima-prev-view");
    articleImgs.forEach((ima) => {
        ima
            .closest("#carrusel .ima-prev-view")
            .classList.remove("ima-select");
    });
    document.getElementById("imageShow").src = targetImg.src;
    parentElement.classList.add("ima-select");
};
const viewTab = (e) => {
    const targetTab = e.target;
    const tabLink = e.target.attributes["data-link"].value;
    const parentElement = targetTab.closest(".tablinks");
    articleTabs.forEach((tab) => {
        tab.closest(".tablinks").classList.remove("selected");
    });
    document.querySelectorAll(".tabcontent").forEach((Content) => {
        Content.closest(".tabcontent").classList.remove("show");
    });
    document.getElementById(tabLink).classList.add("show");
    parentElement.classList.add("selected");
};
const selectColor = (e) => {
    const targetTab = e.target;
    const parentElement = targetTab.closest(".card-serempre");
    articleColor.forEach((tab) => {
        tab.closest(".card-serempre").classList.remove("active");
    });
    parentElement.classList.add("active");
};
const selectWarra = (e) => {
    const targetTab = e.target;
    const parentElement = targetTab.closest(".card-serempre");
    articleWarranty.forEach((tab) => {
        tab.closest(".card-serempre").classList.remove("active");
    });
    parentElement.classList.add("active");
    calPrice();
};
const selectFea = (e) => {
    const targetTab = e.target;
    const parentElement = targetTab.closest(".card-serempre");
    articleFeatures.forEach((tab) => {
        tab.closest(".card-serempre").classList.remove("active");
    });
    parentElement.classList.add("active");
    calPrice();
};
const verify = () => {
    const articuleActive = document.querySelectorAll(".active");
    if (articuleActive.length < 3) {
        document
            .querySelector("#message-color")
            .classList.remove("hidden");
        document
            .querySelector("#message-color")
            .classList.add("is-invalid");
    } else {
        document.querySelector("#message-color").classList.add("hidden");
        document.querySelector("#miModal").classList.add("modal-show");
        setTimeout(() => {
            document
                .querySelector("#miModal")
                .classList.remove("modal-show");
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