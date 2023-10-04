import Toolbar from './components/Toolbar.vue'
import { createVNode, render } from 'vue'

Nova.booting(app => {

    app.mixin({
        mounted() {

            if (this._.type?.__file?.endsWith('ResourceTableToolbar.vue')) {

                const container = document.createElement('div')
                container.id = 'batch-edit-toolbar'

                const element = document.querySelector('[dusk$="-index-component"] div.h-9.ml-auto.flex.items-center.pr-2.md\\:pr-3')
                element.insertAdjacentElement('beforebegin', container)

                const vnode = createVNode(Toolbar, { toolbar: this })
                vnode.appContext = app._context

                render(vnode, container)

            }

        },
    })

})
