$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/left.png" alt="slider"></img></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/right.png" alt="slider"></img></button>',
        responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: false
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: true
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: true,
              }  
            }]
    });

// const dots = document.querySelectorAll('[role="presentation"]');

// dots.forEach(dot => {
//     if(dot.classList.contains('slick-active')) {
//         dot.style.backgtoundColor = '#000'
//     }
// });
    
  });

window.addEventListener('DOMContentLoaded', () => {

    //   tabs 

  const tabs = document.querySelectorAll('.catalog__tab'),
        parentTabs = document.querySelector('.catalog__tabs'),
        cards = document.querySelectorAll('.catalog-item');

    hideContent();
    showContent();

    function hideContent() {
        tabs.forEach(tab => {
            tab.classList.remove('catalog__tab_active');
        });
        cards.forEach(card => {
            card.style.display = 'block';
        })
    };

    function showContent(i = 0) {
        tabs[i].classList.add('catalog__tab_active');
        if(i === 1) {
            cards.forEach(card => {
                if(!card.hasAttribute('data-run')) {
                    card.style.display = 'none'
                }
            })
        } else if (i === 0) {
             cards.forEach(card => {
                if(!card.hasAttribute('data-fitnes')) {
                    card.style.display = 'none'
                }
            })
        } else if(i === 2) {
             cards.forEach(card => {
                if(!card.hasAttribute('data-thriatlong')) {
                    card.style.display = 'none'
                }
            })
        }
    
    };
   

    tabs.forEach((tab, i) => 
        tab.addEventListener('click', (event) => {
        const target = event.target;
            if(target === tab || target.classList.contains('tab_text')) {
                hideContent();
                showContent(i);
            };
        })

       
    );


    // change card content 

    const link_forward = document.querySelectorAll('.catalog-item__link'),
          link_back = document.querySelectorAll('.catalog-item__back-link'),
          backSide = document.querySelectorAll('.catalog-item__back'),
          frontSide = document.querySelectorAll('.catalog-item__front');
    

    // cards show preview (default )
    function defaultFrontSide () {
        frontSide.forEach(item => {
        item.classList.add('catalog-item__front_active');
        })
    };

    defaultFrontSide();

    // show description 
    link_forward.forEach((item, i) => { 
        item.addEventListener('click', (e) => {
            e.preventDefault();
            if(e.target === item)
            showDescr(i);
        }
    );
    });
    

    function showDescr (i) {
        frontSide[i].classList.remove('catalog-item__front_active');

        backSide[i].classList.add('catalog-item__back_active');
       
    };


    // hide drscription 
    link_back.forEach((item, i) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            if(e.target === item)
            hideDescr(i);
            })
    });

    
    function hideDescr (i) {

        frontSide[i].classList.add('catalog-item__front_active');
        
        backSide[i].classList.remove('catalog-item__back_active');
    };

    
// icon hover 
const icons = document.querySelectorAll('.fa-brands');

icons.forEach(icon => {
    icon.addEventListener('mouseover', () => {
        icon.classList.add('fa-beat');

    icon.addEventListener('mouseout', () => {
        icon.classList.remove('fa-beat');
        
        
    })
})

})

// modals

const btnsConslt = document.querySelectorAll('[data-modal=consultation]'),
      btnsOrder = document.querySelectorAll('[data-modal=order]'),
      allModals = document.querySelectorAll('.modal'),
      modalConslt = document.querySelector('#consultation'),
      modalOrder = document.querySelector('#order'),
      overlay = document.querySelector('.overlay'),
      closeBtns = document.querySelectorAll('.modal__close');


    btnsConslt.forEach(btn => {
        btn.addEventListener('click', showModalConslt)
    })

    
    btnsOrder.forEach(btn => {
        btn.addEventListener('click', showModalOrder)
    })
    
      // open 

      function showModalConslt() {
        modalConslt.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
      };

      function showModalOrder() {
        overlay.style.display = 'block';
        modalOrder.style.display = 'block';
        document.body.style.overflow = 'hidden';
      };

    //   hide 

    function hideModal() {
        allModals.forEach(item => {
            item.style.display = 'none';
        })
        overlay.style.display = 'none';
        document.body.style.overflow = 'visible';

      };

    // hide by btn 
    closeBtns.forEach(item => {
        item.addEventListener('click', hideModal);
    });

    // hide by clicking open space 
    overlay.addEventListener('click', (e) => {
        if(e.target == overlay) {
            hideModal();
        }
    })

    // hide by ESC 
    document.addEventListener('keydown', (e) => {
        if (e.code ==='Escape' && overlay.style.display === 'block') {
            hideModal();
        }
    })

    

    // form validate 
    function validateForm(form) {
        $(form).validate({
            rules: {
            name: {
                required: true,
                minlength: 3
            },
            phone: {
                required: true      
            },
            email: {
                required: true,
                email: true
            }
            },

            messages: {
                name: {
                    required: "Это обязательное поле",
                    minlength: jQuery.validator.format("Имя должно быть не менее {0} символов")
                  },
                phone: "Это обязательное поле",
                email: {
                  required: "Это обязательное поле",
                  email: "Электронная почта должна быт в формате name@domain.com"
                }
              }
        });
    
    };

    validateForm('#consultation form');
    validateForm('#order form');
    validateForm('#consultation-form');

    // phone mask 
    $("input[name=phone]").mask("+7 (999) 999-9999");
   


    // send form data
    const forms = document.querySelectorAll('form');
    forms.forEach(form => sendForm(form));

    function sendForm(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.reset();
            
            const request = new XMLHttpRequest();
            request.open('POST', '../mailer.php');
            const formData = new FormData(form);
            console.log(formData);
            request.send(formData);

            request.addEventListener('load', () => {
                if(request.status === 200) {
                    console.log("dwde");
                    form.reset();
                } else {
                    console.log(request.response);
                }
            })
           
        })
       
    };

// scroll page up 

const scroll = document.querySelector('.page_up');

window.addEventListener('scroll', () => {
    if(window.pageYOffset > 1600) {
        scroll.style.display = 'block'
    } else {
        scroll.style.display = 'none'
    };
})


scroll.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
})

new WOW().init();

});
