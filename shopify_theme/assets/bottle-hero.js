var items = [
    { price: 29, image: 'https://cdn.shopify.com/s/files/1/0661/5164/5373/files/bottle5.png', adjective: 'Delightful' },
    { price: 72, image: 'https://cdn.shopify.com/s/files/1/0661/5164/5373/files/bottle6.png', adjective: 'Fantastic' },
    { price: 200, image: 'https://cdn.shopify.com/s/files/1/0661/5164/5373/files/bottle9.png', adjective: 'Amazing' },
    { price: 455, image: 'https://cdn.shopify.com/s/files/1/0661/5164/5373/files/bottle7.png', adjective: 'Incredible' },
    { price: 1550, image: 'https://cdn.shopify.com/s/files/1/0661/5164/5373/files/bottle8.png', adjective: 'Legendary' }
  ];
var selectedIndex = 1;

function updateDisplay() {
  var leftItem = items[0];
  var rightItem = items[selectedIndex];

  // Elements to update
  var rightAdjective = document.getElementById('right-bottle-adjective');
  var rightImage = document.getElementById('right-bottle-image');
  var rightPrice = document.getElementById('right-bottle-hero-price');

  // Apply exit classes
  rightAdjective.classList.add('title-price-exit');
  rightImage.classList.add('current-exit');
  rightPrice.classList.add('title-price-exit');

  // After exit transition, update content and apply enter classes
  setTimeout(() => {
    // Update content
    rightAdjective.innerText = rightItem.adjective;
    rightImage.src = rightItem.image;
    rightImage.alt = rightItem.adjective + ' upgraded bottle';
    rightPrice.innerText = '$' + rightItem.price;

    // Clear exit classes and apply enter classes
    rightAdjective.classList.remove('title-price-exit');
    rightImage.classList.remove('current-exit');
    rightPrice.classList.remove('title-price-exit');
    rightAdjective.classList.add('title-price-enter');
    rightImage.classList.add('current-enter');
    rightPrice.classList.add('title-price-enter');

    // Remove enter classes after transition completes
    setTimeout(() => {
      rightAdjective.classList.remove('title-price-enter');
      rightImage.classList.remove('current-enter');
      rightPrice.classList.remove('title-price-enter');
    }, 1000); // Transition duration
  }, 500); // Wait for exit transition to complete
}

function cycleBottles() {
  selectedIndex = (selectedIndex + 1) % items.length;
  if (selectedIndex === 0) selectedIndex = 1;
  updateDisplay();
}

document.addEventListener('DOMContentLoaded', function() {
   updateDisplay();
   setInterval(cycleBottles, 4000);
   window.handleScrollClick = function() {
     var section = document.querySelector('.featured-collection');
     if (section) {
       var sectionPosition = section.getBoundingClientRect().top + window.pageYOffset;
       window.scrollTo({
         top: sectionPosition,
         behavior: 'smooth'
       });
     }
   }
 });