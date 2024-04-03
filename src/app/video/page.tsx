@tailwind base;
@tailwind components;
@tailwind utilities;
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap');
@import 'tailwindcss/base';
@import 'tailwindcss/components';

/* Additional styles */
@import './additional-styles/utility-patterns.css';
@import './additional-styles/range-slider.css';
@import './additional-styles/toggle-switch.css';
@import './additional-styles/theme.css';

@import 'tailwindcss/utilities';

/* Additional Tailwind directives: https://tailwindcss.com/docs/functions-and-directives/#responsive */
@layer utilities {
    .rtl {
        direction: rtl;
    }
}
input{
    @apply w-[400px0] border border-gray-200 py-2 px-6
    bg-zinc-100/40;
}
@layer base {
    .carouselform .swiper-button-prev,
    .carouselform .swiper-button-next {
        @apply bg-green-600 text-white top-[96%] md:top-[90%] w-[46px] rounded-full z-20
    }
    .carouselform .swiper-button-prev {
        @apply left-[35%] md:left-[40%] lg:left-[45%]
    }
    .carouselform .swiper-button-next {
        @apply right-[35%] md:right-[40%] lg:right-[45%]
    }
    .carouselform .swiper-button-prev::after,
    .carouselform .swiper-button-next::after{
        @apply text-lg
    }

}

html,
body {
  padding: 0;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  &:before{
    content:'';
    content: "";
    width: 100%;
    height: 100vh;
    /* background: linear-gradient(to right bottom, #6d327c, #485DA6, #00a1ba, #01b18e, #32b37b); */
    /* background: #7ef5f5; */
    /* background: #ebf3f3; */

/* background-image: url("../../public/image 1.jpg"); */
/* background-image: url("../../public/bg.jpg"); */

    
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
  }
}

.text-shadow{
  text-shadow: 0px 2px 0px rgb(0 0 0 / 30%);
}

.adjacent-post{
  & .arrow-btn{
    transition: width 300ms ease;
    width: 50px;
  }
  &:hover{
    & .arrow-btn{
      width: 60px;
    }
  }
}

.react-multi-carousel-list {
  & .arrow-btn{
    transition: width 300ms ease;
    width: 50px;
    &:hover{
      width: 60px;
    }
  }
  
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}
