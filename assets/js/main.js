// gsap matchMedia
history.scrollRestoration = "manual"
gsap.registerPlugin(ScrollTrigger);

// Lenis js
const lenis = new Lenis({})
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

lenis.scrollTo(0)
lenis.stop()

ScrollTrigger.matchMedia({
  '(min-width:1200px)':function(){
    // sc-intro 인트로모션
    const introTl = gsap.timeline({
      onComplete:function(){
        lenis.start();
      }
    })
    introTl
    .to($('.sc-intro-motion'),{height:'60vh',paddingTop:'25vh',duration:1,delay:1.5})
    
    .to($('.sc-intro-motion .ico-text svg'),{transform:'translateY(-100%)',duration:.2,delay:.1},'a')
    .to($('.sc-intro-motion .ico-mark svg'),{transform:'translateY(-100%)',duration:.2,delay:.1},'a')
    .to($('.sc-intro-motion'),{height:0,paddingTop:0,duration:1,delay:.1},'a')
    .from($('.sc-intro'),{padding:'0 40vw',delay:.1},'a')
    .from($('.sc-intro .text-area'),{opacity:0,filter:'blur(15px)',duration:.7,delay:.5},'a')
    .from($('body'),{height:'100vh',overflowY:'hidden'},'a')
  },
  '(max-width:1199px)':function(){
    // sc-intro 인트로모션
    const introTl = gsap.timeline({
      onComplete:function(){
        lenis.start();
      }
    })
    introTl
    .to($('.sc-intro-motion'),{height:'60vh',paddingTop:'25vh',duration:1,delay:1.5})
    
    .to($('.sc-intro-motion .ico-text svg'),{transform:'translateY(-100%)',duration:.2,delay:.1},'a')
    .to($('.sc-intro-motion .ico-mark svg'),{transform:'translateY(-100%)',duration:.2,delay:.1},'a')
    .to($('.sc-intro-motion'),{height:0,paddingTop:0,duration:1,delay:.1},'a')
    .from($('.sc-intro'),{padding:'0 25vw',delay:.1},'a')
    .from($('.sc-intro .text-area'),{opacity:0,filter:'blur(15px)',duration:.7,delay:.5},'a')
    .from($('body'),{height:'100vh',overflowY:'hidden'},'a')
  }
})

// header scroll
$(window).scroll(function(){
  const scroll = $(this).scrollTop()
  if(scroll>1){
    $('.header .group-header').addClass('on')
  }else{
    $('.header .group-header').removeClass('on')
  }
})

// group-side-nav 열고 닫기
$('.btn-menu').click(function(){
  $('body').addClass('on')
  $('.header').addClass('after')
  $('.group-side-nav').addClass('on')
})
$('.btn-close').click(function(){
  $('body').removeClass('on')
  $('.header').removeClass('after')
  $('.group-side-nav').removeClass('on')
})
$(document).click(function(e){
  if($('.header').has(e.target).length===0){
    $('body').removeClass('on')
    $('.header').removeClass('after')
    $('.group-side-nav').removeClass('on')
  }
})

// group-side-menu side-img
$('.menu-first-item a').hover(function(e){
  dataName=$(this).data('side');
  $(dataName).addClass('on').siblings().removeClass('on');
},function(){
  $(dataName).removeClass('on');
})

// sc-welcome 헤더색상 변경
ScrollTrigger.create({
  // markers:true,
  trigger:'.sc-welcome',
  start:'0 20%',
  end:'0 0',
  onEnter:function(){
    $('.group-header').addClass('primary')
  },
  onLeaveBack:function(){
    $('.group-header').removeClass('primary')
  },
})

// sc-villa swiper-bg
const swiperBg = new Swiper('.swiper-bg',{
  speed:1000,
  slidesPerView:1,
  loop:true,
  effect:'fade',

})
// sc-villa swiper-card
const swiperCard = new Swiper('.swiper-card',{
  speed:1000,
  slidesPerView:1,
  loop:true,
  navigation:{
    prevEl:'.swiper-text .btn-prev',
    nextEl:'.swiper-text .btn-next',
  },
})

// sc-villa swiper-text
const swiperText = new Swiper('.swiper-text',{
  speed:1000,
  centeredSlides:true,
  loop:true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  on:{
    'init':function(){
      let curr = this.realIndex + 1
      let total = this.slides.length
      $('.fraction').html(`<span>${curr}</span><span>${total}</span>`)
    },
    'slideChange':function(){
      let curr = this.realIndex + 1
      let total = this.slides.length
      $('.fraction').html(`<span class='curr'>${curr}</span><span class='total'>${total}</span>`)

      swiperBg.slideToLoop(this.realIndex)
      swiperCard.slideToLoop(this.realIndex)

    }
  },
  navigation:{
    prevEl:'.swiper-text .btn-prev',
    nextEl:'.swiper-text .btn-next',
  },
  breakpoints:{
    319:{
      slidesPerView:1
    },
    1199:{
      slidesPerView:1.6,
    }
  }
})

// sc-villa cursor
$(document).mousemove(function(e){
  const textX = e.clientX
  const textY = e.clientY
  gsap.to('.cursor',{
    x:textX,
    y:textY
  })
})
$('.swiper-text a').hover(
  function(){$('.cursor').addClass('on')},
  function(){$('.cursor').removeClass('on')}
)
$('.swiper-card a').hover(
  function(){$('.cursor').addClass('on')},
  function(){$('.cursor').removeClass('on')}
)

// sc-enjoy
ScrollTrigger.create({
  // markers:true,
  trigger:'.sc-enjoy .group-content.second',
  start:'0 60%',
  end:'100% 100%',
  onEnter:function(){
    $('.container').addClass('white')
  },
  onEnterBack:function(){
    $('.container').addClass('white')
  },
  onLeave:function(){
    $('.container').removeClass('white')
  },
  onLeaveBack:function(){
    $('.container').removeClass('white')
  },
})

gsap.from('.footer-fixed .inner',{
  scrollTrigger:{
    // markers:true,
    trigger:'.footer-fixed',
    start:'0 100%',
    end:'100% 100%',
    scrub:true,
  },
  yPercent:-30,
})