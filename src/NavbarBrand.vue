<script>
export default {

    props: {

        /**
         * The HTML wrapping tag.
         *
         * @property Object
         */
        tag: String,

        /**
         * The `to` attribute that is passed to the component.
         *
         * @property Object
         */
        to: [Object, String],

        /**
         * The `href` attribute that is passed to the component.
         *
         * @property Object
         */
        href: String

    },

    render(h) {
        if(this.$props.to) {
            return h('router-link', {
                staticClass: 'navbar-brand',
                props: this.$props,
                attrs: this.$attrs
            }, this.$slots.default);
        }
        
        return h(this.$props.href ? 'a' : (this.tag || 'span'), {
            staticClass: 'navbar-brand',
            attrs: Object.assign({
                href: this.$props.href
            }, this.$attrs)
        }, this.$slots.default);
    }
};
</script>
