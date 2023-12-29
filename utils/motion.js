export const navVariants = {
  hidden: {
    opacity: 0,
    y: -50,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 50,
    },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 50,
      delay: 1,
    },
  },
}

export const slideIn = (direction, type, delay, duration) => ({
  hidden: {
    opacity: 0,
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
})

export const containerVariant = {
  hidden: { opacity: 1, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
}
export const galleryContainerVariant = {
  hidden: { opacity: 1 },
  show: {
    transition: {
      delayChildren: 0.8,
      staggerChildren: 0.2,
    },
  },
}

export const galleryVariant = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
  },
}
