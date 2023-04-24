const setCopyrightDate = () => {
  const newDate = new Date();
  const year = newDate.getFullYear().toString();

  document.getElementById('copyright-date').appendChild(document.createTextNode(`VanessaSchill.com © Vanessa Schill ${year}`));
};

const setScrollListener = () => {
  let lastScrollTop = 0;
  const headerNav = document.getElementById('header-nav');

  window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        headerNav.style.top = '-51px';
      } else {
        headerNav.style.top = 0;
      }

      lastScrollTop = scrollTop;
  });
}

const handleTestimonialCarousel = () => {
  const testimonial1 = document.getElementById('testimonial-1');
  const testimonial2 = document.getElementById('testimonial-2');
  const testimonial3 = document.getElementById('testimonial-3');
  let testimonials = [testimonial1, testimonial2, testimonial3];

  setInterval(() => {
    if (testimonial1.classList.contains('show')) {
      testimonial1.classList.remove('show');
      testimonial2.classList.add('show');
    } else if (testimonial2.classList.contains('show')) {
      testimonial2.classList.remove('show');
      testimonial3.classList.add('show');
    } else if (testimonial3.classList.contains('show')) {
      testimonial3.classList.remove('show');
      testimonial1.classList.add('show');
    }
  }, 10000);

};

setScrollListener();
setCopyrightDate();
handleTestimonialCarousel();
