<template>
    <a
        v-collapse="target"
        href="#"
        class="navbar-toggler"
        data-toggle="collapse"
        :data-target="target"
        :aria-controls="target"
        :aria-label="ariaLabel"
        @click="onClick">
        <slot>
            <span class="navbar-toggler-icon" />
        </slot>
    </a>
</template>

<script>
import Collapse from '@vue-interface/collapse';

export default {

    name: 'NavbarToggler',

    directives: {
        Collapse
    },

    props: {

        ariaLabel: {
            type: String,
            default: 'Toggle navigation'
        },

        target: {
            type: String,
            default: '.navbar-collapse'
        }

    },

    methods: {

        onClick(event) {
            this.$emit('click', event);
        }

    }

};
</script>
