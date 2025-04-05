class SwiperComponent extends HTMLElement {
    // The constructor is called when an object is created with the class
    constructor() {
      super(); // Call the parent class constructor
      this.section=this.querySelector('.swiper'); // Select the swiper element within the custom element
    }
  
    // connectedCallback is a lifecycle method that is called when the custom element is first connected to the document's DOM
    connectedCallback() {
      this.initSwiper(); // Initialize the Swiper when the component is connected

        window.addEventListener('resize', () => {
            this.adjustSectionWidth(); // Adjust the section width on window resize
        });
        window.addEventListener('load', () => {
            this.adjustSectionWidth(); // Adjust the section width on window load
        });
    }

    adjustSectionWidth() {
        const section = this.section; // Adjust selector as needed
        const progressBar = this.querySelector('.swiper-scrollbar'); // Select the progress bar element within the custom element
        const windowWidth = window.innerWidth;

        if (windowWidth > 1640) {
            const spaceRemaining = windowWidth - 1640;
            const marginLeft = spaceRemaining / 2;

            section.style.maxWidth = `${1640 + marginLeft}px`;
            section.style.marginLeft = `${marginLeft}px`;
            // Adjust the progress bar width to match the section width
            
        } else {
            section.style.maxWidth = '';
            section.style.marginLeft = '';
        }
    }
  
    // Method to initialize the Swiper
    initSwiper() {
      // Define the options for the Swiper
      const swiperOptions = {
        spaceBetween: 33, // Space between slides
        slidesPerView: 1, // Show 1 slide per view on screens 768px and larger
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        scrollbar: {
          el: '.swiper-scrollbar',
          draggable: true
        },
        breakpoints: {
            768: {
                slidesPerView: 3.5, // Show 1 slide per view on screens 768px and larger
                spaceBetween: 25
            },
        },
      };
      // Initialize the Swiper with the options
      new Swiper(this.section, swiperOptions);
    }

    disconnectedCallback() {
        // Remove the event listeners when the component is disconnected
        window.removeEventListener('resize', this.adjustSectionWidth);
        window.removeEventListener('load', this.adjustSectionWidth);
    }
  }
  
  // Define the custom element
  customElements.define("products-swiper-component", SwiperComponent);