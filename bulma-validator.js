/*!
 * jQuery plugin
 * What does it do
 */
(function($) {
    $.fn.BulmaValidator = function(opts) {
        // default configuration
        var config = $.extend({}, {
            settings: {
                name: {
                    regex: "^[A-Za-z ,.'-]{3,35}$"
                },
                email: {
                    regex: "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                }
            }
        }, opts);

        // main function
        function Validate(e) {
            console.log(e)
            var fieldtype = e.data("validation");
            var regex = new RegExp(config.settings[fieldtype].regex);
            console.log(regex)

            if(regex.test(e.val())){
                e.removeClass("is-danger")
                e.addClass("is-success")
                e.parent().siblings(".help").hide()
                RemoveIcon(e);

            } else {
                e.addClass("is-danger")
                e.removeClass("is-success")
                AddIcon(e)
                e.parent().siblings(".help").show()
            }
        }

        function RegisterValiator(e) {
            e.keyup(function(){
                Validate(e)
            });
        }
        
        function AddIcon(e) {
            var html = '<span class="icon is-small is-right"><i class="fas fa-exclamation-triangle"></i></span>';
            
            if(e.parent().hasClass("has-icons-right")){
                e.parent().append(html);
            }

        }
        
        function RemoveIcon(e) {
            e.siblings(".is-right").remove();
        }

        // initialize every element
        this.each(function() {
            RegisterValiator($(this));
        });
        
        return this;
    };
})(jQuery);