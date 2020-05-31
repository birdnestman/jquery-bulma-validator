/*!
 * jQuery plugin
 * What does it do
 */
(function($) {
    $.fn.BulmaValidator = function(opts) {
        // default configuration
        var config = $.extend({}, {
            classes: {
                danger: "is-danger",
                success: "is-success",
                helptext: "help"
            },
            settings: {
                text: {
                    regex: "^[A-Za-z ,.'-]{3,35}$"
                },

                email: {
                    regex: "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                }
            }
        }, opts);

        // main function
        function Validate($e) {
            var fieldtype = $e.attr('type');
            var regex = new RegExp(config.settings[fieldtype].regex);

            if(regex.test($e.val())){
                $e.removeClass(config.classes.danger)
                    .addClass(config.classes.success)
                    .parent().siblings("." + config.classes.helptext).hide()
                    
                RemoveIcon($e);

            } else {
                $e.removeClass(config.classes.success)
                    .addClass(config.classes.danger)
                    .parent().siblings("." + config.classes.helptext).show()

                AddIcon($e)
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