export const RESTAURANT_INFO = {
  name: "TastyBurger",
  description: "Tasty burgers, starters, and refreshing drinks",
  address: "Sorsogon City, Sorsogon, Philippines",
  phone: "+63 917 123 4567",
  email: "hello@tastyburger.com",
  hours: {
    weekday: "10:00 AM - 10:00 PM",
    weekend: "10:00 AM - 11:00 PM",
  },
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    tiktok: "#",
    linkedin: "https://linkedin.com",
  },
}

export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 },
  },
}
