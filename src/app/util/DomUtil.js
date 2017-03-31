(function(KJHTML_APP) {

    var domUtil = {

        addClass: function(el, className) {
            el.className += " " + className;
        },

        createTextNode: function() {
            return document.createTextNode.apply(document, arguments);
        },

        createElement: function() {
            return document.createElement.apply(document, arguments);
        },

        createDom: function(options) {
            var el = options.el,
                attrs = options.attributes,
                children = options.children;

            el = this.createElement(el);

            for (var i = 0; i < children.length; i++) {
                var child = children[i];

                if (typeof child === 'string') {
                    el.appendChild(this.createTextNode(child));
                } else {
                    if (child) {
                        el.appendChild(child);
                    }
                }
            }

            for (var attr in attrs) {
                if (attr == "className") {
                    el[attr] = attrs[attr];
                } else {
                    el.setAttribute(attr, attrs[attr]);
                }
            }

            return el;
        }
    };

    KJHTML_APP.register("domUtil", domUtil);
})(KJHTML_APP);
