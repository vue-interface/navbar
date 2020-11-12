<template>
    <nav :class="classes">
        <slot />
    </nav>
</template>

<script>
import { isBoolean, prefix } from '@vue-interface/utils';
import Variant from '@vue-interface/variant';

export default {

    name: 'Navbar',

    mixins: [
        Variant
    ],

    props: {

        dark: Boolean,

        /**
         * Expand the navbar. If true, applies to all size, otherwise pass a string.
         *
         * @property Object
         */
        expand: {
            type: [Boolean, String],
            default: 'lg',
            validate(value) {
                const prefixed = prefix(value, 'navbar-expand');
                
                return [
                    'navbar-expand-xs',
                    'navbar-expand-sm',
                    'navbar-expand-md',
                    'navbar-expand-lg',
                    'navbar-expand-xl'
                ].indexOf(prefixed) !== -1 || isBoolean(value);
            }
        },

        /**
         * The should the navbar be fixed at the top.
         *
         * @property String
         */
        fixed: {
            type: [String, Boolean],
            validate(value) {
                ['top', 'bottom'].indexOf(value) !== -1 || isBoolean(value);
            }
        },

        light: Boolean,

        /**
         * The should the navbar be stickied at the top.
         *
         * @property String
         */
        sticky: {
            type: [String, Boolean],
            validate(value) {
                ['top', 'bottom'].indexOf(value) !== -1 || isBoolean(value);
            }
        },

        /**
         * The variant attribute
         *
         * @property String
         */
        variant: {
            type: String,
            validate(value) {
                return [
                    'navbar-light',
                    'navbar-dark'
                ].indexOf(prefix(value, 'navbar')) !== -1;
            }
        }

    },

    data() {
        return {};
    },

    computed: {

        expandedClass() {
            if(isBoolean(this.expand)) {
                return this.expand;
            }

            return prefix(this.expand, 'navbar-expand');
        },

        classes() {
            return {
                navbar: true,
                'fixed-top': this.fixed === 'top' || this.fixed === true,
                'fixed-bottom': this.fixed === 'bottom',
                'sticky-top': this.sticky === 'top' || this.sticky === true,
                'sticky-bottom': this.sticky === 'bottom',
                [this.expandedClass]: !!this.expandedClass,
                [this.variantClass]: !!this.variantClass,
                'navbar-light': this.light && !this.dark,
                'navbar-dark': this.dark && !this.light,
            };
        }
    }

};
</script>
