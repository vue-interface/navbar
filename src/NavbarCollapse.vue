<script>
import NavbarToggler from './NavbarToggler';

export default {

    functional: true,

    props: {

        show: Boolean

    },

    render(h, context) {
        return [
            h(NavbarToggler),
            h('div', {
                class: {
                    'navbar-collapse': true,
                    'collapse': true,
                    'show': context.props.show,
                },
            }, context.slots().default)
        ];
    }

};
</script>
