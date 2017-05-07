/**
 * bootstrap-check.js
 * 
 * Created by: Max Alzner (https://github.com/MaxAlzner)
 * 
 * bootstrap-check is released under the MIT License
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
(function ($) {
    'use strict';
    $.fn.check = function (options) {
        var _options = $.extend({}, $.fn.check.defaults, options);
        console.log(_options);
        return this.each(function () {
            var ctx = null,
                control = null,
                mark = null,
                input = $(this),
                type = input.attr('type'),
                name = input.attr('name');

            if (!(type === 'checkbox' || type === 'radio')) {
                console.error('Invalid type: ', this);
                return false;
            }

            if (input.parent().is('.check')) {
                console.error('bootstrap.check has already been initialized on this element: ', this);
                return false;
            }

            control = $('<span class="check-control" />');
            mark = $('<span class="check-mark" />').hide().appendTo(control);
            ctx = input
                .hide()
                .wrap('<span class="check" />')
                .parent()
                .append(control)
                .addClass(_options.theme)
                .attr('data-type', type);

            if (input.is(':checked')) {
                mark.show();
            }

            // input
            //     .on('click', function (e) {
            //         e.preventDefault();
            //         e.stopPropagation();
            //         return false;
            //     });
            if (ctx.parent().is('label') && !ctx.parent().is('[for]')) {
                ctx
                    .parent()
                    .on('click', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        control.trigger('click');
                        return false;
                    })
                    .on('mousedown', function () {
                        control.addClass('active');
                    })
                    .on('mouseup', function () {
                        control.removeClass('active');
                    })
                    .on('mouseenter', function () {
                        control.addClass('hover');
                    })
                    .on('mouseout', function () {
                        control.removeClass('hover');
                    });
            }

            control
                .on('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (type === 'radio') {
                        $('[name="' + name + '"]').prop('checked', false).change().parent().find('.check-mark').hide();
                    }

                    if (!input.is(':checked')) {
                        input.prop('checked', true);
                        mark.show();
                    }
                    else {
                        input.prop('checked', false);
                        mark.hide();
                    }

                    input.change();
                    return false;
                });

            if (input.attr('id')) {
                $('body')
                    .on('click', '[for="' + input.attr('id') + '"]', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        control.trigger('click');
                        return false;
                    })
                    .on('mousedown', '[for="' + input.attr('id') + '"]', function () {
                        control.addClass('active');
                    })
                    .on('mouseup', '[for="' + input.attr('id') + '"]', function () {
                        control.removeClass('active');
                    })
                    .on('mouseenter', '[for="' + input.attr('id') + '"]', function () {
                        control.addClass('hover');
                    })
                    .on('mouseout', '[for="' + input.attr('id') + '"]', function () {
                        control.removeClass('hover');
                    });
            }
        });
    };
    $.fn.check.defaults = {
        theme: 'check-default'
    };
} ($));