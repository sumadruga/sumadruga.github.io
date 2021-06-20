// ----------------------------------------------
// Imports
// ----------------------------------------------
import $ from 'jquery';

// ----------------------------------------------
// Formcarry
// ----------------------------------------------
const Formcarry = (() => {
  let s;

  return {
    settings() {
      return {
        html: $('html'),
        body: $('body'),
        form: $('#form'),
        formAction: $('#form').attr('action'),
        formMessage: $('.form__message'),
        animation: 'fade-in',
        open: 'js-popup-open',
        overflow: 'js-overflow',
        closing: 'js-popup-closing'
      };
    },

    init() {
      s = this.settings();
      this.bindEvents();
    },

    bindEvents() {
      this.ajax();
    },

    ajax() {
      s.form.submit(e => {
        e.preventDefault();

        grecaptcha.ready(function() {
          grecaptcha.execute('6Ld6gUcbAAAAAKBdJa6boWavFQ5dEumtKH4fJ8i1', {action: 'submit'}).then(function(token) {
              // Add your logic to submit to your backend server here.
              $.ajax({
                url: s.formAction,
                method: 'POST',
                data: s.form.serialize(),
                dataType: 'json',
                success: () => {
                  s.body.addClass(s.closing);
                  s.body.removeClass(s.open);
                  s.html.removeClass(s.overflow);
      
                  setTimeout(() => {
                    s.form[0].reset();
                    s.body.removeClass(s.closing);
                  }, 800);
                },
                error: () => {
                  setTimeout(() => {
                    s.formMessage.removeClass(s.animation);
                    s.formMessage.addClass(s.animation);
                    s.formMessage.text('Something Went Wrong');
                  }, 750);
                }
              });

          });
        });

      });
    }
  };
})();

// ----------------------------------------------
// Exports
// ----------------------------------------------
export default Formcarry;
