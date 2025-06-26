/**
 * Kubire Salon - Main JavaScript
 * Clean and modular approach with text correction
 */

class KubireSalonApp {
  constructor() {
    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    this.setupIntersectionObserver();
    this.setupEventListeners();
    console.log('Kubire Salon app initialized');
  }

  /**
   * Setup Intersection Observer for animations
   */
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.handleElementAnimation(entry.target, observer);
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(element => observer.observe(element));
  }

  /**
   * Handle element animation when it enters viewport
   * @param {Element} element - The element to animate
   * @param {IntersectionObserver} observer - The observer instance
   */
  handleElementAnimation(element, observer) {
    if (element.classList.contains('fade-in')) {
      this.animateFadeIn(element);
    }
  }

  /**
   * Animate fade-in effect
   * @param {Element} element - The element to fade in
   */
  animateFadeIn(element) {
    element.classList.add('show');
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Smooth scroll for anchor links
    this.setupSmoothScroll();
    
    // Form submissions (if any)
    this.setupFormHandlers();

    // Window resize handler
    window.addEventListener('resize', this.debounce(() => {
      this.handleResize();
    }, 250));
  }

  /**
   * Setup smooth scrolling for anchor links
   */
  setupSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          this.smoothScrollTo(targetElement);
        }
      });
    });
  }

  /**
   * Smooth scroll to target element
   * @param {Element} target - Target element to scroll to
   */
  smoothScrollTo(target) {
    const headerOffset = 60; // Account for fixed header
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  /**
   * Setup form handlers
   */
  setupFormHandlers() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        this.handleFormSubmit(e, form);
      });
    });
  }

  /**
   * Handle form submission
   * @param {Event} e - Submit event
   * @param {Element} form - Form element
   */
  handleFormSubmit(e, form) {
    // Add form validation and submission logic here
    console.log('Form submitted:', form);
  }

  /**
   * Handle window resize
   */
  handleResize() {
    // Add resize logic here if needed
    console.log('Window resized');
  }

  /**
   * Debounce function to limit function calls
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Utility: Get element by ID
   * @param {string} id - Element ID
   * @returns {Element|null} Element or null
   */
  getElementById(id) {
    return document.getElementById(id);
  }

  /**
   * Utility: Get elements by class name
   * @param {string} className - Class name
   * @returns {NodeList} List of elements
   */
  getElementsByClassName(className) {
    return document.querySelectorAll(`.${className}`);
  }

  /**
   * Utility: Add class to element
   * @param {Element} element - Target element
   * @param {string} className - Class to add
   */
  addClass(element, className) {
    if (element && element.classList) {
      element.classList.add(className);
    }
  }

  /**
   * Utility: Remove class from element
   * @param {Element} element - Target element
   * @param {string} className - Class to remove
   */
  removeClass(element, className) {
    if (element && element.classList) {
      element.classList.remove(className);
    }
  }

  /**
   * Utility: Toggle class on element
   * @param {Element} element - Target element
   * @param {string} className - Class to toggle
   */
  toggleClass(element, className) {
    if (element && element.classList) {
      element.classList.toggle(className);
    }
  }
}

/**
 * Initialize app when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
  new KubireSalonApp();
});

/**
 * Expose app to global scope for debugging (development only)
 */
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  window.KubireSalonApp = KubireSalonApp;
}