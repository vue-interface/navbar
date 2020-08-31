<template>
    <ol class="navbar-nav">
        <navigation-items>
            <slot />
        </navigation-items>
    </ol>
</template>

<script>
import NavigationItems from '@vue-interface/navigation/src/NavigationItems';

export default {

    name: 'NavbarNav',

    components: {
        NavigationItems
    }

};
</script>
