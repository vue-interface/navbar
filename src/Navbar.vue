<template>
    <nav :class="classes">
        <slot />
    </nav>
</template>

<script>
import Variant from '@vue-interface/variant';
import { isBoolean } from '@vue-interface/utils';

export default {

    name: 'Navbar',

    mixins: [
        Variant
    ],

    props: {

        /**
         * Expand the navbar. If true, applies to all size, otherwise pass a string.
         *
         * @property Object
         */
        expand: {
            type: [Boolean, String],
            default: 'lg',
            validate(value) {
                ['xs', 'sm', 'md', 'lg', 'xl'].indexOf(value) !== -1 || isBoolean(value);
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
            default: 'light',
            validate(value) {
                return ['light', 'dark'].indexOf(value) !== -1;
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

            return prefix(prefix(this.expand, 'expand'), 'navbar');
        },

        classes() {
            return {
                navbar: true,
                'fixed-top': this.fixed === 'top' || this.fixed === true,
                'fixed-bottom': this.fixed === 'bottom',
                'sticky-top': this.sticky === 'top' || this.sticky === true,
                'sticky-bottom': this.sticky === 'bottom',
                [this.expandedClass]: !!this.expandedClass,
                [this.variantClass]: !!this.variantClass
            }
        }
    }

};
</script>
