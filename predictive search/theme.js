// button ki class hai jo product tab me jo btn hai unki
const tabLinks = document.querySelectorAll('.tab-links');
// container ki class hai jo product tab me hai  
const predictiveSearchSections = document.querySelectorAll('.tab-content');
let activeTabIndex = 0;

const filter_task = (customAttribute) => {
    const savedValue = localStorage.getItem("selectedCity");
    if (!savedValue) return console.warn("No value found in localStorage for 'selectedCity'.");
    // is me url me jo section id hai wo ik file ka nam hai jo mene banai hai us me predictive search ki file ka code hai
    const url = `${window.Shopify.routes.root}search/suggest?q=${encodeURIComponent(savedValue)}+${encodeURIComponent(customAttribute)}&resources[type]=product&resources[limit]=8&resources[options][unavailable_products]=show&resources[options][fields]=tag&section_id=predictive-search-custom`;
    console.log('Fetch URL:', url); // Log the URL

    fetch(url)
        .then(res => res.ok ? res.text() : Promise.reject(`${res.status}: ${res.statusText}`))
        .then(text => {
            const resultsMarkup = new DOMParser()
                .parseFromString(text, 'text/html')
                .querySelector('#shopify-section-predictive-search-custom').innerHTML;

            predictiveSearchSections.forEach((section, idx) => {
                section.innerHTML = resultsMarkup;
                section.classList.toggle('active', idx === activeTabIndex);

                // Check if the product grid (or section) is empty
                const productGrid = section.querySelector('.product-grid'); // Adjust selector as needed
                if (productGrid && !productGrid.children.length) {
                    section.innerHTML = "<p>We apologize, no products were found matching your search.</p>";
                }
            });
        })
        .catch(err => console.error('Fetch error:', err));
};

tabLinks.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        activeTabIndex = index;
        filter_task(tab.getAttribute('custom-attribute'));
    });
});
// city drop down header ki file me hai jis ki waja se local storige me save ho rhi hai 
document.getElementById('cityDropdown').addEventListener('change', () => {
    tabLinks[activeTabIndex]?.click();
});

window.onload = () => {
    const activeTab = document.querySelector('.tab-links.active');
    if (activeTab) filter_task(activeTab.getAttribute('custom-attribute'));
};