function initializeTickers() {
  if (!document) {
    console.log("document not ready.");
    return;
  }
  
  const offerContainers = document.querySelectorAll(".offer-bottles");

  if (offerContainers.length === 0) {
    setTimeout(initializeTickers, 3000);
    return;
  }

  offerContainers.forEach((container, index) => {
    const offers = container.querySelectorAll(".offer-item");
    let currentOfferIndex = 0;

    if (offers.length === 0) {
      return;
    }

    offers.forEach((offer, idx) => {
      if (idx === 0) {
        offer.classList.add("active-item");
        offer.classList.remove("hidden-item");
      } else {
        offer.classList.add("hidden-item");
        offer.classList.remove("active-item");
      }
    });

    function switchDetails(offer) {
      const detailPrice = offer.querySelector(".detail-price");
      const detailChance = offer.querySelector(".detail-chance");

      if (detailPrice.classList.contains("visible-detail")) {
        detailPrice.classList.remove("visible-detail");
        setTimeout(() => {
          detailPrice.classList.add("hidden-detail");
          detailChance.classList.remove("hidden-detail");
          detailChance.classList.add("visible-detail");
        }, 600);
      } else {
        detailChance.classList.remove("visible-detail");
        setTimeout(() => {
          detailChance.classList.add("hidden-detail");
          detailPrice.classList.remove("hidden-detail");
          detailPrice.classList.add("visible-detail");
        }, 600);
      }
    }

    function nextOffer() {
      const currentOffer = offers[currentOfferIndex];
      setTimeout(() => {
        switchDetails(currentOffer);
      }, 1000);

      if (offers.length < 2) {
        return;
      }

      setTimeout(() => {
        currentOffer.classList.remove("active-item");
        currentOffer.classList.add("hidden-item");

        currentOfferIndex = (currentOfferIndex + 1) % offers.length;
        const nextOffer = offers[currentOfferIndex];

        const detailPrice = nextOffer.querySelector(".detail-price");
        const detailChance = nextOffer.querySelector(".detail-chance");
        detailPrice.classList.remove("hidden-detail");
        detailPrice.classList.add("visible-detail");
        detailChance.classList.remove("visible-detail");
        detailChance.classList.add("hidden-detail");

        nextOffer.classList.remove("hidden-item");
        setTimeout(() => {
          nextOffer.classList.add("active-item");
        }, 20 + Math.floor(Math.random() * 100) + 1);
      }, 3000);
    }

    // Start the interval to rotate offers
    setInterval(nextOffer, 4000);
  });
}