(function(KJHTML_APP) {

    var DomUtil = function() {};

    DomUtil.prototype = {

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

    DomUtil.prototype.constructor = DomUtil;

    KJHTML_APP.registerClass("DomUtil", DomUtil);
})(KJHTML_APP);
