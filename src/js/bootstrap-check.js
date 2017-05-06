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
        return this.each(function () {
            var ctx = null,
                mark = null,
                input = $(this),
                type = input.attr('type'),
                name = input.attr('name');
            switch (type) {
                case 'checkbox':
                ctx = $('<span class="check-control" />');
                mark = $('<span class="check-mark" />').hide().appendTo(ctx);
                input
                    .hide()
                    .wrap('<span class="check-checkbox" />')
                    .parent()
                    .append(ctx);
                break;
                case 'radio':
                ctx = $('<span class="check-control" />');
                mark = $('<span class="check-mark" />').hide().appendTo(ctx);
                input
                    .hide()
                    .wrap('<span class="check-radio" />')
                    .parent()
                    .append(ctx);
                break;
                default:
                console.error('Invalid type: ', this);
                break;
            }

            if (input.is(':checked')) {
                mark.show();
            }

            ctx
                .on('click', function (e) {
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
                });

            $('body')
                .on('click', '[for="' + input.attr('id') + '"]', function (e) {
                    e.preventDefault();
                    ctx.trigger('click');
                    return false;
                })
                .on('mousedown', '[for="' + input.attr('id') + '"]', function () {
                    ctx.addClass('active');
                })
                .on('mouseup', '[for="' + input.attr('id') + '"]', function () {
                    ctx.removeClass('active');
                })
                .on('mouseenter', '[for="' + input.attr('id') + '"]', function () {
                    ctx.addClass('hover');
                })
                .on('mouseout', '[for="' + input.attr('id') + '"]', function () {
                    ctx.removeClass('hover');
                });
        });
    };
    $.fn.check.defaults = {
        checkboxClass: 'check-checkbox',
        radioClass: 'check-radio',

        checkboxSelectedClass: 'check-checked',
        radioSelectedClass: 'check-checked'
    };
} ($));